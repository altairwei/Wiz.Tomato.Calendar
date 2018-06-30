import moment from 'moment';
import 'fullcalendar';
import 'fullcalendar/dist/fullcalendar.css';
import WizEventDataLoader from './WizEventDataLoader';
import { renderEditPopper } from './Widget/EventPopover/EventPopover';
import EventCreateModal from './Modal/EventCreateModal'
import './index.css';

$(function(){
    // 定义变量
	const dataLoader = new WizEventDataLoader();
	let g_editPopper, g_createModal, g_editModal;

    const calendar = $('#calendar').fullCalendar({
		themeSystem: 'standard',
		height: 'parent',
		header: {
			left: 'prev,next,today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay,listWeek'
		},
		views: {
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
			today: '今天',
			month: '月',
			week: '周',
			day: '日',
			list: '表'
        },
		monthNames: [
            '1月', '2月', '3月', '4月', 
            '5月', '6月', '7月', '8月', 
            '9月', '10月', '11月', '12月'
        ],
		monthNamesShort: [
            '1月', '2月', '3月', '4月', 
            '5月', '6月', '7月', '8月', 
            '9月', '10月', '11月', '12月'
        ],
		dayNames: [
            '周日', '周一', '周二', '周三', '周四', '周五', '周六'
        ],
		dayNamesShort: [
            '周日', '周一', '周二', '周三', '周四', '周五', '周六'
        ],
		selectable: true,
		selectHelper: true,
		unselectCancel: '.modal *',
		allDayText: '全天',
		nowIndicator: true,
		forceEventDuration: true,
		firstDay: 1, // 第一天是周一还是周天，与datepicker必须相同
		dragOpacity: {
			"month": .5,
			"agendaWeek": 1,
			"agendaDay": 1
		},
		editable: true,

		// 刷新视图，重新获取日历事件
		viewRender: function( view, element ) {
			//TODO: 感觉这样造成性能上的损失，是否有更好的方法？
			const calendar = $('#calendar');
			const eventSources = dataLoader.getEventSources( view, element );
			calendar.fullCalendar('removeEvents');
			for (let i=0 ; i < eventSources.length; i++) {
				calendar.fullCalendar('addEventSource', eventSources[i]);
			}
			
		},

		// 选择动作触发的事件句柄，定义了一个callback
		select: function(start, end, jsEvent, view){
			// 弹出“创建日历事件”窗口
			// 判断是否渲染
			//TODO: 想办法不要用全局变量
			if ( !window.g_createModal ) new EventCreateModal({start, end, jsEvent, view});
			// 传递参数
			window.g_createModal.update({start, end, jsEvent, view});
			window.g_createModal.show();
		},

		eventDragStart: function( event, jsEvent, ui, view ) { },
		eventDragStop: function( event, jsEvent, ui, view ) { },

		// 日历事件拖动 event, delta, revertFunc, jsEvent, ui, view
		eventDrop: function(event, delta, revertFunc, jsEvent, ui, view){
			if (event.id){
				dataLoader.updateEventDataOnDrop(event, delta, revertFunc, jsEvent, ui, view)
			} else {
				revertFunc();
			}
		},

		// 日历事件日期范围重置
		eventResize: function(event, delta, revertFunc, jsEvent, ui, view){
			if (event.id){
				dataLoader.updateEventDataOnResize(event, delta, revertFunc, jsEvent, ui, view);
			} else {
				revertFunc();
			}
		},

		eventRender: function(eventObj, $el) {
			// 元素已经渲染，可修改元素
			const isComplete = parseInt(eventObj.complete) == 5;
			if ( isComplete ) {
				// 样式
				$el.addClass('tc-complete');
			}
			
		},

		// 日历事件点击后事件句柄
		eventClick: function( event, jsEvent, view ) {
			// this 指向包裹事件的<a>元素

			// 判断是否已经渲染弹窗
			if ( !g_editPopper ) {
				g_editPopper = renderEditPopper({
					'event': event,
					'jsEvent': jsEvent,
					'view': view
				}, this).EventPopover('show');
			} else {
				// 更新reference
				g_editPopper.EventPopover('option', {
					args: {
						'event': event,
						'jsEvent': jsEvent,
						'view': view
					},
					title: event.title,
					reference: this
				}).EventPopover('update').EventPopover('show');
			}

		}
		
	})
})