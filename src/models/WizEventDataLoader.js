import { WizDatabase as objDatabase } from '../utils/WizInterface';
import CalendarEvent from './CalendarEvent';

/* 数据获取
----------------------------------------------------------------------------------------------------------------------*/

/** 该类与Wiznote的WizDatabase接口交换信息，获取数据 */
export default class WizEventDataLoader {

	/**
     * 创造一个事件数据加载器.
	 * @param {string} start 查询起始日期，ISO标准日期字符串.
	 * @param {string} end 查询截至日期，ISO标准日期字符串.
     */
	constructor() {
		if (!objDatabase) throw new Error('WizDatabase not valid !');
		this.Database = objDatabase;
		this.userName = objDatabase.UserName;
	};

	/**
     * 获得渲染后的所有FullCalendar事件.
	 * @param {object} view is the View Object of FullCalendar for the new view.
	 * @param {object} element is a jQuery element for the container of the new view.
     * @return {Object[]} 返回用于FullCalendar 渲染的 eventSources 数组.
     */
	getEventSources( view, element ){
		const viewStart = view.start.format('YYYY-MM-DD HH:mm:ss');
		const viewEnd = view.end.format('YYYY-MM-DD HH:mm:ss');
		let eventSources = [];
		//获取普通日程
		const generalEventSource = {
			type: 'generalEvents',
			//events: this._getAllOriginalEvent([], this._d2s(currentView.start.toDate()), this._d2s(currentView.end.toDate()))
			events: this._getAllOriginalEvent(viewStart, viewEnd)
		}
		eventSources.push(generalEventSource);
		
		//TODO: 获取重复日程
		const repeatEventSources = this._getAllRepeatEvent(viewStart, viewEnd);
		eventSources = eventSources.concat(repeatEventSources);
		//
		return eventSources;
	};

	/**
     * 从WizDatabase中获取所有数据文档.
	 * @param {array} events 初始事件数组.
	 * @param {string} start ISO标准日期字符串.
	 * @param {string} end ISO标准日期字符串.
     * @return {Object[]} 返回用于FullCalendar渲染的事件数组.
     */
	_getAllOriginalEvent(start, end){
		const events = [];
		let sql = `DOCUMENT_LOCATION not like '/Deleted Items/%' and (KB_GUID is null or KB_GUID = '')`;
		let and1 = ` and DOCUMENT_GUID in (select DOCUMENT_GUID from WIZ_DOCUMENT_PARAM where PARAM_NAME = 'CALENDAR_START'  and  PARAM_VALUE <= '${end}' )`;
		let and2 = ` and DOCUMENT_GUID in (select DOCUMENT_GUID from WIZ_DOCUMENT_PARAM where PARAM_NAME = 'CALENDAR_END'  and  PARAM_VALUE >= '${start}' )`;
		if (start) sql += and2;
		if (end) sql += and1;
		if (objDatabase.DocumentsDataFromSQL) {
			try {
				const data = objDatabase.DocumentsDataFromSQL(sql);
				if ( !data ) return false;
				const obj = JSON.parse(data);
				if ( !obj || !Array.isArray(obj) ) return false;
				for (let i = 0; i < obj.length; i ++) {
					events.push(
						new CalendarEvent(obj[i]).toFullCalendarEvent()
					);
				}
				
				return events;
			}
			catch(err) {
				console.error(err);
				return false;
			}
		}
		else {
			throw new Error('DocumentsDataFromSQL method of WizDatabase not exist!');
			/*
			let docColletion = objDatabase.DocumentsFromSQL(sql);
			//
			if (docColletion && docColletion.Count){
				let doc;
				for (let i = 0; i < docColletion.Count; ++ i){
					doc = docColletion.Item(i);
					let eventObj = _eventObject(_newPseudoDoc(doc));
					if (eventObj)
						events.push(eventObj);
				}
				return events;
			}
			*/		
		}

	};

	/**
     * 从WizDatabase中获取所有循环重复事件.
	 * 从创建事件的日期开始到ENDRECURRENCE结束
     * @return {Object[]} 返回用于FullCalendar渲染的 eventSource 数组.
     */
	_getAllRepeatEvent(start, end){
		const repeatEvents = [];
		const sql = "DOCUMENT_LOCATION not like '/Deleted Items/%' and (KB_GUID is null or KB_GUID = '') and " + 
					"DOCUMENT_GUID in (select DOCUMENT_GUID from WIZ_DOCUMENT_PARAM where PARAM_NAME='CALENDAR_RECURRENCE')";

		const data = objDatabase.DocumentsDataFromSQL(sql);
		console.log(data)
		if ( !data ) return false;
		
		const obj = JSON.parse(data);
		if ( !obj || !Array.isArray(obj) ) return false;
		
		for (let i = 0; i < obj.length; i ++) {
			repeatEvents.push(
				new CalendarEvent(obj[i]).generateRepeatEvents(start, end)
			)
		}
		return repeatEvents;
		
	};

	// 日历事件拖动后更新数据
	updateEventDataOnDrop(event, delta, revertFunc, jsEvent, ui, view){
		// Call hasTime on the event’s start/end to see if it has been dropped in a timed or all-day area.
		const allDay = !event.start.hasTime();
		// 获取事件文档时间数据
		const doc = objDatabase.DocumentFromGUID(event.id);
		// 更新数据
		if ( allDay ) {
			const startStr = event.start.set({'h': 0, 'm': 0, 's': 0}).format('YYYY-MM-DD HH:mm:ss');
			const endStr = event.end.set({'h': 23, 'm': 59, 's': 59}).format('YYYY-MM-DD HH:mm:ss');
			this._setParamValue(doc, "CALENDAR_START", startStr);
			this._setParamValue(doc, "CALENDAR_END", endStr);
		} else {
			const startStr = event.start.format('YYYY-MM-DD HH:mm:ss');
			const endStr = event.end.format('YYYY-MM-DD HH:mm:ss');
			this._setParamValue(doc, "CALENDAR_START", startStr);
			this._setParamValue(doc, "CALENDAR_END", endStr);
		}
		//TODO: 更新CALENDAR_RECURRENCE数据
		// 
		this._updateDocModifyDate(doc);
	};

