export default class FormHandles {
    constructor() {

    };

    onCreateBtnClick(start, end, jsEvent, view) {
        wizCreateEvent(start, end, jsEvent, view); // 这一步耗时
        g_createDialog.modal('hide');
        g_cal.fullCalendar('unselect');
    };

    onSaveBtnClick(event, formNode) {
        //TODO: 完成开始与结束时间变更
        //TODO: 通过在formNode搜索.eventtitle,.eventcolor等class来获取变量
        if (!g_cal) throw new Error('Can not find FullCalendar Widget.');
        // 保存数据
        let newEvent = new CalendarEvent(event);
        newEvent.title = formNode.find('.eventtitle').val();
        newEvent.backgroundColor = formNode.find('.eventcolor').val();
        // 保存到数据文档
        newEvent.saveToWizEventDoc();
        newEvent.refreshEvent(event)
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