import $ from 'jquery';
import moment from 'moment';
import 'fullcalendar';
import { WizDatabase as g_db, WizCommonUI as g_cmn} from './WizInterface'
import Config from './Config'

const g_cal = $('#calendar');

export default class CalendarEvent {
	constructor( data ) {
		if (!g_db) throw new Error('IWizDatabase is not valid.');
		let type = this._checkDataType(data);
		switch ( type ) {
			case "WizEvent":
				try {
					this._info = this._parseInfo(data.CALENDAR_INFO);
					this._createEvent(data, type);
				} catch (e) { console.error(e); }
				break;
			case "FullCalendarEvent":
				try {
					this._createEvent(data, type);
					// 设置info对象
					this._updateInfo();
				} catch (e) { console.error(e); }
				break;
			case "GUID":
				try {
					//TODO: 获得WizEvent数据，并创建对象
					let doc = g_db.DocumentFromGUID(data);
					let newEventData = {
						"CALENDAR_END" : doc.GetParamValue('CALENDAR_END'),
						"CALENDAR_INFO" : doc.GetParamValue('CALENDAR_INFO'),
						"CALENDAR_START" : doc.GetParamValue('CALENDAR_START'),
						"created" : moment(doc.DateCreated).format('YYYY-MM-DD HH:mm:ss'),
						"guid" : doc.GUID,
						"title" : doc.Title,
						"updated" : moment(doc.DateModified).format('YYYY-MM-DD HH:mm:ss')
					}
					this._createEvent(newEventData, 'WizEvent');
				} catch (e) { console.error(e); }
				break;
		}
	};

	_createEvent(data, type) {
		let start, end, id, bkColor, allDay
		switch (type) {
			case "WizEvent":
				// 统一变量
				id = data.guid;
				start = data.CALENDAR_START;
				end = data.CALENDAR_END;
				// 判断是否用户自定义背景色
				bkColor = this._info.ci == 0 ? this._info.b : Config.colorItems[this._info.ci].colorValue;
				allDay = data.CALENDAR_END.indexOf("23:59:59") != -1 ? true : false;
				break;
			case "FullCalendarEvent":
				id = data.id;
				start = data.start;
				end = data.end;
				bkColor = data.backgroundColor;
				allDay = data.allDay ? data.allDay : !$.fullCalendar.moment(data.start).hasTime();
				break;
			default:
				throw new Error('Can not identify data type.')
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
	}

	_checkDataType(data) {
		let objClass = data.constructor;
        let guidExam = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        let type;
        switch (objClass) {
            case String:
                if ( guidExam.test(data) ) type = "GUID";
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

	_parseInfo(infoStr) {
		let infoObject = {};
		// 拆解CALENDAR_INFO
		let infoArr = infoStr.split('/');
		infoArr.forEach(function(item, index, arr){
			let pair = item.split('=');
			infoObject[pair[0]] = pair[1];
		});
		// 处理颜色值
		infoObject.b = '#' + infoObject.b;

		return infoObject;
	};

	_stringifyInfo(infoObject = this._info) {
		this._updateInfo();
		let infoArr = [];
		let infoAttrArr = Object.keys(infoObject);
		infoAttrArr.forEach(function(item, index, arr){
			let singleInfo = `${item}=${infoObject[item]}`;
			infoArr.push(singleInfo);
		});
		return infoArr.join('/').replace('#', '');
	};

	_updateInfo() {
		let that = this;
		let infoObject = {
			'b': null,
			'r': '-1',
			'c': '0',
			'ci': 0 // 默认 0 表示背景为用户自定义
		};
		// 更新背景色'b'
		infoObject['b'] = this.backgroundColor.replace('#', '');
		// 更新颜色指数'ci'
		Config.colorItems.forEach(function(item, index, arr){
			if ( item.colorValue ==  that.backgroundColor) {
				// 当日程背景色与色表匹配时则用 color idex 来储存（兼容旧日历插件）
				infoObject['ci'] = index;
			};
		});
		// 应用更新
		this._info = infoObject;
	};

	_getEventHtml(title = this.title, content = ''){
		var htmlText = 
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

	toFullCalendarEvent() {
		// 注意方法返回的只是FullCalendarEvent的数据类型，并不是event对象
		let that = this;
		let newEvent = {};
		let keys = Object.keys(this);
		keys.splice(keys.findIndex( (i) => {return i == '_info'} ), 1);
		keys.forEach(function(item, index, arr){
			newEvent[item] = that[item];
		})
		return newEvent;
	};

	toWizEventData() {
		let that = this;
		let newEvent = {};
		newEvent.title = this.title;
		newEvent.guid = this.id;
		newEvent.CALENDAR_START = this.allDay ? moment(this.start).format('YYYY-MM-DD 00:00:00') : this.start;
		newEvent.CALENDAR_END = this.allDay ? moment(this.end).format('YYYY-MM-DD 23:59:59') : this.end;
		newEvent.CALENDAR_INFO = this._stringifyInfo();
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
		let doc = g_db.DocumentFromGUID(this.id);

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
		this._updateInfo();
		this._setParamValue(doc, "CALENDAR_INFO", this._stringifyInfo());
	};

	// 设置文档属性值
	_setParamValue(doc, key, value) {
		if (!doc) return false;
		doc.SetParamValue(key, value);
	};

	_createWizEventDoc() {
		//TODO: 保存全部数据包括Title
		// 创建WizDoc
		let location = `My Events/${ moment(this.start).format('YYYY-MM') }/`;
		let objFolder = g_db.GetFolderByLocation(location, true);
		let tempHtml = g_cmn.GetATempFileName('.html');
		let htmlText = this._getEventHtml(this.title, '');
		g_cmn.SaveTextToFile(tempHtml, htmlText, 'unicode');
		let doc = objFolder.CreateDocument2(this.title, "");
		doc.ChangeTitleAndFileName(this.title);
		doc.UpdateDocument6(tempHtml, tempHtml, 0x22);
		// 设置标签
		//if ( tags ) doc.SetTagsText2(tags, "Calendar");
		// 将信息编码到WizDoc属性中去
		let newEvent = this.toWizEventData();
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

	renderEvent() {
		// 看该事件是否已存在，如果存在则updateEvent
		if (!g_cal) throw new Error('Can not find FullCalendar Widget.')
	};

	refreshEvent(event) {
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

	static refreshEventSources() {
		//TODO: 将FullCalendar所有Sources删除，重新添加
		// 没点击一个视图更新时就执行
	}

}