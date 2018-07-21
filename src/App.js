import React from 'react';
import Calendar from './components/Calendar/Calendar';
import WizEventDataLoader from './models/WizEventDataLoader';
import CalendarEvent from './models/CalendarEvent';
import EventPopover from './components/EventPopover/EventPopover';
import EventCreateModal from './components/Modal/EventCreateModal';
import EventEditModal from './components/Modal/EventEditModal';
import { rgb2hsl } from './utils/utils';
import { WizConfirm, WizDatabase as objDatabase, WizExplorerWindow as objWindow } from './utils/WizInterface';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.dataLoader = new WizEventDataLoader();
        //
        this.state = {
            isShowingEvent: false,
            isEditingEvent: false,
            isCreatingEvent: false,
            clickedArgs: null,
            editingEvent: null,
            selectedRange: null
        }
        //
        this.handleCalendarRender = this.handleCalendarRender.bind(this);
        this.handleEventClick = this.handleEventClick.bind(this);
        this.handleViewRender = this.handleViewRender.bind(this);
        this.handleEventDrop = this.handleEventDrop.bind(this);
        this.handleEventResize = this.handleEventResize.bind(this);
        this.handleEventRender = this.handleEventRender.bind(this);
        //
        this.handlePopoverHide = this.handlePopoverHide.bind(this);
        this.handleDateSelect = this.handleDateSelect.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        //
        this.handleEventCreate = this.handleEventCreate.bind(this);
        this.handleEventSave = this.handleEventSave.bind(this);
        this.handleEventEdit = this.handleEventEdit.bind(this);
        this.handleEventComplete = this.handleEventComplete.bind(this);
        this.handleEventDeleteData = this.handleEventDeleteData.bind(this);
        this.handleEventDeleteDoc = this.handleEventDeleteDoc.bind(this);
        this.handleEventOpenDoc = this.handleEventOpenDoc.bind(this);
        this.handleEventEditOriginData = this.handleEventEditOriginData.bind(this);
        
    }

    // 处理FullCalendar事件
    // ------------------------------------------------------------

    handleCalendarRender(el) {
        // 获得DOM元素用于操作FullCalendar
        this.calendar = el;
    }

    handleEventClick( event, jsEvent, view ) {
        const args = { event, jsEvent, view }
        this.setState({
            isShowingEvent: true,
            clickedArgs: args
        })
    }

    handleViewRender( view, element ) {
        // 刷新视图，重新获取日历事件
        const $calendar = $(this.calendar);
        const eventSources = this.dataLoader.getEventSources( view, element );
        $calendar.fullCalendar('removeEvents');
        for (let i=0 ; i < eventSources.length; i++) {
            $calendar.fullCalendar('addEventSource', eventSources[i]);
        }
    }

    handleEventDrop( event, delta, revertFunc, jsEvent, ui, view ) {
        if (event.id){
            this.dataLoader.updateEventDataOnDrop(event, delta, revertFunc, jsEvent, ui, view)
        } else {
            revertFunc();
        }        
    }

    handleEventResize( event, delta, revertFunc, jsEvent, ui, view ) {
        if (event.id){
            this.dataLoader.updateEventDataOnResize(event, delta, revertFunc, jsEvent, ui, view);
        } else {
            revertFunc();
        }
    }

    handleEventRender( eventObj, $el ) {
        // 设置文本颜色
        const rgbString = $el.css('background-color');
        const rgbArray = /^rgb\((\d*), (\d*), (\d*)\)$/.exec(rgbString);
        if (rgbArray) {
            const hsl = rgb2hsl(rgbArray[1], rgbArray[2], rgbArray[3]);
            const lightness = hsl[2] - Math.cos( (hsl[0]+70) / 180*Math.PI ) * 0.15;
            const textColor = lightness > 0.5 ? '#222' : 'white';
            $el.css('color', textColor);
        }
        // 元素已经渲染，可修改元素
        const isComplete = parseInt(eventObj.complete) == 5;
        if ( isComplete ) {
            // 样式
            $el.addClass('tc-complete');
        }
    }

    // 处理用户事件
    // ------------------------------------------------------------

    handlePopoverHide() {
        //每次出现都渲染一个新的Popover
        this.setState({
            isShowingEvent: false
        })
    }

    handleDateSelect( start, end, jsEvent, view ) {
        const args = {start, end, jsEvent, view};
        this.setState({
            isCreatingEvent: true,
            selectedRange: args
        })
    }

    handleModalClose() {
        const $calendar = $(this.calendar);
        $calendar.fullCalendar('unselect')
        //
        this.setState({
            isEditingEvent: false,
            isCreatingEvent: false
        });
    }

    // 处理按钮功能
    // ------------------------------------------------------------

    handleEventCreate(eventData) {
        let { start, end, allDay, title, backgroundColor, rptRule } = eventData;
        const moment = this.fullCalendar.moment.bind(this.fullCalendar);
        // 处理日程数据
        start = moment(start), end = moment(end);
        allDay = !( start.hasTime() && end.hasTime() );
        // 新建日程
        const newEvent = new CalendarEvent({
            title: title || '无标题', 
            backgroundColor: backgroundColor || '#32CD32',
            start, end, allDay, rptRule
        });
        newEvent.saveToWizEventDoc();
        // 添加到日历
		$(this.calendar).fullCalendar( 'addEventSource', {
			events: [
				newEvent.toFullCalendarEvent()
			]
		});
    }

    handleEventSave(event, newEventData) {
        for (const prop in newEventData) {
            event[prop] = newEventData[prop]
        }
        const newEvent = new CalendarEvent(event);
        newEvent.saveToWizEventDoc();
        //
        $(this.calendar).fullCalendar( 'updateEvent', event );
    }

    handleEventComplete(event) {
        // 修改数据
        const isComplete = parseInt(event.complete) == 5;
        if ( isComplete ) {
            event.complete = '0';
        } else {
            event.complete = '5';
        }
        // 保存数据
        const newEvent = new CalendarEvent(event);
        newEvent.saveToWizEventDoc();
        //
        $(this.calendar).fullCalendar( 'updateEvent', event );
    }

    handleEventEdit(event) {
        this.setState({
            isEditingEvent: true,
            editingEvent: event
        })        
    }

    handleEventDeleteData(event) {
        if ( WizConfirm("确定要删除该日程？", '番茄助理') ) {
            // 删除日程
            let newEvent = new CalendarEvent(event);
            newEvent.deleteEventData(false);
        }
		$(this.calendar).fullCalendar('removeEvents', event.id);
    }

    handleEventDeleteDoc(event) {
        if ( WizConfirm("确定要删除该日程源文档？\n「确定」将会导致相关笔记被删除！", '番茄助理') ) {
            let newEvent = new CalendarEvent(event);
            newEvent.deleteEventData(true);
        }
        $(this.calendar).fullCalendar('removeEvents', event.id);
    }

    handleEventOpenDoc(event) {
        const doc = objDatabase.DocumentFromGUID(event.id);
        objWindow.ViewDocument(doc, true);
    }

    handleEventEditOriginData(event) {
        const doc = objDatabase.DocumentFromGUID(event.id);
        objCommon.EditCalendarEvent(doc);
    }

    // 生命周期
    // ------------------------------------------------------------

    componentDidMount() {
        this.fullCalendar = $(this.calendar).fullCalendar('getCalendar');
    }

    render() {

        return (
            <div id='wiz-tomato-calendar' >
                <Calendar 
                    onEventClick={this.handleEventClick} 
                    onViewRender={this.handleViewRender}
                    onEventDrop={this.handleEventDrop}
                    onEventResize={this.handleEventResize}
                    onEventRender={this.handleEventRender}
                    onSelect={this.handleDateSelect}
                    onCalendarRender={this.handleCalendarRender}
                />
                {
                    !!this.state.selectedRange &&
                        <EventCreateModal 
                            key={'create' + this.state.selectedRange.jsEvent.pageX}
                            show={this.state.isCreatingEvent}
                            onModalClose={this.handleModalClose}
                            calendar={this.calendar}
                            isCreatingEvent={this.state.isCreatingEvent}
                            selectedRange={this.state.selectedRange}
                            onEventCreate={this.handleEventCreate}
                        />
                }
                {
                    !!this.state.editingEvent && 
                        <EventEditModal 
                            key={'edit' + this.state.editingEvent.id}
                            show={this.state.isEditingEvent}
                            onModalClose={this.handleModalClose}
                            editingEvent={this.state.editingEvent}
                            //
                            onEventSave={this.handleEventSave}
                            onEventComplete={this.handleEventComplete}
                            onEventDeleteData={this.handleEventDeleteData}
                            onEventDeleteDoc={this.handleEventDeleteDoc}
                            onEventOpenDoc={this.handleEventOpenDoc}      
                            onEventEditOriginData={this.handleEventEditOriginData}
                        />
                }
                {
                    !!this.state.isShowingEvent && 
                        <EventPopover 
                            key={'popover' + this.state.clickedArgs.event.id}
                            event={this.state.clickedArgs.event}
                            reference={this.state.clickedArgs.jsEvent.target}
                            onPopoverHide={this.handlePopoverHide}
                            //
                            onEventSave={this.handleEventSave}
                            onEventComplete={this.handleEventComplete}
                            onEventEdit={this.handleEventEdit}
                            onEventDeleteData={this.handleEventDeleteData}
                            onEventDeleteDoc={this.handleEventDeleteDoc}
                            onEventOpenDoc={this.handleEventOpenDoc}
                        /> 
                }
            </div>
        );
    }
}

