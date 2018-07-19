import $ from 'jquery';
import WizEventDataLoader from './WizEventDataLoader';
import CalendarEvent from './CalendarEvent';
import { WizConfirm, WizCommonUI as objCommon, WizDatabase as objDatabase, WizExplorerWindow as objWindow } from '../utils/WizInterface';

export default class FormHandles {
    constructor() {
        this.$calendar = $('#calendar')
    };

    onCreateBtnClick({ start, end, title, backgroundColor }) {
        const fullCalendar = this.$calendar.fullCalendar('getCalendar');
        const moment = fullCalendar.moment.bind(fullCalendar);
        const startMoment = moment(start);
        const endMoment = moment(end);
        const newEvent = new CalendarEvent({
            title: title || '无标题',
            start: startMoment,
            end: endMoment,
            allDay: startMoment.hasTime() && endMoment.hasTime() ? false : true,
            backgroundColor: backgroundColor ? backgroundColor : '#32CD32',
        }, this.$calendar);
        // 保存并渲染事件
        newEvent.saveToWizEventDoc();
        newEvent.refetchData();
        newEvent.addToFullCalendar();
    };

    onSaveBtnClick(event, newEventData) {
        for (const prop in newEventData) {
            event[prop] = newEventData[prop]
        }
        // 重新渲染
        this.$calendar.fullCalendar( 'updateEvent', event );
        // 修改源数据
        const newEvent = new CalendarEvent(event);
        newEvent.saveToWizEventDoc();
    };

    onCompleteBtnClick(event) {
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
        // 重新渲染
        this.$calendar.fullCalendar( 'updateEvent', event );
    };

    onDeleteDataBtnClick(event) {
        if ( WizConfirm("确定要删除该日程？", '番茄助理') ) {
            // 删除日程
            let newEvent = new CalendarEvent(event);
            newEvent.deleteEventData(false);
        }
    };

    onDeleteDocBtnClick(event) {
        if ( WizConfirm("确定要删除该日程源文档？\n「确定」将会导致相关笔记被删除！", '番茄助理') ) {
            let newEvent = new CalendarEvent(event);
            newEvent.deleteEventData(true);
        }	
    };

    onEditOriginBtnClick(event) {
        const doc = objDatabase.DocumentFromGUID(event.id);
        objCommon.EditCalendarEvent(doc);
    };

    onOpenDocBtnClick(event) {
        const doc = objDatabase.DocumentFromGUID(event.id);
        objWindow.ViewDocument(doc, true);
    }

}