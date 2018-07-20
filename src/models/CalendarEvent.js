import moment from 'moment';
import 'fullcalendar';
import { WizDatabase as g_db, WizCommonUI as g_cmn} from '../utils/WizInterface';
import Config from '../utils/Config';

export default class CalendarEvent {
	/**
     * 创建一个通用日程.
	 * @param {Object} data 原始数据类型，可以是 WizEvent, FullCalendarEvent 以及 GUID.
     */
	constructor( data, calendar ) {
		if (!g_db) throw new Error('IWizDatabase is not valid.');
		const type = this._checkDataType(data);
		switch ( type ) {
			case "WizEvent":
			case "FullCalendarEvent":
				this._create(data, type);
				break;
			case "GUID":
				try {
					//TODO: 获得WizEvent数据，并创建对象
					const doc = g_db.DocumentFromGUID(data);
					const newEventData = {
						"CALENDAR_END" : doc.GetParamValue('CALENDAR_END'),
						"CALENDAR_INFO" : doc.GetParamValue('CALENDAR_INFO'),
						"CALENDAR_EXTRAINFO" : doc.GetParamValue('CALENDAR_EXTRAINFO'),
						"CALENDAR_START" : doc.GetParamValue('CALENDAR_START'),
						"CALENDAR_RECURRENCE" : doc.GetParamValue('CALENDAR_RECURRENCE'),
						"CALENDAR_ENDRECURRENCE" : doc.GetParamValue('CALENDAR_ENDRECURRENCE'),
						"created" : moment(doc.DateCreated).format('YYYY-MM-DD HH:mm:ss'),
						"guid" : doc.GUID,
						"title" : doc.Title,
						"updated" : moment(doc.DateModified).format('YYYY-MM-DD HH:mm:ss')
					}
					this._create(newEventData, 'WizEvent');
				} catch (e) { console.error(e); }
				break;
		}
	};

	_create(data, type) {
		let start, end, id, bkColor, allDay, complete, dateCompleted, rptRule, rptEnd;
		switch (type) {
			case "GUID":
			case "WizEvent":
				this._Info = this._parseInfo(data.CALENDAR_INFO);
				this._ExtraInfo = data.CALENDAR_EXTRAINFO ? this._parseInfo(data.CALENDAR_EXTRAINFO) : this._getDefaultExtraInfo();
				// 统一变量
				id = data.guid;
				start = data.CALENDAR_START;
				end = data.CALENDAR_END;
				// 判断是否用户自定义背景色，向下兼容原版日历
				bkColor = this._Info.ci ? ( parseInt(this._Info.ci) == 0 ? this._Info.b : Config.colorItems[this._Info.ci].colorValue ) : this._Info.b;
				allDay = data.CALENDAR_END.indexOf("23:59:59") != -1 ? true : false;
				complete = this._ExtraInfo.Complete;
				dateCompleted = this._ExtraInfo.DateCompleted;
				// 重复事件
				rptRule = data.CALENDAR_RECURRENCE;
				rptEnd = data.CALENDAR_ENDRECURRENCE;
				break;
			case "FullCalendarEvent":
				id = data.id;
				start = data.start;
				end = data.end;
				bkColor = data.backgroundColor;
				allDay = data.allDay ? data.allDay : !$.fullCalendar.moment(data.start).hasTime();
				complete = data.complete || 0;
				dateCompleted = data.dateCompleted || '';
				rptRule = data.rptRule;
				rptEnd = data.rptEnd
				break;
			default:
				throw new Error('Can not identify data type.');
				break;
		}
		// 基本信息
		this.id = id;
		this.title = data.title;
		// 时间信息
		this.allDay = allDay;
		// 注意！start/end 可能是moment对象或者str，所以一律先转换成moment再格式化输出
		this.start = allDay ? moment(start).format("YYYY-MM-DD") : moment(start).format('YYYY-MM-DD HH:mm:ss');
		this.end = allDay ? moment(end).format("YYYY-MM-DD") : moment(end).format('YYYY-MM-DD HH:mm:ss');
		this.created = data.created ? data.created : moment(start).format('YYYY-MM-DD HH:mm:ss');
		this.updated = data.updated ? data.updated : moment().format('YYYY-MM-DD HH:mm:ss');
		// 设置信息
		this.textColor = 'black';
		this.backgroundColor = bkColor;
		this.complete = complete;
		this.dateCompleted = dateCompleted;
		// 重复事件
		this.rptRule = rptRule;
		this.rptEnd = rptEnd;
		//
		this._update();
	}

