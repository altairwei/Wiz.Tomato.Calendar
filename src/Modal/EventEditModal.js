import $ from 'jquery';
import 'bootstrap/js/modal';
import FormHandles from '../Utils/FormHandles';
import { createDatetimePicker } from '../Widget/DateTimePicker';
import { createColorPicker } from '../Widget/ColorPicker';
import EventModal from './EventModal';

export default class EventEditModal extends EventModal {

    constructor(args) {
        super(args);
        //TODO: 想办法避免全局变量
        window.g_editModal = this;
    };

    renderTemplate() {
        const that = this;
        const event = this.args.event;
        this.renderFormComponent(this.modal, [
            {//所有输入框
                node: 'input',
                eventName: 'change',
                handle: () => that.modal.find('#tc-editpage-save').attr('disabled', false)
            },
            {//标题
                node: '#tc-editpage-eventtitle',
                value: event.title,
            },
            {//开始日期
                node: '#tc-editpage-eventstart',
                value: event.start.format('YYYY-MM-DD HH:mm:ss'),
                renderer: createDatetimePicker,
                eventName: 'dp.change',
                handle: () => that.modal.find('#tc-editpage-save').attr('disabled', false)
            },
            {//结束日期
                node: '#tc-editpage-eventend',
                value: event.end.format('YYYY-MM-DD HH:mm:ss'),
                renderer: createDatetimePicker,
                eventName: 'dp.change',
                handle: () => that.modal.find('#tc-editpage-save').attr('disabled', false)
            },
            {//颜色
                node: '#tc-editpage-eventcolor',
                value: event.backgroundColor,
                renderer: (node) => {
                    $(node).css('background-color', event.backgroundColor);
                    createColorPicker(node)
                }
            },
            {//保存按钮
                node: '#tc-editpage-save',
                renderer: (node) => $(node).attr('disabled', true),
                eventName: 'click',
                handle: () => {
                    new FormHandles().onSaveBtnClick(event, that.modal);
                    that.hide()
                }
            },
			{// 完成按钮
				node: '#tc-editpage-finish',
				eventName: 'click',
				handle: () => {
					new FormHandles().onCompleteBtnClick(event);
					that.hide();
				}
			},
            {//删除按钮
                node: '#tc-editpage-delete',
                eventName: 'click',
                handle: () => {
                    new FormHandles().onDeleteDataBtnClick(event);
                    that.hide();
                }
            },
            {//删除源文档
                node: '#tc-editpage-deleteEventDoc',
                eventName: 'click',
                handle: () => {
                    new FormHandles().onDeleteDocBtnClick(event);
                    that.hide()
                }
            },
            {
                node: '#tc-editpage-editorigin',
                eventName: 'click',
                handle: () => {
                    new FormHandles().onEditOriginBtnClick(event);
                    that.hide()
                }
            }
        ])
    };

    get HtmlTemplate() {
        return `
            <div class="modal fade" tabindex="-1" role="dialog" id='tc-EventEditModal'>
                <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">日程编辑</h4>
                    </div> 
                    <div class="modal-body">
                    <form>
                        <div class="row">
                        <div class='form-group col-md-12'>
                            <label for="tc-editpage-eventtitle">标题</label>
                            <input type="text" class="form-control eventtitle" id="tc-editpage-eventtitle">
                        </div>
                        </div>
                        <div class="row">
                        <div class="form-group col-md-6">
                            <label for="tc-editpage-eventstart" class="col-form-label">开始日期</label>
                            <input type="text" class="form-control datetimepicker-input eventstart" id="tc-editpage-eventstart" data-toggle="datetimepicker" data-target="#tc-editpage-eventstart"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="tc-editpage-eventend" class="col-form-label">结束日期</label>
                            <input type='text' class="form-control eventend" id='tc-editpage-eventend' />
                        </div>
                        </div>
                        <div class="row">
                        <div class="form-group col-md-6">
                            <label for="tc-editpage-eventcolor" class="col-form-label">色彩</label>
                            <input id="tc-editpage-eventcolor" class="form-control eventcolor" >
                        </div>
                        <div class="form-group col-md-6">
                            <label for="tc-editpage-eventtags" class="col-form-label">标签</label>
                            <input id="tc-editpage-eventtags" class="form-control eventtags" > 
                        </div>
                        </div>
                        <div class="row">
                        <div class='form-group col-md-12'>
                            <label for="tc-editpage-eventremark">备注</label>
                            <textarea class="form-control eventremark" id="tc-editpage-eventremark" rows="3"></textarea>
                        </div>
                        </div>
                    </form>
                    </div>
                    <div class="modal-footer">
                    <div class='row' style='text-align: left;'>
                        <div class='col-md-7'>
                        <div id="tc-editpage-buttongroup" class="btn-group" role="group">
                            <button id='tc-editpage-save' class="btn btn-danger" type="button" disabled>保存</button>
                            <button id='tc-editpage-finish' class="btn btn-default" type="button">完成</button>
                            <button id='tc-editpage-delete' class="btn btn-default" type="button">删除</button>
                            <button id='tc-editpage-deleteEventDoc' class="btn btn-default" type="button">删除源文档</button>
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-right">
                                <li>
                                    <a id='tc-editpage-editorigin' href='javascript:void(0);'>编辑源数据</a>
                                </li>
                            </ul>
                        </div>
                        </div>
                        <div class='col-md-2 col-md-offset-3' style='text-align: right;'>
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        </div>
                    </div>

                    </div>
                </div>
                </div>
            </div>
        `
    }

}