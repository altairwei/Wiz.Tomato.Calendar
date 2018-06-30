import moment from 'moment';
import 'fullcalendar';
import { WizDatabase as g_db, WizCommonUI as g_cmn} from './WizInterface';
import Config from './Config';

const g_cal = $('#calendar');

export default class CalendarEvent {
	/**
     * 创建一个通用日程.
	 * @param {Object} data 原始数据类型，可以是 WizEvent, FullCalendarEvent 以及 GUID.
     */
	constructor( data ) {
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
		let start, end, id, bkColor, allDay, complete, dateCompleted, rptRule;
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
				rptRule = data.CALENDAR_RECURRENCE;
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
		this.rptRule = rptRule;
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
		/*
		const rptRule = {
			"Daily": "Daily", //每日
			"EveryWeekday": "EveryWeekday135", //每个工作日135
			"EveryWeek": "EveryWeek7123456", //每周 日一二三四五六
			"Every2Weeks" : "Every2Weeks", //每两周
			"Monthly": "Monthly", //每月
			"Yearly": "Yearly", //每年
			"ChineseMonthly": "ChineseMonthly", //农历每月
			"ChineseYearly": "ChineseYearly", //农历每年
		};
		*/
		const rptRule = this.rptRule;
		let dayArray;
		console.log(rptRule)
		if (/^Every(|\d)Week(|day)(\d*)$/.test(rptRule) ) {
			// 每[1234]周[7123456]
			const results = /^Every(|\d)Week(|day)(\d*)$/.exec(rptRule);
			const interWeek = results[1]
			const number = results[3];
			dayArray = this._getWeeklyRepeatDay(number, start, end, interWeek);
		} else if ( /^EveryWeek|EveryWeekday$/.test(rptRule) ) {
			// 每个工作日
			dayArray = this._getWeeklyRepeatDay('12345', start, end);
		} else if ( "Daily" == rptRule ) {
			dayArray = this._getWeeklyRepeatDay('0123456', start, end);
		} else if ( "Weekly" == rptRule ) {
			const curWeekDay = moment(this.start).day();
			dayArray = this._getWeeklyRepeatDay(`${curWeekDay}`, start, end);
		}
		//TODO: 完成剩下的重复规则
		/*
		switch ( true ){
				// 每天，固定间隔
				case "Daily":
					getWeeklyRepeatDay(dayArray, [1, 2, 3, 4, 5, 6, 7]);
					break;
				// 每周，固定间隔
				case "Weekly":
					getWeeklyRepeatDay(dayArray, [eventStart.getDay()]);
					break;
				// 每两周，固定间隔
				case "Every2Weeks":
					getWeeklyRepeatDay(dayArray, [eventStart.getDay()]);
					for (var i = 0; i < dayArray.length; ++ i){
						var inter = _interDays(_d2s(eventStart), _d2s(dayArray[i][0]));
						if ((parseFloat((inter-1)/7.0) % 2) != 0 ){
							dayArray.splice(i, 1);
							i --;
						}
					}
					break;
				// 每月
				case "Monthly":
					getMonthlyRepeatDay(dayArray);
					break;
				// 每年
				case "Yearly":
					getYearlyRepeatDay(dayArray);
					break;
				// TODO: 汉字需要考虑
				case "ChineseMonthly":
					getChineseRepeatDay(dayArray, '月');
					break;
				case "ChineseYearly":
					getChineseRepeatDay(dayArray, '历');
					break;
				default:{
					if (g_repeatRule.indexOf("EveryWeek") == 0){
						var days = g_repeatRule.substr("EveryWeek".length).split('');
						getWeeklyRepeatDay(dayArray, days);
					}
				}
				
			}
			*/
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
		let dayArray = [];
		const intervalWeeks = interWeeks ? parseInt(interWeeks) : 1;
		const weekdays = number.replace('7', '0').split(''); //周日0~6周六
		for ( let day of weekdays ) {
			//
			let curWeekDay = parseInt(day), newEventStartDate = moment(viewStart)
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
			} while ( moment(viewStart).day(curWeekDay + 7 ).isBefore( viewEnd ) )
			
		}
		
		return dayArray;
	}

	toFullCalendarEvent() {
		// 注意方法返回的只是FullCalendarEvent的数据类型，并不是event对象
		const that = this;
		const newEvent = {};
		const keys = Object.keys(this);
		// 去除非必要属性
		keys.splice( keys.findIndex( (i) => i == '_Info' ), 1);
		keys.splice( keys.findIndex( (i) => i == '_ExtraInfo' ), 1);
		// 浅拷贝, 不过主要属性都是基本数据类型，所以不存在引用问题
		keys.forEach(function(item, index, arr){
			newEvent[item] = that[item];
		});
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

	addToFullCalendar() {
		//TODO: 将自身添加到FullCalendar
		if (!g_cal) throw new Error('Can not find FullCalendar Widget.')
		g_cal.fullCalendar( 'addEventSource', {
			events: [
				this.toFullCalendarEvent()
			]
		});
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
		if (!g_cal) throw new Error('Can not find FullCalendar Widget.')
		let doc = g_db.DocumentFromGUID(this.id);
		if (!doc) throw new Error('Can not find Event related WizDocument.')
		// 移除FullCalendar事件
		g_cal.fullCalendar('removeEvents', this.id);
		// 移除日历数据
		doc.RemoveFromCalendar();
		// 删除文档
		if ( isDeleteDoc ) doc.Delete();
	}

	refetchData() {
		//TODO: 重数据库重新获取数据更新实例
	};

	refreshEvent(event) {
		//TODO: 应该自动遍历并修改属性
		if ( event ) {
			// 重新渲染FullCalendar事件
			event.title = this.title;
			event.backgroundColor = this.backgroundColor;
			g_cal.fullCalendar('updateEvent', event);
		} else {
			//用.fullCalendar( ‘clientEvents’ [, idOrFilter ] ) -> Array 获取源数据从而更新
			//TODO: 遍历并寻找GUID匹配的事件
		}
	}

}