	_checkDataType(data) {
		const objClass = data.constructor;
        const GUID_RegExr = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        let type;
        switch (objClass) {
            case String:
                if ( GUID_RegExr.test(data) ) type = "GUID";
                else throw new Error('Unknown data, cannot create CalendarEvent object.');
                break;
            case Object:
				if ( data.CALENDAR_INFO && data.title ) { 
					type = 'WizEvent';
				} else if ( data.start && data.title ) {
					type = 'FullCalendarEvent';
				}
                break;
        }
        return type;
	};

	_parseInfo(InfoString) {
		const InfoObject = {};
		// 拆解CALENDAR_INFO
		const InfoArray = InfoString.split('/');
		InfoArray.forEach(function(item, index, arr){
			const pair = item.split('=');
			InfoObject[pair[0]] = pair[1];
		});
		// 处理颜色值
		if ( InfoObject.b ) InfoObject.b = '#' + InfoObject.b;

		return InfoObject;
	};

	/**
     * 将 Info 对象序列化.
	 * @private
	 * @param {Object} [InfoObject=] 提供 Info 对象，默认为`this._Info`.
     * @return {String} 返回用于Info对象字符串.
     */
	_stringifyInfo( InfoObject = this._Info ) {
		if ( !InfoObject ) return '';
		const InfoArray = [];
		const InfoObjectKeysArray = Object.keys(InfoObject);
		InfoObjectKeysArray.forEach(function(item, index, arr){
			const singleInfo = `${item}=${InfoObject[item]}`;
			InfoArray.push(singleInfo);
		});
		return InfoArray.join('/').replace('#', '');
	};

	_update() {
		this._updateInfo();
		this._updateExtraInfo();
	};

	_updateInfo() {
		const that = this;
		const InfoObject = {
			'b': null, //背景色hex值
			'r': '-1', //提醒方式
			'c': '0', //结束提醒信息
			'ci': 0 //背景色ID，默认 0 表示背景为用户自定义
		};
		// 更新背景色'b'
		InfoObject['b'] = this.backgroundColor.replace('#', '');
		// 更新颜色指数'ci'
		Config.colorItems.forEach(function(item, index, arr){
			if ( item.colorValue ==  that.backgroundColor ) {
				// 当日程背景色与色表匹配时则用 color idex 来储存（兼容原版日历插件）
				InfoObject['ci'] = index;
			};
		});
		// 应用更新
		this._Info = InfoObject;
	};

	_getDefaultExtraInfo() {
		return {
			'Complete': 0, //
			'DateCompleted': '', // ISO 标准日期字符串 YYYY-MM-DD 00:00:00
			'Prior': 0
		};
	};

	_updateExtraInfo() {
		const ExtraInfoObject = {
			'Complete': 0,
			'DateCompleted': '',
			'Prior': 0
		};
		ExtraInfoObject['Complete'] = this.complete;
		ExtraInfoObject['DateCompleted'] = this.dateCompleted;
		this._ExtraInfo = ExtraInfoObject;
	};

	_getEventHtml(title = this.title, content = ''){
		const htmlText = 
			`<html>
				<head>
					<meta http-equiv="Content-Type" content="text/html; charset=unicode">
					<title>${title}</title> 
				</head>
				<body>
					<!--WizHtmlContentBegin-->
					<div>${content}</div>
					<!--WizHtmlContentEnd-->
				</body>
			</html>`;
	
		  return htmlText
	};

	/**
     * 根据日程的重复规则生成 FullCalendar eventSource.
	 * @param {String} start 查询起始，ISO 标准日期字符串.
	 * @param {String} end 查询结束，ISO 标准日期字符串.
     * @returns {Object} eventSource.
     */
	generateRepeatEvents(start, end) {
		if ( !this.rptRule ) throw new Error('Cannot find CalendarEvent repeat rule.');
		const eventSource = {
			id: this.id,
			events: []
		}
		//根据rptRule生成重复日期，并生成事件
		const dayArray = this._getRenderRepeatDay(start, end);
		for ( let day of dayArray ) {
			// day 是一个Moment日期对象
			const newEvent = this.toFullCalendarEvent();
			newEvent.start = day.format('YYYY-MM-DD HH:mm:ss');
			newEvent.end = moment(newEvent.end).add( day.diff( moment(this.start) ) ).format('YYYY-MM-DD HH:mm:ss');
			eventSource.events.push(newEvent);
		}

		return eventSource;
	};

