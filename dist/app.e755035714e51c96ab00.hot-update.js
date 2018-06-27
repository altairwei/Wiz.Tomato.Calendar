webpackHotUpdate("app",{

/***/ "./src/CalendarEvent.js":
/*!******************************!*\
  !*** ./src/CalendarEvent.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CalendarEvent; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fullcalendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fullcalendar */ "./node_modules/fullcalendar/dist/fullcalendar.js");
/* harmony import */ var fullcalendar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fullcalendar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _WizInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WizInterface */ "./src/WizInterface.js");
/* harmony import */ var _Config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Config */ "./src/Config.js");





const g_cal = $('#calendar');

class CalendarEvent {
	/**
     * 创建一个通用日程.
	 * @param {Object} data 原始数据类型，可以是 WizEvent, FullCalendarEvent 以及 GUID.
     */
	constructor( data ) {
		if (!_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"]) throw new Error('IWizDatabase is not valid.');
		const type = this._checkDataType(data);
		switch ( type ) {
			case "WizEvent":
				try {
					this._Info = this._parseInfo(data.CALENDAR_INFO);
					this._ExtraInfo = data.CALENDAR_EXTRAINFO ? this._parseInfo(data.CALENDAR_EXTRAINFO) : this._getDefaultExtraInfo();
					this._create(data, type);
				} catch (e) { console.error(e); }
				break;
			case "FullCalendarEvent":
				try {
					this._create(data, type);
					// 设置info对象
					this._update();
				} catch (e) { console.error(e); }
				break;
			case "GUID":
				try {
					//TODO: 获得WizEvent数据，并创建对象
					const doc = _WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"].DocumentFromGUID(data);
					const newEventData = {
						"CALENDAR_END" : doc.GetParamValue('CALENDAR_END'),
						"CALENDAR_INFO" : doc.GetParamValue('CALENDAR_INFO'),
						"CALENDAR_START" : doc.GetParamValue('CALENDAR_START'),
						"created" : moment__WEBPACK_IMPORTED_MODULE_0___default()(doc.DateCreated).format('YYYY-MM-DD HH:mm:ss'),
						"guid" : doc.GUID,
						"title" : doc.Title,
						"updated" : moment__WEBPACK_IMPORTED_MODULE_0___default()(doc.DateModified).format('YYYY-MM-DD HH:mm:ss')
					}
					this._create(newEventData, 'WizEvent');
				} catch (e) { console.error(e); }
				break;
		}
	};

	_create(data, type) {
		let start, end, id, bkColor, allDay, complete, dateCompleted;
		switch (type) {
			case "WizEvent":
				// 统一变量
				id = data.guid;
				start = data.CALENDAR_START;
				end = data.CALENDAR_END;
				// 判断是否用户自定义背景色，向下兼容原版日历
				bkColor = this._Info.ci ? ( parseInt(this._Info.ci) == 0 ? this._Info.b : _Config__WEBPACK_IMPORTED_MODULE_3__["default"].colorItems[this._Info.ci].colorValue ) : this._Info.b;
				allDay = data.CALENDAR_END.indexOf("23:59:59") != -1 ? true : false;
				complete = this._ExtraInfo.Complete;
				dateCompleted = this._ExtraInfo.DateCompleted;
				break;
			case "FullCalendarEvent":
				id = data.id;
				start = data.start;
				end = data.end;
				bkColor = data.backgroundColor;
				allDay = data.allDay ? data.allDay : !$.fullCalendar.moment(data.start).hasTime();
				complete = data.complete || 0;
				dateCompleted = data.dateCompleted || '';
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
		this.start = allDay ? moment__WEBPACK_IMPORTED_MODULE_0___default()(start).format("YYYY-MM-DD") : moment__WEBPACK_IMPORTED_MODULE_0___default()(start).format('YYYY-MM-DD HH:mm:ss');
		this.end = allDay ? moment__WEBPACK_IMPORTED_MODULE_0___default()(end).format("YYYY-MM-DD") : moment__WEBPACK_IMPORTED_MODULE_0___default()(end).format('YYYY-MM-DD HH:mm:ss');
		this.created = data.created ? data.created : moment__WEBPACK_IMPORTED_MODULE_0___default()(start).format('YYYY-MM-DD HH:mm:ss');
		this.updated = data.updated ? data.updated : moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYY-MM-DD HH:mm:ss');
		// 设置信息
		this.textColor = 'black';
		this.backgroundColor = bkColor;
		this.complete = complete;
		this.dateCompleted = dateCompleted;
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
		_Config__WEBPACK_IMPORTED_MODULE_3__["default"].colorItems.forEach(function(item, index, arr){
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
     * @return {Object} eventSource.
     */
	generateRepeatEvents(start, end) {
		if ( !this.rptRule ) throw new Error('Cannot find CalendarEvent repeat rule.');
		//TODO: 根据rptRule生成重复日期

		//TODO: 根据 start, end 限制重复日期上下限, 并且禁止在CalendarEvent.start当天再创建重复事件

		//TODO: 根据重复日期循环生成重复事件，并组装成 source object 格式
	};

	toFullCalendarEvent() {
		// 注意方法返回的只是FullCalendarEvent的数据类型，并不是event对象
		const that = this;
		const newEvent = {};
		const keys = Object.keys(this);
		keys.splice( keys.findIndex( (i) => i == '_Info' ), 1);
		keys.splice( keys.findIndex( (i) => i == '_ExtraInfo' ), 1);
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
		newEvent.CALENDAR_START = this.allDay ? moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start).format('YYYY-MM-DD 00:00:00') : this.start;
		newEvent.CALENDAR_END = this.allDay ? moment__WEBPACK_IMPORTED_MODULE_0___default()(this.end).format('YYYY-MM-DD 23:59:59') : this.end;
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
		const doc = _WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"].DocumentFromGUID(this.id);
		// 保存标题
		doc.Title = this.title;
		// 保存时间数据
		if ( this.allDay ) {
			let startStr = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start).set({'h': 0, 'm': 0, 's': 0}).format('YYYY-MM-DD HH:mm:ss');
			let endStr = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.end).set({'h': 23, 'm': 59, 's': 59}).format('YYYY-MM-DD HH:mm:ss');
			this._setParamValue(doc, "CALENDAR_START", startStr);
			this._setParamValue(doc, "CALENDAR_END", endStr);
		} else {
			let startStr = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start).format('YYYY-MM-DD HH:mm:ss');
			let endStr = moment__WEBPACK_IMPORTED_MODULE_0___default()(this.end).format('YYYY-MM-DD HH:mm:ss');
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
		const location = `My Events/${ moment__WEBPACK_IMPORTED_MODULE_0___default()(this.start).format('YYYY-MM') }/`;
		const objFolder = _WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"].GetFolderByLocation(location, true);
		const tempHtml = _WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizCommonUI"].GetATempFileName('.html');
		const htmlText = this._getEventHtml(this.title, '');
		_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizCommonUI"].SaveTextToFile(tempHtml, htmlText, 'unicode');
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
		if (!_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"] || !_WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizCommonUI"]) throw new Error('IWizDatabase or IWizCommonUI is not valid.');
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
		let doc = _WizInterface__WEBPACK_IMPORTED_MODULE_2__["WizDatabase"].DocumentFromGUID(this.id);
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

	static refreshEventSources() {
		//TODO: 将FullCalendar所有Sources删除，重新添加
		// 没点击一个视图更新时就执行
	}

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQ2FsZW5kYXJFdmVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ21EO0FBQ25EOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssWUFBWSxrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxZQUFZLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLFlBQVksa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUNBQXVDLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLEdBQUc7QUFDckc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixLQUFLLEdBQUcsaUJBQWlCO0FBQ2xEO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdEO0FBQ3hELGNBQWMsTUFBTTtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlGQUEwQyx1QkFBdUI7QUFDakUsNkVBQXNDLDBCQUEwQjtBQUNoRTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyw4RUFBdUM7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsR0FBRztBQUM3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEMiLCJmaWxlIjoiYXBwLmU3NTUwMzU3MTRlNTFjOTZhYjAwLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XHJcbmltcG9ydCAnZnVsbGNhbGVuZGFyJztcclxuaW1wb3J0IHsgV2l6RGF0YWJhc2UgYXMgZ19kYiwgV2l6Q29tbW9uVUkgYXMgZ19jbW59IGZyb20gJy4vV2l6SW50ZXJmYWNlJztcclxuaW1wb3J0IENvbmZpZyBmcm9tICcuL0NvbmZpZyc7XHJcblxyXG5jb25zdCBnX2NhbCA9ICQoJyNjYWxlbmRhcicpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXJFdmVudCB7XHJcblx0LyoqXHJcbiAgICAgKiDliJvlu7rkuIDkuKrpgJrnlKjml6XnqIsuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGRhdGEg5Y6f5aeL5pWw5o2u57G75Z6L77yM5Y+v5Lul5pivIFdpekV2ZW50LCBGdWxsQ2FsZW5kYXJFdmVudCDku6Xlj4ogR1VJRC5cclxuICAgICAqL1xyXG5cdGNvbnN0cnVjdG9yKCBkYXRhICkge1xyXG5cdFx0aWYgKCFnX2RiKSB0aHJvdyBuZXcgRXJyb3IoJ0lXaXpEYXRhYmFzZSBpcyBub3QgdmFsaWQuJyk7XHJcblx0XHRjb25zdCB0eXBlID0gdGhpcy5fY2hlY2tEYXRhVHlwZShkYXRhKTtcclxuXHRcdHN3aXRjaCAoIHR5cGUgKSB7XHJcblx0XHRcdGNhc2UgXCJXaXpFdmVudFwiOlxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHR0aGlzLl9JbmZvID0gdGhpcy5fcGFyc2VJbmZvKGRhdGEuQ0FMRU5EQVJfSU5GTyk7XHJcblx0XHRcdFx0XHR0aGlzLl9FeHRyYUluZm8gPSBkYXRhLkNBTEVOREFSX0VYVFJBSU5GTyA/IHRoaXMuX3BhcnNlSW5mbyhkYXRhLkNBTEVOREFSX0VYVFJBSU5GTykgOiB0aGlzLl9nZXREZWZhdWx0RXh0cmFJbmZvKCk7XHJcblx0XHRcdFx0XHR0aGlzLl9jcmVhdGUoZGF0YSwgdHlwZSk7XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkgeyBjb25zb2xlLmVycm9yKGUpOyB9XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgXCJGdWxsQ2FsZW5kYXJFdmVudFwiOlxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHR0aGlzLl9jcmVhdGUoZGF0YSwgdHlwZSk7XHJcblx0XHRcdFx0XHQvLyDorr7nva5pbmZv5a+56LGhXHJcblx0XHRcdFx0XHR0aGlzLl91cGRhdGUoKTtcclxuXHRcdFx0XHR9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoZSk7IH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcIkdVSURcIjpcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0Ly9UT0RPOiDojrflvpdXaXpFdmVudOaVsOaNru+8jOW5tuWIm+W7uuWvueixoVxyXG5cdFx0XHRcdFx0Y29uc3QgZG9jID0gZ19kYi5Eb2N1bWVudEZyb21HVUlEKGRhdGEpO1xyXG5cdFx0XHRcdFx0Y29uc3QgbmV3RXZlbnREYXRhID0ge1xyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0VORFwiIDogZG9jLkdldFBhcmFtVmFsdWUoJ0NBTEVOREFSX0VORCcpLFxyXG5cdFx0XHRcdFx0XHRcIkNBTEVOREFSX0lORk9cIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9JTkZPJyksXHJcblx0XHRcdFx0XHRcdFwiQ0FMRU5EQVJfU1RBUlRcIiA6IGRvYy5HZXRQYXJhbVZhbHVlKCdDQUxFTkRBUl9TVEFSVCcpLFxyXG5cdFx0XHRcdFx0XHRcImNyZWF0ZWRcIiA6IG1vbWVudChkb2MuRGF0ZUNyZWF0ZWQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpLFxyXG5cdFx0XHRcdFx0XHRcImd1aWRcIiA6IGRvYy5HVUlELFxyXG5cdFx0XHRcdFx0XHRcInRpdGxlXCIgOiBkb2MuVGl0bGUsXHJcblx0XHRcdFx0XHRcdFwidXBkYXRlZFwiIDogbW9tZW50KGRvYy5EYXRlTW9kaWZpZWQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR0aGlzLl9jcmVhdGUobmV3RXZlbnREYXRhLCAnV2l6RXZlbnQnKTtcclxuXHRcdFx0XHR9IGNhdGNoIChlKSB7IGNvbnNvbGUuZXJyb3IoZSk7IH1cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRfY3JlYXRlKGRhdGEsIHR5cGUpIHtcclxuXHRcdGxldCBzdGFydCwgZW5kLCBpZCwgYmtDb2xvciwgYWxsRGF5LCBjb21wbGV0ZSwgZGF0ZUNvbXBsZXRlZDtcclxuXHRcdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0XHRjYXNlIFwiV2l6RXZlbnRcIjpcclxuXHRcdFx0XHQvLyDnu5/kuIDlj5jph49cclxuXHRcdFx0XHRpZCA9IGRhdGEuZ3VpZDtcclxuXHRcdFx0XHRzdGFydCA9IGRhdGEuQ0FMRU5EQVJfU1RBUlQ7XHJcblx0XHRcdFx0ZW5kID0gZGF0YS5DQUxFTkRBUl9FTkQ7XHJcblx0XHRcdFx0Ly8g5Yik5pat5piv5ZCm55So5oi36Ieq5a6a5LmJ6IOM5pmv6Imy77yM5ZCR5LiL5YW85a655Y6f54mI5pel5Y6GXHJcblx0XHRcdFx0YmtDb2xvciA9IHRoaXMuX0luZm8uY2kgPyAoIHBhcnNlSW50KHRoaXMuX0luZm8uY2kpID09IDAgPyB0aGlzLl9JbmZvLmIgOiBDb25maWcuY29sb3JJdGVtc1t0aGlzLl9JbmZvLmNpXS5jb2xvclZhbHVlICkgOiB0aGlzLl9JbmZvLmI7XHJcblx0XHRcdFx0YWxsRGF5ID0gZGF0YS5DQUxFTkRBUl9FTkQuaW5kZXhPZihcIjIzOjU5OjU5XCIpICE9IC0xID8gdHJ1ZSA6IGZhbHNlO1xyXG5cdFx0XHRcdGNvbXBsZXRlID0gdGhpcy5fRXh0cmFJbmZvLkNvbXBsZXRlO1xyXG5cdFx0XHRcdGRhdGVDb21wbGV0ZWQgPSB0aGlzLl9FeHRyYUluZm8uRGF0ZUNvbXBsZXRlZDtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcIkZ1bGxDYWxlbmRhckV2ZW50XCI6XHJcblx0XHRcdFx0aWQgPSBkYXRhLmlkO1xyXG5cdFx0XHRcdHN0YXJ0ID0gZGF0YS5zdGFydDtcclxuXHRcdFx0XHRlbmQgPSBkYXRhLmVuZDtcclxuXHRcdFx0XHRia0NvbG9yID0gZGF0YS5iYWNrZ3JvdW5kQ29sb3I7XHJcblx0XHRcdFx0YWxsRGF5ID0gZGF0YS5hbGxEYXkgPyBkYXRhLmFsbERheSA6ICEkLmZ1bGxDYWxlbmRhci5tb21lbnQoZGF0YS5zdGFydCkuaGFzVGltZSgpO1xyXG5cdFx0XHRcdGNvbXBsZXRlID0gZGF0YS5jb21wbGV0ZSB8fCAwO1xyXG5cdFx0XHRcdGRhdGVDb21wbGV0ZWQgPSBkYXRhLmRhdGVDb21wbGV0ZWQgfHwgJyc7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGlkZW50aWZ5IGRhdGEgdHlwZS4nKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHRcdC8vIOWfuuacrOS/oeaBr1xyXG5cdFx0dGhpcy5pZCA9IGlkO1xyXG5cdFx0dGhpcy50aXRsZSA9IGRhdGEudGl0bGU7XHJcblx0XHQvLyDml7bpl7Tkv6Hmga9cclxuXHRcdHRoaXMuYWxsRGF5ID0gYWxsRGF5O1xyXG5cdFx0Ly8g5rOo5oSP77yBc3RhcnQvZW5kIOWPr+iDveaYr21vbWVudOWvueixoeaIluiAhXN0cu+8jOaJgOS7peS4gOW+i+WFiOi9rOaNouaIkG1vbWVudOWGjeagvOW8j+WMlui+k+WHulxyXG5cdFx0dGhpcy5zdGFydCA9IGFsbERheSA/IG1vbWVudChzdGFydCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKSA6IG1vbWVudChzdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHR0aGlzLmVuZCA9IGFsbERheSA/IG1vbWVudChlbmQpLmZvcm1hdChcIllZWVktTU0tRERcIikgOiBtb21lbnQoZW5kKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdHRoaXMuY3JlYXRlZCA9IGRhdGEuY3JlYXRlZCA/IGRhdGEuY3JlYXRlZCA6IG1vbWVudChzdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHR0aGlzLnVwZGF0ZWQgPSBkYXRhLnVwZGF0ZWQgPyBkYXRhLnVwZGF0ZWQgOiBtb21lbnQoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdC8vIOiuvue9ruS/oeaBr1xyXG5cdFx0dGhpcy50ZXh0Q29sb3IgPSAnYmxhY2snO1xyXG5cdFx0dGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSBia0NvbG9yO1xyXG5cdFx0dGhpcy5jb21wbGV0ZSA9IGNvbXBsZXRlO1xyXG5cdFx0dGhpcy5kYXRlQ29tcGxldGVkID0gZGF0ZUNvbXBsZXRlZDtcclxuXHR9XHJcblxyXG5cdF9jaGVja0RhdGFUeXBlKGRhdGEpIHtcclxuXHRcdGNvbnN0IG9iakNsYXNzID0gZGF0YS5jb25zdHJ1Y3RvcjtcclxuICAgICAgICBjb25zdCBHVUlEX1JlZ0V4ciA9IC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn0kL2k7XHJcbiAgICAgICAgbGV0IHR5cGU7XHJcbiAgICAgICAgc3dpdGNoIChvYmpDbGFzcykge1xyXG4gICAgICAgICAgICBjYXNlIFN0cmluZzpcclxuICAgICAgICAgICAgICAgIGlmICggR1VJRF9SZWdFeHIudGVzdChkYXRhKSApIHR5cGUgPSBcIkdVSURcIjtcclxuICAgICAgICAgICAgICAgIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGRhdGEsIGNhbm5vdCBjcmVhdGUgQ2FsZW5kYXJFdmVudCBvYmplY3QuJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBPYmplY3Q6XHJcblx0XHRcdFx0aWYgKCBkYXRhLkNBTEVOREFSX0lORk8gJiYgZGF0YS50aXRsZSApIHsgXHJcblx0XHRcdFx0XHR0eXBlID0gJ1dpekV2ZW50JztcclxuXHRcdFx0XHR9IGVsc2UgaWYgKCBkYXRhLnN0YXJ0ICYmIGRhdGEudGl0bGUgKSB7XHJcblx0XHRcdFx0XHR0eXBlID0gJ0Z1bGxDYWxlbmRhckV2ZW50JztcclxuXHRcdFx0XHR9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHR5cGU7XHJcblx0fTtcclxuXHJcblx0X3BhcnNlSW5mbyhJbmZvU3RyaW5nKSB7XHJcblx0XHRjb25zdCBJbmZvT2JqZWN0ID0ge307XHJcblx0XHQvLyDmi4bop6NDQUxFTkRBUl9JTkZPXHJcblx0XHRjb25zdCBJbmZvQXJyYXkgPSBJbmZvU3RyaW5nLnNwbGl0KCcvJyk7XHJcblx0XHRJbmZvQXJyYXkuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCwgYXJyKXtcclxuXHRcdFx0Y29uc3QgcGFpciA9IGl0ZW0uc3BsaXQoJz0nKTtcclxuXHRcdFx0SW5mb09iamVjdFtwYWlyWzBdXSA9IHBhaXJbMV07XHJcblx0XHR9KTtcclxuXHRcdC8vIOWkhOeQhuminOiJsuWAvFxyXG5cdFx0aWYgKCBJbmZvT2JqZWN0LmIgKSBJbmZvT2JqZWN0LmIgPSAnIycgKyBJbmZvT2JqZWN0LmI7XHJcblxyXG5cdFx0cmV0dXJuIEluZm9PYmplY3Q7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDlsIYgSW5mbyDlr7nosaHluo/liJfljJYuXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW0luZm9PYmplY3Q9XSDmj5DkvpsgSW5mbyDlr7nosaHvvIzpu5jorqTkuLpgdGhpcy5fSW5mb2AuXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IOi/lOWbnueUqOS6jkluZm/lr7nosaHlrZfnrKbkuLIuXHJcbiAgICAgKi9cclxuXHRfc3RyaW5naWZ5SW5mbyggSW5mb09iamVjdCA9IHRoaXMuX0luZm8gKSB7XHJcblx0XHRpZiAoICFJbmZvT2JqZWN0ICkgcmV0dXJuICcnO1xyXG5cdFx0Y29uc3QgSW5mb0FycmF5ID0gW107XHJcblx0XHRjb25zdCBJbmZvT2JqZWN0S2V5c0FycmF5ID0gT2JqZWN0LmtleXMoSW5mb09iamVjdCk7XHJcblx0XHRJbmZvT2JqZWN0S2V5c0FycmF5LmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycil7XHJcblx0XHRcdGNvbnN0IHNpbmdsZUluZm8gPSBgJHtpdGVtfT0ke0luZm9PYmplY3RbaXRlbV19YDtcclxuXHRcdFx0SW5mb0FycmF5LnB1c2goc2luZ2xlSW5mbyk7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiBJbmZvQXJyYXkuam9pbignLycpLnJlcGxhY2UoJyMnLCAnJyk7XHJcblx0fTtcclxuXHJcblx0X3VwZGF0ZSgpIHtcclxuXHRcdHRoaXMuX3VwZGF0ZUluZm8oKTtcclxuXHRcdHRoaXMuX3VwZGF0ZUV4dHJhSW5mbygpO1xyXG5cdH07XHJcblxyXG5cdF91cGRhdGVJbmZvKCkge1xyXG5cdFx0Y29uc3QgdGhhdCA9IHRoaXM7XHJcblx0XHRjb25zdCBJbmZvT2JqZWN0ID0ge1xyXG5cdFx0XHQnYic6IG51bGwsIC8v6IOM5pmv6ImyaGV45YC8XHJcblx0XHRcdCdyJzogJy0xJywgLy/mj5DphpLmlrnlvI9cclxuXHRcdFx0J2MnOiAnMCcsIC8v57uT5p2f5o+Q6YaS5L+h5oGvXHJcblx0XHRcdCdjaSc6IDAgLy/og4zmma/oibJJRO+8jOm7mOiupCAwIOihqOekuuiDjOaZr+S4uueUqOaIt+iHquWumuS5iVxyXG5cdFx0fTtcclxuXHRcdC8vIOabtOaWsOiDjOaZr+iJsidiJ1xyXG5cdFx0SW5mb09iamVjdFsnYiddID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3IucmVwbGFjZSgnIycsICcnKTtcclxuXHRcdC8vIOabtOaWsOminOiJsuaMh+aVsCdjaSdcclxuXHRcdENvbmZpZy5jb2xvckl0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycil7XHJcblx0XHRcdGlmICggaXRlbS5jb2xvclZhbHVlID09ICB0aGF0LmJhY2tncm91bmRDb2xvciApIHtcclxuXHRcdFx0XHQvLyDlvZPml6XnqIvog4zmma/oibLkuI7oibLooajljLnphY3ml7bliJnnlKggY29sb3IgaWRleCDmnaXlgqjlrZjvvIjlhbzlrrnljp/niYjml6Xljobmj5Lku7bvvIlcclxuXHRcdFx0XHRJbmZvT2JqZWN0WydjaSddID0gaW5kZXg7XHJcblx0XHRcdH07XHJcblx0XHR9KTtcclxuXHRcdC8vIOW6lOeUqOabtOaWsFxyXG5cdFx0dGhpcy5fSW5mbyA9IEluZm9PYmplY3Q7XHJcblx0fTtcclxuXHJcblx0X2dldERlZmF1bHRFeHRyYUluZm8oKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHQnQ29tcGxldGUnOiAwLCAvL1xyXG5cdFx0XHQnRGF0ZUNvbXBsZXRlZCc6ICcnLCAvLyBJU08g5qCH5YeG5pel5pyf5a2X56ym5LiyIFlZWVktTU0tREQgMDA6MDA6MDBcclxuXHRcdFx0J1ByaW9yJzogMFxyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHRfdXBkYXRlRXh0cmFJbmZvKCkge1xyXG5cdFx0Y29uc3QgRXh0cmFJbmZvT2JqZWN0ID0ge1xyXG5cdFx0XHQnQ29tcGxldGUnOiAwLFxyXG5cdFx0XHQnRGF0ZUNvbXBsZXRlZCc6ICcnLFxyXG5cdFx0XHQnUHJpb3InOiAwXHJcblx0XHR9O1xyXG5cdFx0RXh0cmFJbmZvT2JqZWN0WydDb21wbGV0ZSddID0gdGhpcy5jb21wbGV0ZTtcclxuXHRcdEV4dHJhSW5mb09iamVjdFsnRGF0ZUNvbXBsZXRlZCddID0gdGhpcy5kYXRlQ29tcGxldGVkO1xyXG5cdFx0dGhpcy5fRXh0cmFJbmZvID0gRXh0cmFJbmZvT2JqZWN0O1xyXG5cdH07XHJcblxyXG5cdF9nZXRFdmVudEh0bWwodGl0bGUgPSB0aGlzLnRpdGxlLCBjb250ZW50ID0gJycpe1xyXG5cdFx0Y29uc3QgaHRtbFRleHQgPSBcclxuXHRcdFx0YDxodG1sPlxyXG5cdFx0XHRcdDxoZWFkPlxyXG5cdFx0XHRcdFx0PG1ldGEgaHR0cC1lcXVpdj1cIkNvbnRlbnQtVHlwZVwiIGNvbnRlbnQ9XCJ0ZXh0L2h0bWw7IGNoYXJzZXQ9dW5pY29kZVwiPlxyXG5cdFx0XHRcdFx0PHRpdGxlPiR7dGl0bGV9PC90aXRsZT4gXHJcblx0XHRcdFx0PC9oZWFkPlxyXG5cdFx0XHRcdDxib2R5PlxyXG5cdFx0XHRcdFx0PCEtLVdpekh0bWxDb250ZW50QmVnaW4tLT5cclxuXHRcdFx0XHRcdDxkaXY+JHtjb250ZW50fTwvZGl2PlxyXG5cdFx0XHRcdFx0PCEtLVdpekh0bWxDb250ZW50RW5kLS0+XHJcblx0XHRcdFx0PC9ib2R5PlxyXG5cdFx0XHQ8L2h0bWw+YDtcclxuXHRcclxuXHRcdCAgcmV0dXJuIGh0bWxUZXh0XHJcblx0fTtcclxuXHJcblx0LyoqXHJcbiAgICAgKiDmoLnmja7ml6XnqIvnmoTph43lpI3op4TliJnnlJ/miJAgRnVsbENhbGVuZGFyIGV2ZW50U291cmNlLlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBldmVudFNvdXJjZS5cclxuICAgICAqL1xyXG5cdGdlbmVyYXRlUmVwZWF0RXZlbnRzKHN0YXJ0LCBlbmQpIHtcclxuXHRcdGlmICggIXRoaXMucnB0UnVsZSApIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgQ2FsZW5kYXJFdmVudCByZXBlYXQgcnVsZS4nKTtcclxuXHRcdC8vVE9ETzog5qC55o2ucnB0UnVsZeeUn+aIkOmHjeWkjeaXpeacn1xyXG5cclxuXHRcdC8vVE9ETzog5qC55o2uIHN0YXJ0LCBlbmQg6ZmQ5Yi26YeN5aSN5pel5pyf5LiK5LiL6ZmQLCDlubbkuJTnpoHmraLlnKhDYWxlbmRhckV2ZW50LnN0YXJ05b2T5aSp5YaN5Yib5bu66YeN5aSN5LqL5Lu2XHJcblxyXG5cdFx0Ly9UT0RPOiDmoLnmja7ph43lpI3ml6XmnJ/lvqrnjq/nlJ/miJDph43lpI3kuovku7bvvIzlubbnu4Too4XmiJAgc291cmNlIG9iamVjdCDmoLzlvI9cclxuXHR9O1xyXG5cclxuXHR0b0Z1bGxDYWxlbmRhckV2ZW50KCkge1xyXG5cdFx0Ly8g5rOo5oSP5pa55rOV6L+U5Zue55qE5Y+q5pivRnVsbENhbGVuZGFyRXZlbnTnmoTmlbDmja7nsbvlnovvvIzlubbkuI3mmK9ldmVudOWvueixoVxyXG5cdFx0Y29uc3QgdGhhdCA9IHRoaXM7XHJcblx0XHRjb25zdCBuZXdFdmVudCA9IHt9O1xyXG5cdFx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xyXG5cdFx0a2V5cy5zcGxpY2UoIGtleXMuZmluZEluZGV4KCAoaSkgPT4gaSA9PSAnX0luZm8nICksIDEpO1xyXG5cdFx0a2V5cy5zcGxpY2UoIGtleXMuZmluZEluZGV4KCAoaSkgPT4gaSA9PSAnX0V4dHJhSW5mbycgKSwgMSk7XHJcblx0XHRrZXlzLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgsIGFycil7XHJcblx0XHRcdG5ld0V2ZW50W2l0ZW1dID0gdGhhdFtpdGVtXTtcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIG5ld0V2ZW50O1xyXG5cdH07XHJcblxyXG5cdHRvV2l6RXZlbnREYXRhKCkge1xyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblx0XHRjb25zdCBuZXdFdmVudCA9IHt9O1xyXG5cdFx0bmV3RXZlbnQudGl0bGUgPSB0aGlzLnRpdGxlO1xyXG5cdFx0bmV3RXZlbnQuZ3VpZCA9IHRoaXMuaWQ7XHJcblx0XHRuZXdFdmVudC5DQUxFTkRBUl9TVEFSVCA9IHRoaXMuYWxsRGF5ID8gbW9tZW50KHRoaXMuc3RhcnQpLmZvcm1hdCgnWVlZWS1NTS1ERCAwMDowMDowMCcpIDogdGhpcy5zdGFydDtcclxuXHRcdG5ld0V2ZW50LkNBTEVOREFSX0VORCA9IHRoaXMuYWxsRGF5ID8gbW9tZW50KHRoaXMuZW5kKS5mb3JtYXQoJ1lZWVktTU0tREQgMjM6NTk6NTknKSA6IHRoaXMuZW5kO1xyXG5cdFx0bmV3RXZlbnQuQ0FMRU5EQVJfSU5GTyA9IHRoaXMuX3N0cmluZ2lmeUluZm8odGhpcy5fSW5mbyk7XHJcblx0XHRuZXdFdmVudC5DQUxFTkRBUl9FWFRSQUlORk8gPSB0aGlzLl9zdHJpbmdpZnlJbmZvKHRoaXMuX0V4dHJhSW5mbyk7XHJcblx0XHRuZXdFdmVudC5jcmVhdGVkID0gdGhpcy5jcmVhdGVkO1xyXG5cdFx0bmV3RXZlbnQudXBkYXRlZCA9IHRoaXMudXBkYXRlZDtcclxuXHRcdHJldHVybiBuZXdFdmVudDtcclxuXHR9O1xyXG5cclxuXHRhZGRUb0Z1bGxDYWxlbmRhcigpIHtcclxuXHRcdC8vVE9ETzog5bCG6Ieq6Lqr5re75Yqg5YiwRnVsbENhbGVuZGFyXHJcblx0XHRpZiAoIWdfY2FsKSB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgZmluZCBGdWxsQ2FsZW5kYXIgV2lkZ2V0LicpXHJcblx0XHRnX2NhbC5mdWxsQ2FsZW5kYXIoICdhZGRFdmVudFNvdXJjZScsIHtcclxuXHRcdFx0ZXZlbnRzOiBbXHJcblx0XHRcdFx0dGhpcy50b0Z1bGxDYWxlbmRhckV2ZW50KClcclxuXHRcdFx0XVxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0X3NhdmVBbGxQcm9wKCkge1xyXG5cdFx0Ly9UT0RPOiDkv53lrZjlhajpg6jmlbDmja7ljIXmi6xUaXRsZVxyXG5cdFx0Ly8g5pu05paw5LqL5Lu25paH5qGj5pWw5o2uXHJcblx0XHRjb25zdCBkb2MgPSBnX2RiLkRvY3VtZW50RnJvbUdVSUQodGhpcy5pZCk7XHJcblx0XHQvLyDkv53lrZjmoIfpophcclxuXHRcdGRvYy5UaXRsZSA9IHRoaXMudGl0bGU7XHJcblx0XHQvLyDkv53lrZjml7bpl7TmlbDmja5cclxuXHRcdGlmICggdGhpcy5hbGxEYXkgKSB7XHJcblx0XHRcdGxldCBzdGFydFN0ciA9IG1vbWVudCh0aGlzLnN0YXJ0KS5zZXQoeydoJzogMCwgJ20nOiAwLCAncyc6IDB9KS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKTtcclxuXHRcdFx0bGV0IGVuZFN0ciA9IG1vbWVudCh0aGlzLmVuZCkuc2V0KHsnaCc6IDIzLCAnbSc6IDU5LCAncyc6IDU5fSkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX1NUQVJUXCIsIHN0YXJ0U3RyKTtcclxuXHRcdFx0dGhpcy5fc2V0UGFyYW1WYWx1ZShkb2MsIFwiQ0FMRU5EQVJfRU5EXCIsIGVuZFN0cik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRsZXQgc3RhcnRTdHIgPSBtb21lbnQodGhpcy5zdGFydCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJyk7XHJcblx0XHRcdGxldCBlbmRTdHIgPSBtb21lbnQodGhpcy5lbmQpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpO1xyXG5cdFx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9TVEFSVFwiLCBzdGFydFN0cik7XHJcblx0XHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0VORFwiLCBlbmRTdHIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIOS/neWtmCBDQUxFTkRBUl9JTkZPXHJcblx0XHR0aGlzLl91cGRhdGUoKTtcclxuXHRcdHRoaXMuX3NldFBhcmFtVmFsdWUoZG9jLCBcIkNBTEVOREFSX0lORk9cIiwgdGhpcy5fc3RyaW5naWZ5SW5mbyh0aGlzLl9JbmZvKSk7XHJcblx0XHR0aGlzLl9zZXRQYXJhbVZhbHVlKGRvYywgXCJDQUxFTkRBUl9FWFRSQUlORk9cIiwgdGhpcy5fc3RyaW5naWZ5SW5mbyh0aGlzLl9FeHRyYUluZm8pKTtcclxuXHR9O1xyXG5cclxuXHQvLyDorr7nva7mlofmoaPlsZ7mgKflgLxcclxuXHRfc2V0UGFyYW1WYWx1ZShkb2MsIGtleSwgdmFsdWUpIHtcclxuXHRcdGlmICghZG9jKSByZXR1cm4gZmFsc2U7XHJcblx0XHRkb2MuU2V0UGFyYW1WYWx1ZShrZXksIHZhbHVlKTtcclxuXHR9O1xyXG5cclxuXHRfY3JlYXRlV2l6RXZlbnREb2MoKSB7XHJcblx0XHQvL1RPRE86IOS/neWtmOWFqOmDqOaVsOaNruWMheaLrFRpdGxlXHJcblx0XHQvLyDliJvlu7pXaXpEb2NcclxuXHRcdGNvbnN0IGxvY2F0aW9uID0gYE15IEV2ZW50cy8keyBtb21lbnQodGhpcy5zdGFydCkuZm9ybWF0KCdZWVlZLU1NJykgfS9gO1xyXG5cdFx0Y29uc3Qgb2JqRm9sZGVyID0gZ19kYi5HZXRGb2xkZXJCeUxvY2F0aW9uKGxvY2F0aW9uLCB0cnVlKTtcclxuXHRcdGNvbnN0IHRlbXBIdG1sID0gZ19jbW4uR2V0QVRlbXBGaWxlTmFtZSgnLmh0bWwnKTtcclxuXHRcdGNvbnN0IGh0bWxUZXh0ID0gdGhpcy5fZ2V0RXZlbnRIdG1sKHRoaXMudGl0bGUsICcnKTtcclxuXHRcdGdfY21uLlNhdmVUZXh0VG9GaWxlKHRlbXBIdG1sLCBodG1sVGV4dCwgJ3VuaWNvZGUnKTtcclxuXHRcdGNvbnN0IGRvYyA9IG9iakZvbGRlci5DcmVhdGVEb2N1bWVudDIodGhpcy50aXRsZSwgXCJcIik7XHJcblx0XHRkb2MuQ2hhbmdlVGl0bGVBbmRGaWxlTmFtZSh0aGlzLnRpdGxlKTtcclxuXHRcdGRvYy5VcGRhdGVEb2N1bWVudDYodGVtcEh0bWwsIHRlbXBIdG1sLCAweDIyKTtcclxuXHRcdC8vIOiuvue9ruagh+etvlxyXG5cdFx0Ly9pZiAoIHRhZ3MgKSBkb2MuU2V0VGFnc1RleHQyKHRhZ3MsIFwiQ2FsZW5kYXJcIik7XHJcblx0XHQvLyDlsIbkv6Hmga/nvJbnoIHliLBXaXpEb2PlsZ7mgKfkuK3ljrtcclxuXHRcdGNvbnN0IG5ld0V2ZW50ID0gdGhpcy50b1dpekV2ZW50RGF0YSgpO1xyXG5cdFx0ZG9jLkFkZFRvQ2FsZW5kYXIobmV3RXZlbnQuQ0FMRU5EQVJfU1RBUlQsIG5ld0V2ZW50LkNBTEVOREFSX0VORCwgbmV3RXZlbnQuQ0FMRU5EQVJfSU5GTyk7XHJcblx0XHQvLyBjaGFuZ2UgZGF0YWJhc2VcclxuXHRcdGRvYy50eXBlID0gXCJldmVudFwiO1xyXG5cdFx0Ly9cclxuXHRcdHRoaXMuaWQgPSBkb2MuR1VJRDtcclxuXHR9XHJcblxyXG5cdHNhdmVUb1dpekV2ZW50RG9jKCBwcm9wID0gJ2FsbCcgKSB7XHJcblx0XHRpZiAoIWdfZGIgfHwgIWdfY21uKSB0aHJvdyBuZXcgRXJyb3IoJ0lXaXpEYXRhYmFzZSBvciBJV2l6Q29tbW9uVUkgaXMgbm90IHZhbGlkLicpO1xyXG5cdFx0Ly/mo4Dmn6XmlofmoaPmmK/lkKblrZjlnKhcclxuXHRcdGNvbnN0IGd1aWRSZWdleCA9IC9eWzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn0kL2k7XHJcblx0XHRjb25zdCBpc1dpekRvY0V4aXN0ID0gZ3VpZFJlZ2V4LnRlc3QodGhpcy5pZCk7XHJcblx0XHQvLyDliJvlu7rmiJbogIXmm7TmlrDmlofmoaNcclxuXHRcdGlmICggaXNXaXpEb2NFeGlzdCApIHtcclxuXHRcdFx0Ly8g5qC55o2u5oyH5Luk5pu05paw5YaF5a65XHJcblx0XHRcdHRoaXMuX3NhdmVBbGxQcm9wKCk7XHJcblx0XHRcdC8vIOabtOaWsEZ1bGxDYWxlbmRhclxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8g5Yib5bu65paw55qE5LqL5Lu25paH5qGjXHJcblx0XHRcdHRoaXMuX2NyZWF0ZVdpekV2ZW50RG9jKCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHR9O1xyXG5cclxuXHRkZWxldGVFdmVudERhdGEoIGlzRGVsZXRlRG9jID0gZmFsc2UgKXtcclxuXHRcdGlmICghZ19jYWwpIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBmaW5kIEZ1bGxDYWxlbmRhciBXaWRnZXQuJylcclxuXHRcdGxldCBkb2MgPSBnX2RiLkRvY3VtZW50RnJvbUdVSUQodGhpcy5pZCk7XHJcblx0XHRpZiAoIWRvYykgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGZpbmQgRXZlbnQgcmVsYXRlZCBXaXpEb2N1bWVudC4nKVxyXG5cdFx0Ly8g56e76ZmkRnVsbENhbGVuZGFy5LqL5Lu2XHJcblx0XHRnX2NhbC5mdWxsQ2FsZW5kYXIoJ3JlbW92ZUV2ZW50cycsIHRoaXMuaWQpO1xyXG5cdFx0Ly8g56e76Zmk5pel5Y6G5pWw5o2uXHJcblx0XHRkb2MuUmVtb3ZlRnJvbUNhbGVuZGFyKCk7XHJcblx0XHQvLyDliKDpmaTmlofmoaNcclxuXHRcdGlmICggaXNEZWxldGVEb2MgKSBkb2MuRGVsZXRlKCk7XHJcblx0fVxyXG5cclxuXHRyZWZldGNoRGF0YSgpIHtcclxuXHRcdC8vVE9ETzog6YeN5pWw5o2u5bqT6YeN5paw6I635Y+W5pWw5o2u5pu05paw5a6e5L6LXHJcblx0fTtcclxuXHJcblx0cmVuZGVyRXZlbnQoKSB7XHJcblx0XHQvLyDnnIvor6Xkuovku7bmmK/lkKblt7LlrZjlnKjvvIzlpoLmnpzlrZjlnKjliJl1cGRhdGVFdmVudFxyXG5cdFx0aWYgKCFnX2NhbCkgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGZpbmQgRnVsbENhbGVuZGFyIFdpZGdldC4nKVxyXG5cdH07XHJcblxyXG5cdHJlZnJlc2hFdmVudChldmVudCkge1xyXG5cdFx0Ly9UT0RPOiDlupTor6Xoh6rliqjpgY3ljoblubbkv67mlLnlsZ7mgKdcclxuXHRcdGlmICggZXZlbnQgKSB7XHJcblx0XHRcdC8vIOmHjeaWsOa4suafk0Z1bGxDYWxlbmRhcuS6i+S7tlxyXG5cdFx0XHRldmVudC50aXRsZSA9IHRoaXMudGl0bGU7XHJcblx0XHRcdGV2ZW50LmJhY2tncm91bmRDb2xvciA9IHRoaXMuYmFja2dyb3VuZENvbG9yO1xyXG5cdFx0XHRnX2NhbC5mdWxsQ2FsZW5kYXIoJ3VwZGF0ZUV2ZW50JywgZXZlbnQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly/nlKguZnVsbENhbGVuZGFyKCDigJhjbGllbnRFdmVudHPigJkgWywgaWRPckZpbHRlciBdICkgLT4gQXJyYXkg6I635Y+W5rqQ5pWw5o2u5LuO6ICM5pu05pawXHJcblx0XHRcdC8vVE9ETzog6YGN5Y6G5bm25a+75om+R1VJROWMuemFjeeahOS6i+S7tlxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIHJlZnJlc2hFdmVudFNvdXJjZXMoKSB7XHJcblx0XHQvL1RPRE86IOWwhkZ1bGxDYWxlbmRhcuaJgOaciVNvdXJjZXPliKDpmaTvvIzph43mlrDmt7vliqBcclxuXHRcdC8vIOayoeeCueWHu+S4gOS4quinhuWbvuabtOaWsOaXtuWwseaJp+ihjFxyXG5cdH1cclxuXHJcbn0iXSwic291cmNlUm9vdCI6IiJ9