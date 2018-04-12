// 浏览器对象
const objApp = window.external;
const objDatabase = objApp.Database;
const objCommon = objApp.CreateWizObject("WizKMControls.WizCommonUI");
const objWindow = objApp.Window;
const pluginPath = objApp.GetPluginPathByScriptFileName("Global.js");

// 全局变量
var g_isChrome, g_cal, g_createDialog;
var g_app = objApp;
var g_db = objDatabase;
var g_cmn = objCommon;
var g_colorCount = 12;
var g_colorItems = [
	{ "colorValue": "#32CD32", "colorName": g_loc_none },
	{ "colorValue": "#5484ED", "colorName": g_loc_boldBlue },
	{ "colorValue": "#A4BDFE", "colorName": g_loc_blue },
	{ "colorValue": "#46D6DB", "colorName": g_loc_turquoise },
	{ "colorValue": "#7AE7BF", "colorName": g_loc_green },
	{ "colorValue": "#51B749", "colorName": g_loc_boldGreen },
	{ "colorValue": "#FBD75B", "colorName": g_loc_yellow },
	{ "colorValue": "#FFB878", "colorName": g_loc_orange },
	{ "colorValue": "#FF887C", "colorName": g_loc_red },
	{ "colorValue": "#DC2127", "colorName": g_loc_boldRed },
	{ "colorValue": "#DBADFF", "colorName": g_loc_purple },
	{ "colorValue": "#E1E1E1", "colorName": g_loc_gray }
];

/* 定义类
----------------------------------------------------------------------------------------------------------------------*/