	/**
     * 根据规则生成日期数组
     * @returns {Object[]} 包含一系列`Moment`日期对象的数组.
     */
	_getRenderRepeatDay(start, end) {
		const rptRule = this.rptRule;
		let dayArray;
		let regex;
		console.count(rptRule);
		if ( (regex = /^Every(\d)?Weeks?(\d*)$/).test(rptRule) ) {
			// 每[1234]周[7123456]
			const curWeekDay = moment(this.start).day();
			const results = regex.exec(rptRule);
			const interWeek = results[1];
			const number = results[2] || `${curWeekDay}`;
			dayArray = this._getWeeklyRepeatDay(number, start, end, interWeek);

		} else if ( (regex = /^EveryWeekday(\d*)$/).test(rptRule) ) {
			// 每个工作日EveryWeekday135
			const results = regex.exec(rptRule);
			const number = results[1] || '12345';
			dayArray = this._getWeeklyRepeatDay(number, start, end);

		} else if ( (regex = /Daily|Weekly|Monthly|Yearly/).test(rptRule) ) {
			// Daily|Weekly|Monthly|Yearly
			const perRule = regex.exec(rptRule)[0]
			dayArray = this._getPerRepeatDays(start, end, perRule);

		}

		return dayArray;
	};

	/**
     * 根据每周规则生成日期数组
	 * @param {String} number 整数字符串表示的规则；
     * @returns {Object[]} 包含一系列Moment日期对象的数组.
     */
	_getWeeklyRepeatDay(number, start, end, interWeeks = '1') {
		//返回[{start, end}, {start, end}, {start, end}]
		//考虑渲染范围，以及结束循环的日期
		const viewStart = moment(this.start);
		const viewEnd = moment(end);
		const rptEnd = this.rptEnd ? moment(this.rptEnd) : viewEnd;
		let dayArray = [];
		const intervalWeeks = interWeeks ? parseInt(interWeeks) : 1;
		const weekdays = number.replace('7', '0').split(''); //周日0~6周六
		for ( let day of weekdays ) {
			//
			let curWeekDay = parseInt(day), newEventStartDate = moment(viewStart);
			do {
				// 创建新Moment对象
				newEventStartDate = moment(viewStart).day(curWeekDay);
				// 根据日程设置time part
				const eventStart = moment(this.start)
				newEventStartDate.set({
					'hour': eventStart.get('hour'),
					'minute': eventStart.get('minute'),
					'second': eventStart.get('second')
				})
				// 避免初始重复渲染
				if ( !newEventStartDate.isSame( eventStart ) ) dayArray.push( moment(newEventStartDate) );
				// 隔多少周重复
				curWeekDay += 7*intervalWeeks;
				//console.log( moment(newEventStartDate).format('YYYY-MM-DD HH:mm:ss') );
			} while ( moment(viewStart).day(curWeekDay + 7 ).isBefore( viewEnd ) 
						&& moment(viewStart).day(curWeekDay + 7 ).isBefore( rptEnd )  )
			
		}
		
		return dayArray;
	};

	_getPerRepeatDays(start, end, perRule) {
		const perRuleMap = {
			'Daily': 'days',
			'Weekly' : 'weeks',
			'Monthly' : 'months',
			'Yearly' : 'years'
		};
		const viewStart = moment(this.start);
		const viewEnd = moment(end);
		const rptEnd = this.rptEnd ? moment(this.rptEnd) : viewEnd;
		let dayArray = [];
		const eventStart = moment(this.start)
		do {
			// 增加一个月
			eventStart.add(1, perRuleMap[perRule]);
			dayArray.push( moment(eventStart) );
		} while ( eventStart.isBefore( viewEnd ) && eventStart.isBefore( rptEnd ) );

		return dayArray;
	}

