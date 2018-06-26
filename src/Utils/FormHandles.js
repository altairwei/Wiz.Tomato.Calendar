import $ from 'jquery';
import WizEventDataLoader from '../WizEventDataLoader';
import CalendarEvent from '../CalendarEvent';
import { WizConfirm } from '../WizInterface';

const g_cal = $('#calendar');

export default class FormHandles {
    constructor() {

    };

    onCreateBtnClick(start, end, jsEvent, view, formNode) {
        const title = $(formNode).find('#tc-createpage-eventtitle').val();
        const color = $(formNode).find('#tc-createpage-eventcolor').val();
        new WizEventDataLoader().createEvent({start, end, jsEvent, view}, {title, color}); // 这一步耗时
        $(formNode).modal('hide');
        $('#calendar').fullCalendar('unselect');
    };

    onSaveBtnClick(event, formNode) {
        //TODO: 完成开始与结束时间变更
        //TODO: 通过在formNode搜索.eventtitle,.eventcolor等class来获取变量
        if (!g_cal) throw new Error('Can not find FullCalendar Widget.');
        // 保存数据
        const newEvent = new CalendarEvent(event);
        newEvent.title = formNode.find('.eventtitle').val();
        newEvent.backgroundColor = formNode.find('.eventcolor').val();
        // 保存到数据文档
        newEvent.saveToWizEventDoc();
        newEvent.refreshEvent(event)
    };

    onCompleteBtnClick(event) {
        if (!g_cal) throw new Error('Can not find FullCalendar Widget.');
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
        g_cal.fullCalendar( 'updateEvent', event );
    };

    onDeleteDataBtnClick(event) {
        if (!g_cal) throw new Error('Can not find FullCalendar Widget.');
        if ( WizConfirm("确定要删除该日程？", '番茄助理') ) {
            // 删除日程
            let newEvent = new CalendarEvent(event);
            newEvent.deleteEventData(false);
        }
    };

    onDeleteDocBtnClick(event) {
        if (!g_cal) throw new Error('Can not find FullCalendar Widget.');
        if ( WizConfirm("确定要删除该日程源文档？\n「确定」将会导致相关笔记被删除！", '番茄助理') ) {
            let newEvent = new CalendarEvent(event);
            newEvent.deleteEventData(true);
        }	
    };

}