	// 设置文档属性值
	_setParamValue(doc, key, value) {
		if (!doc) return false;
		doc.SetParamValue(key, value);
	};

	// 更新WizDoc修改时间
	_updateDocModifyDate(doc){
		const now = new Date();
		if (!doc) return false;
		now.setSeconds((now.getSeconds() + 1) % 60);
		doc.DateModified = this._d2s(now);
	};

	// 将日期对象转化为字符串
	//TODO: 考虑依赖moment来简化转换过程
	_d2s(dt){
		const ret = dt.getFullYear() + "-" + 
					formatIntToDateString(dt.getMonth() + 1) + "-" + 
					formatIntToDateString(dt.getDate()) + " " + 
					formatIntToDateString(dt.getHours())+ ":" + 
					formatIntToDateString(dt.getMinutes()) + ":" + 
					formatIntToDateString(dt.getSeconds());
		return ret;
	};

	// 日历时间重置时间范围后更新数据
	updateEventDataOnResize(event, delta, revertFunc, jsEvent, ui, view){
		const allDay = event.start.hasTime() ? false : true;
		// 获得事件文档时间数据
		const doc = objDatabase.DocumentFromGUID(event.id);
		// 计算更改后的结束时间
		const eventEndStr = event.end.format('YYYY-MM-DD HH:mm:ss');
		// 更新文档数据
		this._setParamValue(doc, "CALENDAR_END", eventEndStr);
		this._updateDocModifyDate(doc);
	};

	// 创建事件 start, end, jsEvent, view
	/**
     * 创建事件.
	 * @param {Object} selectionData FullCalendar 传入的数据.
	 * @param {Object} selectionData.start Moment 类日期对象.
	 * @param {Object} selectionData.end Moment 类日期对象.
	 * @param {Object} selectionData.jsEvent native JavaScript 事件.
	 * @param {Object} selectionData.view FullCalendar 视图对象.
	 * @param {Object} userInputs 用户传入的其他信息.
     * TODO: 该方法可以放置到CalendarEvent的静态方法上
     */
	createEvent(selectionData, userInputs){
		// 获取用户设置
		const newEvent = new CalendarEvent({
			title: userInputs.title ? userInputs.title : '无标题',
			start: selectionData.start,
			end: selectionData.end,
			allDay: selectionData.start.hasTime() && selectionData.end.hasTime() ? false : true,
			backgroundColor: userInputs.color ? userInputs.color : '#32CD32',
		});
		// 保存并渲染事件
		newEvent.saveToWizEventDoc();
		newEvent.refetchData();
		return newEvent;
	}

}


// TODO: 重写获取数据的方式
function _getWizEvent(start, end) {
	//TODO:
	let events = [];
	let EventCollection = objDatabase.GetCalendarEvents2(start, end);
	return events
}

// 获得渲染后的重复日期
function getRenderRepeatDay(){
	var dayArray = new Array();
	var eventStart = new Date(_s2d(g_eventStart));
		
	switch (g_repeatRule){
            case "EveryWeek1":
            case "EveryWeek2":
            case "EveryWeek3":
            case "EveryWeek4":
            case "EveryWeek5":
            case "EveryWeek6":
            case "EveryWeek7":
				getWeeklyRepeatDay(dayArray, [g_repeatRule.charAt(9)]);
                break;
            case "EveryWeekday":
				getWeeklyRepeatDay(dayArray, [1, 2, 3, 4, 5]);
                break;
            case "EveryWeekday135":
				getWeeklyRepeatDay(dayArray, [1, 3, 5]);
				break;
            case "EveryWeekday24":
				getWeeklyRepeatDay(dayArray, [2, 4]);
				break;
            case "EveryWeekday67":
				getWeeklyRepeatDay(dayArray, [6, 7]);
				break;
            case "Daily":
				getWeeklyRepeatDay(dayArray, [1, 2, 3, 4, 5, 6, 7]);
				break;
            case "Weekly":// 每周
				getWeeklyRepeatDay(dayArray, [eventStart.getDay()]);
				break;
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
            case "Monthly":
				getMonthlyRepeatDay(dayArray);
				break;
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
        
	return dayArray;
}


/* 数据获取
----------------------------------------------------------------------------------------------------------------------*/


/* 杂项和工具
----------------------------------------------------------------------------------------------------------------------*/

// 判断内核
function isChrome() {
	if (g_isChrome) return g_isChrome;
	//
	var ua = navigator.userAgent.toLowerCase();
	g_isChrome = ua.indexOf('chrome') != -1;
	//
	return g_isChrome;
}

// 将整数转换成日期字符串
function formatIntToDateString(n){
		
	return n < 10 ? '0' + n : n;
}

// 检查及增加数值字符串长度，例如：'2' -> '02'
function checkAndAddStrLength(str) {
	if (str.length < 2) {
		return '0' + str;
	} else {
		return str;
	}
}

// 将字符串转化为日期对象
function _s2d(str){
	if (!str)
		return '';
	var date = new Date(str.substr(0, 4),
					str.substr(5, 2) - 1,
					str.substr(8, 3),
					str.substr(11, 2),
					str.substr(14, 2),
					str.substr(17, 2)
					);		
	return date;
}