	toFullCalendarEvent() {
		const newEvent = $.extend({}, this);
		// 删除无关数据
		delete newEvent._Info;
		delete newEvent._ExtraInfo;
		return newEvent;
	};

	toWizEventData() {
		this._update();
		const newEvent = {};
		newEvent.title = this.title;
		newEvent.guid = this.id;
		newEvent.CALENDAR_START = this.allDay ? moment(this.start).format('YYYY-MM-DD 00:00:00') : this.start;
		newEvent.CALENDAR_END = this.allDay ? moment(this.end).format('YYYY-MM-DD 23:59:59') : this.end;
		newEvent.CALENDAR_INFO = this._stringifyInfo(this._Info);
		newEvent.CALENDAR_EXTRAINFO = this._stringifyInfo(this._ExtraInfo);
		newEvent.created = this.created;
		newEvent.updated = this.updated;
		return newEvent;
	};

	_saveAllProp() {
		//TODO: 保存全部数据包括Title
		// 更新事件文档数据
		const doc = g_db.DocumentFromGUID(this.id);
		// 保存标题
		doc.Title = this.title;
		// 保存时间数据
		if ( this.allDay ) {
			let startStr = moment(this.start).set({'h': 0, 'm': 0, 's': 0}).format('YYYY-MM-DD HH:mm:ss');
			let endStr = moment(this.end).set({'h': 23, 'm': 59, 's': 59}).format('YYYY-MM-DD HH:mm:ss');
			this._setParamValue(doc, "CALENDAR_START", startStr);
			this._setParamValue(doc, "CALENDAR_END", endStr);
		} else {
			let startStr = moment(this.start).format('YYYY-MM-DD HH:mm:ss');
			let endStr = moment(this.end).format('YYYY-MM-DD HH:mm:ss');
			this._setParamValue(doc, "CALENDAR_START", startStr);
			this._setParamValue(doc, "CALENDAR_END", endStr);
		}

		// 保存 CALENDAR_INFO
		this._update();
		this._setParamValue(doc, "CALENDAR_INFO", this._stringifyInfo(this._Info));
		this._setParamValue(doc, "CALENDAR_EXTRAINFO", this._stringifyInfo(this._ExtraInfo));
	};

	// 设置文档属性值
	_setParamValue(doc, key, value) {
		if (!doc) return false;
		doc.SetParamValue(key, value);
	};

	_createWizEventDoc() {
		//TODO: 保存全部数据包括Title
		// 创建WizDoc
		const location = `My Events/${ moment(this.start).format('YYYY-MM') }/`;
		const objFolder = g_db.GetFolderByLocation(location, true);
		const tempHtml = g_cmn.GetATempFileName('.html');
		const htmlText = this._getEventHtml(this.title, '');
		g_cmn.SaveTextToFile(tempHtml, htmlText, 'unicode');
		const doc = objFolder.CreateDocument2(this.title, "");
		doc.ChangeTitleAndFileName(this.title);
		doc.UpdateDocument6(tempHtml, tempHtml, 0x22);
		// 设置标签
		//if ( tags ) doc.SetTagsText2(tags, "Calendar");
		// 将信息编码到WizDoc属性中去
		const newEvent = this.toWizEventData();
		doc.AddToCalendar(newEvent.CALENDAR_START, newEvent.CALENDAR_END, newEvent.CALENDAR_INFO);
		// change database
		doc.type = "event";
		//
		this.id = doc.GUID;
	}

	saveToWizEventDoc( prop = 'all' ) {
		if (!g_db || !g_cmn) throw new Error('IWizDatabase or IWizCommonUI is not valid.');
		//检查文档是否存在
		const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		const isWizDocExist = guidRegex.test(this.id);
		// 创建或者更新文档
		if ( isWizDocExist ) {
			// 根据指令更新内容
			this._saveAllProp();
			// 更新FullCalendar
		} else {
			// 创建新的事件文档
			this._createWizEventDoc();
		}
		
	};

	deleteEventData( isDeleteDoc = false ){
		const doc = g_db.DocumentFromGUID(this.id);
		if (!doc) throw new Error('Can not find Event related WizDocument.')
		// 移除日历数据
		doc.RemoveFromCalendar();
		// 删除文档
		if ( isDeleteDoc ) doc.Delete();
	}

}