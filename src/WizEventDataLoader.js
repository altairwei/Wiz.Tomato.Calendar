import $ from 'jquery';
import 'fullcalendar';
import { WizDatabase as g_db } from './WizInterface';
import CalendarEvent from './CalendarEvent';

export {wizRenderAllEvent};

/* 数据获取
----------------------------------------------------------------------------------------------------------------------*/
//TODO: 写成一个类吧

// TODO: 重写获取数据的方式
function _getWizEvent(start, end) {
	//TODO:
	let events = [];
	let EventCollection = objDatabase.GetCalendarEvents2(start, end);
	return events
}

// 从WizDatabase中获取所有数据文档
function _getAllOriginalEvent(events, start, end){
	let sql = `DOCUMENT_LOCATION not like '/Deleted Items/%' and (KB_GUID is null or KB_GUID = '')`;
	let and1 = ` and DOCUMENT_GUID in (select DOCUMENT_GUID from WIZ_DOCUMENT_PARAM where PARAM_NAME = 'CALENDAR_START'  and  PARAM_VALUE <= '${end}' )`;
	let and2 = ` and DOCUMENT_GUID in (select DOCUMENT_GUID from WIZ_DOCUMENT_PARAM where PARAM_NAME = 'CALENDAR_END'  and  PARAM_VALUE >= '${start}' )`;
	if (start) sql += and2;
	if (end) sql += and1; 
	if (g_db.DocumentsDataFromSQL) {
		try {
			let data = g_db.DocumentsDataFromSQL(sql);
			//
			let obj = JSON.parse(data);
			//
			if (!obj || !IsArray(obj)) return false;
			//
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
		throw new Error('Database not exist!');
		let docColletion = g_db.DocumentsFromSQL(sql);
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
	}

}

// 渲染所有事件
function wizRenderAllEvent( view, element, calendar ){
	if (!calendar) return false;
	const currentView = view //calendar.fullCalendar('getView');
	let eventsArr = [];
	//
	eventsArr = _getAllOriginalEvent(eventsArr, _d2s(currentView.start.toDate()), _d2s(currentView.end.toDate()));
	//
	try {
		calendar.fullCalendar('removeEvents');
		calendar.fullCalendar('addEventSource', {
			events: eventsArr
		});
	} catch (e) {
		console.error(e);
	}
}

/* 数据获取
----------------------------------------------------------------------------------------------------------------------*/

// 创建事件 start, end, jsEvent, view
function wizCreateEvent(start, end, jsEvent, view){
	try {
		// 获取用户设置
		let colorValue = g_createDialog.find('#tc-createpage-eventcolor').val();
		let titleValue = g_createDialog.find('#tc-createpage-eventtitle').val();
		let newEvent = new CalendarEvent({
			title: titleValue ? titleValue : g_loc_notitle,
			start: start,
			end: end,
			allDay: start.hasTime() && end.hasTime() ? false : true,
			backgroundColor: colorValue ? colorValue : '#32CD32',
		});
		// 保存并渲染事件
		newEvent.saveToWizEventDoc();
		newEvent.refetchData();
		newEvent.addToFullCalendar();
	} catch (e) {console.log(e)}
}

// 更新WizDoc修改时间
function _updateDocModifyDate(doc){
	var now = new Date();
	if (!doc) return false;
	now.setSeconds((now.getSeconds() + 1) % 60);
	doc.DateModified = _d2s(now);
}

// 日历事件拖动后更新数据
function wizUpdateDocDrop(event, delta, revertFunc, jsEvent, ui, view){
	// Call hasTime on the event’s start/end to see if it has been dropped in a timed or all-day area.
	let allDay = !event.start.hasTime();
	// 获取事件文档时间数据
	let doc = g_db.DocumentFromGUID(event.id);
	// 更新数据
	if ( allDay ) {
		let startStr = event.start.set({'h': 0, 'm': 0, 's': 0}).format('YYYY-MM-DD HH:mm:ss');
		let endStr = event.end.set({'h': 23, 'm': 59, 's': 59}).format('YYYY-MM-DD HH:mm:ss');
		setParamValue(doc, "CALENDAR_START", startStr);
		setParamValue(doc, "CALENDAR_END", endStr);
	} else {
		let startStr = event.start.format('YYYY-MM-DD HH:mm:ss');
		let endStr = event.end.format('YYYY-MM-DD HH:mm:ss');
		setParamValue(doc, "CALENDAR_START", startStr);
		setParamValue(doc, "CALENDAR_END", endStr);
	}
	// 
	_updateDocModifyDate(doc);
}

// 日历时间重置时间范围后更新数据
function wizUpdateDocResize(event, delta, revertFunc, jsEvent, ui, view){
	let allDay = event.start.hasTime() ? false : true;
	// 获得事件文档时间数据
	var doc = g_db.DocumentFromGUID(event.id);
	// 计算更改后的结束时间
	var eventEndStr = event.end.format('YYYY-MM-DD HH:mm:ss');
	// 更新文档数据
	setParamValue(doc, "CALENDAR_END", eventEndStr);
	_updateDocModifyDate(doc);
}

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

// 判断实参是否是数组的实例
function IsArray(array) {
    return (array instanceof Array);
}

// 检查及增加数值字符串长度，例如：'2' -> '02'
function checkAndAddStrLength(str) {
	if (str.length < 2) {
		return '0' + str;
	} else {
		return str;
	}
}

// 将日期对象转化为字符串
function _d2s(dt){
    //
    var ret = dt.getFullYear() + "-" + 
	    		formatIntToDateString(dt.getMonth() + 1) + "-" + 
	    		formatIntToDateString(dt.getDate()) + " " + 
	    		formatIntToDateString(dt.getHours())+ ":" + 
	    		formatIntToDateString(dt.getMinutes()) + ":" + 
	    		formatIntToDateString(dt.getSeconds());
    return ret;
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

// 设置文档属性值
function setParamValue(doc, key, value) {
	if (!doc) return false;
    doc.SetParamValue(key, value);
}