// 实现FullCalendar数据与WizDocEvent数据之间的相互转化
class CalendarEvent {
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
				bkColor = g_colorItems[this._info.ci].colorValue;
				allDay = data.CALENDAR_END.indexOf("23:59:59") != -1 ? true : false;
				break;
			case "FullCalendarEvent":
				id = data.id;
				start = data.start;
				end = data.end;
				bkColor = data.backgroundColor;
				allDay = data.allDay ? data.allDay : !$.fullCalendar.moment(data.start).hasTime();
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
			'ci': null
		};
		// 更新背景色'b'
		infoObject['b'] = this.backgroundColor.replace('#', '');
		// 更新颜色指数'ci'
		g_colorItems.forEach(function(item, index, arr){
			if ( item.colorValue ==  that.backgroundColor) {
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

		// 保存时间数据
		if ( this.allDay ) {
			let startStr = moment(this.start).set({'h': 0, 'm': 0, 's': 0}).format('YYYY-MM-DD HH:mm:ss');
			let endStr = moment(this.end).set({'h': 23, 'm': 59, 's': 59}).format('YYYY-MM-DD HH:mm:ss');
			setParamValue(doc, "CALENDAR_START", startStr);
			setParamValue(doc, "CALENDAR_END", endStr);
		} else {
			let startStr = moment(this.start).format('YYYY-MM-DD HH:mm:ss');
			let endStr = moment(this.end).format('YYYY-MM-DD HH:mm:ss');
			setParamValue(doc, "CALENDAR_START", startStr);
			setParamValue(doc, "CALENDAR_END", endStr);
		}
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

}

/* 定义组件
----------------------------------------------------------------------------------------------------------------------*/

$.widget("tc.EventPopover", {
	options: {
		title: 'No title !', //String
		content: '',
		template: `
		<div class="popover" role="tooltip">
		  <div class="arrow"></div>
		  <h3 class="popover-header"></h3>
		  <div class="popover-body"></div>
		</div>`,
		/*
		Base HTML to use when creating the popover.
		The popover's title will be injected into the .popover-header.
		The popover's content will be injected into the .popover-body.
		.arrow will become the popover's arrow.
		The outermost wrapper element should have the .popover class.
		*/
		templatePreprocessor: null,
		placement: 'right',
		offset: 0,

	},
	
	_create: function() {
		let that = this;
		let opts = this.options;
		let popper = this._processTemplate();
		this.popover = new Popper(this.element, popper, {
			placement: opts.placement,
			modifiers: {
				arrow: {
				  element: '.arrow'
				}
			},
		});

		// 点击空白处自动隐藏
		this._on(this.document, {
			click: function(e) {
				if(!that.element.is(e.target) && !that.toolkit.is(e.target) && that.toolkit.has(e.target).length === 0){
					that._hideToolkit();
				}
			}
		})


	},

	_processTemplate: function() {
		let opts = this.options;
		let tpp = opts.templatePreprocessor;
		let popper;

		if ( typeof tpp == 'function' ) {
			popper = tpp(opts.template);
		} else {
			popper = $(opts.template);
		}

		popper.find('.popover-header').text(title);
		popper.find('.popover-body').text(content);

		return popper
	}
})

///////////////////////////////////////
// 杂项和工具

// 判断内核
function isChrome() {
	if (g_isChrome) return g_isChrome;
	//
	var ua = navigator.userAgent.toLowerCase();
	g_isChrome = ua.indexOf('chrome') != -1;
	//
	return g_isChrome;
}

// 写入日志
function toLog(logStr){
	if (g_app) g_app.WriteToLog(logStr);
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
	//
	if (isChrome()) {
		doc.SetParamValue(key, value);
	}
	else {
		doc.ParamValue(key) = value;
	}
}

///////////////////////////////////////
// 数据获取

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
function wizRenderAllEvent(){
	if (!g_cal) return false;
	let currentView = g_cal.fullCalendar('getView');
	let doc;
	let eventsArr = [];
	//var objDocColletion = getAllRepeatEventDoc();

	
	//for (var i = 0; i < objDocColletion.Count; i ++){
	//	doc = objDocColletion.Item(i);
	//	if (doc){
	//		_getDocRepeatEvent(events,  _newPseudoDoc(doc));
	//	}		
	//}
	//
	eventsArr = _getAllOriginalEvent(eventsArr, _d2s(currentView.start.toDate()), _d2s(currentView.end.toDate()));
	//
	try {
		g_cal.fullCalendar('removeEvents');
		g_cal.fullCalendar('addEventSource', {
			events: eventsArr
		});
	} catch (e) {
		console.error(e);
	}
	
}

function eventObject(data) {
	if (!data) return false;
	//
	let newEvent = {};
	let allDay = data.CALENDAR_END.indexOf("23:59:59") != -1 ? true : false;
	let bkColor = _getEventBkColor(data.CALENDAR_INFO);
	let colorId = _getEventColorIdFromInfo(data.CALENDAR_INFO);
	let remind = _getRemindFromInfo(data.CALENDAR_INFO);
	//
	newEvent.id = data.guid;
	newEvent.title = data.title;
	newEvent.start = allDay ? moment(data.CALENDAR_START).format("YYYY-MM-DD") : data.CALENDAR_START;
	newEvent.end = allDay ? moment(data.CALENDAR_END).format("YYYY-MM-DD") : data.CALENDAR_END;
	// newEvent.content = data.text;
	newEvent.guid = data.guid;
	newEvent.allDay = allDay;
	newEvent.backgroundColor = '#' + bkColor;
	//newEvent.colorId = colorId;
	//newEvent.borderColor = getCalendarBorderColor();
	//TODO: 根据背景自动渲染对比度
	newEvent.textColor = 'black';
	newEvent.rptRule = data.CALENDAR_RECURRENCE;
	newEvent.rptEnd = data.CALENDAR_ENDRECURRENCE;
	newEvent.remind = remind;
	newEvent.created = data.created;
	newEvent.updated = data.updated;
	// newEvent.tag = data.tags_text;
	//newEvent.googleEventId = data.CALENDAR_GOOEVENTID; 
	//
	//console.log(newEvent)
	return newEvent;

}

///////////////////////////////////////
// 创建事件

// 渲染事件创建窗口
function renderCreatePage() {
	//TODO: 将事件创建窗口与主页面分离，需要时再加载
	let html = objCommon.LoadTextFromFile(pluginPath + "dialog/EventCreatePage.html");
	g_createDialog = $(html).dialog({
		classes: {
			'ui-dialog' : 'tc-dialog',
			'ui-dialog-titlebar' : 'tc-dialog-titlebar',
			'ui-dialog-buttonpane' : 'tc-dialog-buttonpane'
		},
		width: 400,
		height: 500,
		autoOpen: false,
		modal: false,
		show: { effect: "scale", duration: 200 },
		hide: { effect: "scale", duration: 200 },
		buttons: {
			"创建": function() {
				// 获取dialog的参数
				let args = $(this).dialog('option', 'args');
				wizCreateEvent(args);
				clearCreatePage();
				g_cal.fullCalendar('unselect');
			},
			'取消': function() {
				clearCreatePage();
				g_cal.fullCalendar('unselect');
			}
		},
		close: function(){
			clearCreatePage();
			g_cal.fullCalendar('unselect');
		}
	})
	.find( "form" ).on( "submit", function( event ) {
		// 防止重载页面
		event.preventDefault();
		// 日历事件创建
		let args = $( "#tc-create-dialog" ).dialog('option', 'args');
		wizCreateEvent(args);
		// 重置表单
		$( "#tc-create-dialog" ).find('form').each(function(index, element){
			element.reset();
			$(".tc-create-color-selected").removeClass("tc-create-color-selected");
		})
		$( "#tc-create-dialog" ).dialog( "close" );

	})
	.find('#color-picker').children().each(function(index, element){
		// 初始化颜色选择器
		let colorID = $(element).attr('index');
		$(element).css("backgroundColor", getColorValue(colorID));
		$(element).attr("title", getColorName(colorID));
		$(element).css("borderColor", getColorValue(colorID));

		// 绑定事件
		$(element).mouseover(function(){
			$(this).css("borderColor", "black");
		}).mouseout(function(){
			var colorID = $(this).attr("index");
			$(this).css("borderColor", getColorValue(colorID));
		}).click(function(){
			if ( $(".tc-create-color-selected").length != 0 ) {
				$(".tc-create-color-selected").removeClass("tc-create-color-selected");
			}
			$(this).addClass("tc-create-color-selected");
		});
		
	})
}

// 弹出日历事件创建窗口
function popupCreatePage(start, end, jsEvent, view){
	//TODO: 判断是否渲染
	if ( $('#tc-create-dialog').length = -1 ) renderCreatePage();
	// 传递参数
	$('#tc-create-dialog').dialog('option', 'args', {
		'start': start,
		'end': end,
		'jsEvent': jsEvent,
		'view': view,
	})
	.dialog('open');

}

// 关闭并重置日历事件创建窗口
function clearCreatePage() {
	let $createDialog = $('#tc-create-dialog');
	// 重置表单
	$createDialog.find('form').each(function(index, element){
		$(".tc-create-color-selected").removeClass("tc-create-color-selected");
		element.reset();
	})
	$createDialog.dialog( "close" );
}

// 创建事件 start, end, jsEvent, view
function wizCreateEvent(args){
	try {
	// 获取用户设置
	let start = args.start, end = args.end, jsEvent = args.jsEvent, view = args.view;
	let colorID = $(".tc-create-color-selected").length != 0 ? $(".tc-create-color-selected").attr('index') : '0';
	//let tags = $("#tags").val();
	let newEvent = new CalendarEvent({
		title: $('#title').val() ? $('#title').val() : g_loc_notitle,
		start: start,
		end: end,
		allDay: start.hasTime() && end.hasTime() ? false : true,
		backgroundColor: g_colorItems[colorID].colorValue,
	});
	// 保存并渲染事件
	newEvent.saveToWizEventDoc();
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

///////////////////////////////////////
// 重复事件

// 从文档信息中获得提醒信息
function _getRemindFromInfo(info){
	var infoArray = info.split('/');
	for (var i = 0; i < infoArray.length; i++) {
		if (infoArray[i].indexOf("r=") != -1){
			return infoArray[i].substr(infoArray[i].indexOf("=")+1);
		}
	};
	return;
}

///////////////////////////////////////
// 颜色相关设置

// 从事件信息中获得颜色ID
function _getEventColorIdFromInfo(info){
	var infoArray = info.split('/');
	for (var i = 0; i < infoArray.length; i ++){
		if (infoArray[i].indexOf("ci=") != -1){
			return infoArray[i].substr(infoArray[i].indexOf("=")+1);
		}
	}
	return;
}

// 从事件信息中获得颜色值
function _getEventColorFromInfo(info){
	var infoArray = info.split('/');
	for (var i = 0; i < infoArray.length; i ++){
		if (infoArray[i].indexOf("b=") != -1){
			return infoArray[i].substr(infoArray[i].indexOf("=")+1);
		}
	}
	return;		
}

// 通过ID获得实际颜色值
function getColorValue(colorId){
	if (!colorId || colorId < 0 || colorId > g_colorCount)
		return getCalendarColor();
	return g_colorItems[colorId].colorValue;
}

// 获得颜色名字
function getColorName(colorId){
	if (colorId < 0 || colorId > g_colorCount)
		return;
	return g_colorItems[colorId].colorName;
}

// 返回柠檬绿
function getCalendarColor(){
	return "#32CD32";
}

// 获得日历边框颜色
function getCalendarBorderColor(){
	var calendarColor = getCalendarColor();
	var red = parseInt(calendarColor.substr(1, 2), 16);
	var green = parseInt(calendarColor.substr(3, 2), 16);
	var blue = parseInt(calendarColor.substr(5, 2), 16);

	red -= red * (0.2);
	green -= green * (0.2);
	blue -= blue * (0.2);

	return "#" + checkAndAddStrLength(Math.floor(red).toString(16)) + 
					checkAndAddStrLength(Math.floor(green).toString(16)) + 
					checkAndAddStrLength(Math.floor(blue).toString(16));
}

// 获得事件背景颜色值
function _getEventBkColor(info){
	var colorId = _getEventColorIdFromInfo(info);
	if (!colorId){
		return _getEventColorFromInfo(info);
	}
	if (colorId == 0){
		return getCalendarColor().replace('#', '');
	}else {
		return getColorValue(colorId).replace('#', '');
	}
}

///////////////////////////////////////
// 创建组件

/*
StandardTheme.prototype.classes = {
    widget: 'fc-unthemed',
    widgetHeader: 'fc-widget-header',
    widgetContent: 'fc-widget-content',
    buttonGroup: 'fc-button-group',
    button: 'fc-button',
    cornerLeft: 'fc-corner-left',
    cornerRight: 'fc-corner-right',
    stateDefault: 'fc-state-default',
    stateActive: 'fc-state-active',
    stateDisabled: 'fc-state-disabled',
    stateHover: 'fc-state-hover',
    stateDown: 'fc-state-down',
    popoverHeader: 'fc-widget-header',
    popoverContent: 'fc-widget-content',
    // day grid
    headerRow: 'fc-widget-header',
    dayRow: 'fc-widget-content',
    // list view
    listView: 'fc-widget-content'
};
*/

var Toolbar = /** @class */ (function () {
    function Toolbar(calendar, toolbarOptions) {
        this.el = null; // mirrors local `el`
        this.viewsWithButtons = [];
        this.calendar = calendar;
        this.toolbarOptions = toolbarOptions;
    }
    // method to update toolbar-specific options, not calendar-wide options
    Toolbar.prototype.setToolbarOptions = function (newToolbarOptions) {
        this.toolbarOptions = newToolbarOptions;
    };
    // can be called repeatedly and will rerender
    Toolbar.prototype.render = function () {
        var sections = this.toolbarOptions.layout;
        var el = this.el;
        if (sections) {
            if (!el) {
                el = this.el = $("<div class='fc-toolbar " + this.toolbarOptions.extraClasses + "'/>");
            }
            else {
                el.empty();
            }
            el.append(this.renderSection('left'))
                .append(this.renderSection('right'))
                .append(this.renderSection('center'))
                .append('<div class="fc-clear"/>');
        }
        else {
            this.removeElement();
        }
    };
    Toolbar.prototype.removeElement = function () {
        if (this.el) {
            this.el.remove();
            this.el = null;
        }
    };
    Toolbar.prototype.renderSection = function (position) {
        var _this = this;
        var calendar = this.calendar;
        var theme = calendar.theme;
        var optionsManager = calendar.optionsManager;
        var viewSpecManager = calendar.viewSpecManager;
        var sectionEl = $('<div class="fc-' + position + '"/>');
        var buttonStr = this.toolbarOptions.layout[position];
        var calendarCustomButtons = optionsManager.get('customButtons') || {};
        var calendarButtonTextOverrides = optionsManager.overrides.buttonText || {};
        var calendarButtonText = optionsManager.get('buttonText') || {};
        if (buttonStr) {
            $.each(buttonStr.split(' '), function (i, buttonGroupStr) {
                var groupChildren = $();
                var isOnlyButtons = true;
                var groupEl;
                $.each(buttonGroupStr.split(','), function (j, buttonName) {
                    var customButtonProps;
                    var viewSpec;
                    var buttonClick;
                    var buttonIcon; // only one of these will be set
                    var buttonText; // "
                    var buttonInnerHtml;
                    var buttonClasses;
                    var buttonEl;
                    var buttonAriaAttr;
                    if (buttonName === 'title') {
                        groupChildren = groupChildren.add($('<h2>&nbsp;</h2>')); // we always want it to take up height
                        isOnlyButtons = false;
                    }
                    else {
                        if ((customButtonProps = calendarCustomButtons[buttonName])) {
                            buttonClick = function (ev) {
                                if (customButtonProps.click) {
                                    customButtonProps.click.call(buttonEl[0], ev);
                                }
                            };
                            (buttonIcon = theme.getCustomButtonIconClass(customButtonProps)) ||
                                (buttonIcon = theme.getIconClass(buttonName)) ||
                                (buttonText = customButtonProps.text);
                        }
                        else if ((viewSpec = viewSpecManager.getViewSpec(buttonName))) {
                            _this.viewsWithButtons.push(buttonName);
                            buttonClick = function () {
                                calendar.changeView(buttonName);
                            };
                            (buttonText = viewSpec.buttonTextOverride) ||
                                (buttonIcon = theme.getIconClass(buttonName)) ||
                                (buttonText = viewSpec.buttonTextDefault);
                        }
                        else if (calendar[buttonName]) {
                            buttonClick = function () {
                                calendar[buttonName]();
                            };
                            (buttonText = calendarButtonTextOverrides[buttonName]) ||
                                (buttonIcon = theme.getIconClass(buttonName)) ||
                                (buttonText = calendarButtonText[buttonName]);
                            //            ^ everything else is considered default
                        }
                        if (buttonClick) {
                            buttonClasses = [
                                'fc-' + buttonName + '-button',
                                theme.getClass('button'),
                                theme.getClass('stateDefault')
                            ];
                            if (buttonText) {
                                buttonInnerHtml = util_1.htmlEscape(buttonText);
                                buttonAriaAttr = '';
                            }
                            else if (buttonIcon) {
                                buttonInnerHtml = "<span class='" + buttonIcon + "'></span>";
                                buttonAriaAttr = ' aria-label="' + buttonName + '"';
                            }
                            buttonEl = $(// type="button" so that it doesn't submit a form
                            '<button type="button" class="' + buttonClasses.join(' ') + '"' +
                                buttonAriaAttr +
                                '>' + buttonInnerHtml + '</button>')
                                .click(function (ev) {
                                // don't process clicks for disabled buttons
                                if (!buttonEl.hasClass(theme.getClass('stateDisabled'))) {
                                    buttonClick(ev);
                                    // after the click action, if the button becomes the "active" tab, or disabled,
                                    // it should never have a hover class, so remove it now.
                                    if (buttonEl.hasClass(theme.getClass('stateActive')) ||
                                        buttonEl.hasClass(theme.getClass('stateDisabled'))) {
                                        buttonEl.removeClass(theme.getClass('stateHover'));
                                    }
                                }
                            })
                                .mousedown(function () {
                                // the *down* effect (mouse pressed in).
                                // only on buttons that are not the "active" tab, or disabled
                                buttonEl
                                    .not('.' + theme.getClass('stateActive'))
                                    .not('.' + theme.getClass('stateDisabled'))
                                    .addClass(theme.getClass('stateDown'));
                            })
                                .mouseup(function () {
                                // undo the *down* effect
                                buttonEl.removeClass(theme.getClass('stateDown'));
                            })
                                .hover(function () {
                                // the *hover* effect.
                                // only on buttons that are not the "active" tab, or disabled
                                buttonEl
                                    .not('.' + theme.getClass('stateActive'))
                                    .not('.' + theme.getClass('stateDisabled'))
                                    .addClass(theme.getClass('stateHover'));
                            }, function () {
                                // undo the *hover* effect
                                buttonEl
                                    .removeClass(theme.getClass('stateHover'))
                                    .removeClass(theme.getClass('stateDown')); // if mouseleave happens before mouseup
                            });
                            groupChildren = groupChildren.add(buttonEl);
                        }
                    }
                });
                if (isOnlyButtons) {
                    groupChildren
                        .first().addClass(theme.getClass('cornerLeft')).end()
                        .last().addClass(theme.getClass('cornerRight')).end();
                }
                if (groupChildren.length > 1) {
                    groupEl = $('<div/>');
                    if (isOnlyButtons) {
                        groupEl.addClass(theme.getClass('buttonGroup'));
                    }
                    groupEl.append(groupChildren);
                    sectionEl.append(groupEl);
                }
                else {
                    sectionEl.append(groupChildren); // 1 or 0 children
                }
            });
        }
        return sectionEl;
    };
    Toolbar.prototype.updateTitle = function (text) {
        if (this.el) {
            this.el.find('h2').text(text);
        }
    };
    Toolbar.prototype.activateButton = function (buttonName) {
        if (this.el) {
            this.el.find('.fc-' + buttonName + '-button')
                .addClass(this.calendar.theme.getClass('stateActive'));
        }
    };
    Toolbar.prototype.deactivateButton = function (buttonName) {
        if (this.el) {
            this.el.find('.fc-' + buttonName + '-button')
                .removeClass(this.calendar.theme.getClass('stateActive'));
        }
    };
    Toolbar.prototype.disableButton = function (buttonName) {
        if (this.el) {
            this.el.find('.fc-' + buttonName + '-button')
                .prop('disabled', true)
                .addClass(this.calendar.theme.getClass('stateDisabled'));
        }
    };
    Toolbar.prototype.enableButton = function (buttonName) {
        if (this.el) {
            this.el.find('.fc-' + buttonName + '-button')
                .prop('disabled', false)
                .removeClass(this.calendar.theme.getClass('stateDisabled'));
        }
    };
    Toolbar.prototype.getViewsWithButtons = function () {
        return this.viewsWithButtons;
    };
    return Toolbar;
}());

///////////////////////////////////////
// 初始化

// 初始化FullCalendar
$(document).ready(function(){
	let date = new Date();
	let d = date.getDate();
	let m = date.getMonth();
	let y = date.getFullYear();
	let isFirst = true;
		
	// Full Calendar 设置
	g_cal = $('#calendar').fullCalendar({
		themeSystem: 'standard',
		height: 'parent',
		header: {
			left: 'prev,next,today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay,listWeek'
		},
		views: {
			// titleFormat 的语法改变了，原有的以及失效
			month: {
				//titleFormat: g_loc_titleformat_month, //var g_loc_titleformat_month = "MMMM yyyy";
			},
			agenda: {
				minTime: "08:00:00",
				slotLabelFormat: 'h(:mm) a'
			},
			listWeek: {

			}
		},
		navLinks: true,
		allDayDefault: false,
		defaultView: 'agendaWeek',
		eventLimit: true,
		buttonText: {
			today: g_loc_button_today,
			month: g_loc_button_month,
			week: g_loc_button_week,
			day: g_loc_button_day,
			list: '表'
        },
		monthNames: [
            g_loc_monthname_1, g_loc_monthname_2, g_loc_monthname_3, g_loc_monthname_4, 
            g_loc_monthname_5, g_loc_monthname_6, g_loc_monthname_7, g_loc_monthname_8, 
            g_loc_monthname_9, g_loc_monthname_10, g_loc_monthname_11, g_loc_monthname_12
        ],
		monthNamesShort: [
            g_loc_monthnameshort_1, g_loc_monthnameshort_2, g_loc_monthnameshort_3, g_loc_monthnameshort_4, 
            g_loc_monthnameshort_5, g_loc_monthnameshort_6, g_loc_monthnameshort_7, g_loc_monthnameshort_8, 
            g_loc_monthnameshort_9, g_loc_monthnameshort_10, g_loc_monthnameshort_11, g_loc_monthnameshort_12
        ],
		dayNames: [
            g_loc_dayname_0, g_loc_dayname_1, g_loc_dayname_2, g_loc_dayname_3, g_loc_dayname_4, g_loc_dayname_5, g_loc_dayname_6
        ],
		dayNamesShort: [
            g_loc_daynameshort_0, g_loc_daynameshort_1, g_loc_daynameshort_2, g_loc_daynameshort_3, g_loc_daynameshort_4, g_loc_daynameshort_5, g_loc_daynameshort_6
        ],
		selectable: true,
		selectHelper: true,
		unselectCancel: '#tc-create-dialog, #tc-create-form,.tc-dialog-titlebar,.tc-dialog-buttonpane',
		unselect: clearCreatePage,
		allDayText: g_loc_allday,
		nowIndicator: true,
		forceEventDuration: true,
        // 第一天是周一还是周天，与datepicker必须相同。
		firstDay: 1,

		// 定义事件句柄
		// 选择动作触发的事件句柄，定义了一个callback
		select: function(start, end, jsEvent, view){
			popupCreatePage(start, end, jsEvent, view);
		},
		dragOpacity:{
			"month": .5,
			"agendaWeek": 1,
			"agendaDay": 1
		},
		editable: true,
		eventDragStart: function( event, jsEvent, ui, view ) { },
		eventDragStop: function(event, jsEvent, ui, view){ },
		// 日历事件拖动 event, delta, revertFunc, jsEvent, ui, view
		eventDrop: function(event, delta, revertFunc, jsEvent, ui, view){
			if (event.id){
				//
				wizUpdateDocDrop(event, delta, revertFunc, jsEvent, ui, view);
				
			} else {
				revertFunc();
			}
		},
		eventResize: function(event, delta, revertFunc, jsEvent, ui, view){
			if (event.id){
				//
				wizUpdateDocResize(event, delta, revertFunc, jsEvent, ui, view);
				
			} else {
				revertFunc();
			}
		},
		eventClick: function( event, jsEvent, view ) {
			$(jsEvent.target).popover({
				title: event.title,
				placement: 'auto',
				trigger: 'manual'
			})
		}
		
	});// 结束FullCalendar构建

	// 初始化数据
	wizRenderAllEvent();
});