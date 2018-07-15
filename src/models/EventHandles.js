import $ from 'jquery';
import WizEventDataLoader from '../models/WizEventDataLoader';
import CalendarEvent from '../models/CalendarEvent';
import { WizConfirm, WizCommonUI as objCommon, WizDatabase as objDatabase, WizExplorerWindow as objWindow } from '../utils/WizInterface';

export default class FormHandles {
    constructor() {
        this.$calendar = $('#calendar')
    };

    onCreateBtnClick(start, end, jsEvent, view, formNode) {
        const title = $(formNode).find('#tc-createpage-eventtitle').val();
        const color = $(formNode).find('#tc-createpage-eventcolor').val();
        new WizEventDataLoader().createEvent({start, end, jsEvent, view}, {title, color}); // 这一步耗时
        $(formNode).modal('hide');
        $('#calendar').fullCalendar('unselect');
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