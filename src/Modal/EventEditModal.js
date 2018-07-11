import $ from 'jquery';
import 'bootstrap/js/modal';
import 'bootstrap/js/tab';
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
        const formHandles = new FormHandles();
        this.renderFormComponent(this.modal, [
            {//渲染tabs
                node: '#tc-editpage-tabs a',
                renderer: (node) => {
                    $(node).click(function(e) {
                        e.preventDefault();
                        $(this).tab('show');
                    })
                }
            },
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
                    formHandles.onSaveBtnClick(event, that.modal);
                    that.hide()
                }
            },
			{// 完成按钮
				node: '#tc-editpage-finish',
				eventName: 'click',
				handle: () => {
					formHandles.onCompleteBtnClick(event);
					that.hide();
				}
			},
            {//删除按钮
                node: '#tc-editpage-delete',
                eventName: 'click',
                handle: () => {
                    formHandles.onDeleteDataBtnClick(event);
                    that.hide();
                }
            },
            {//删除源文档
                node: '#tc-editpage-deleteEventDoc',
                eventName: 'click',
                handle: () => {
                    formHandles.onDeleteDocBtnClick(event);
                    that.hide();
                }
            },
            {//编辑源数据
                node: '#tc-editpage-editorigin',
                eventName: 'click',
                handle: () => {
                    formHandles.onEditOriginBtnClick(event);
                    that.hide();
                }
            },
            {//打开源文档
                node: '#tc-editpage-openEventDoc',
                eventName: 'click',
                handle: () => {
                    formHandles.onOpenDocBtnClick(event);
                    that.hide();
                }
            }
        ])
    };

    get HtmlTemplate() {
        return `
            <div class="modal fade" tabindex="-1" role="dialog" id='tc-EventEditModal'>
                <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header" style="border-bottom: none; padding: 0;">
                        <ul class="nav nav-tabs" id="tc-editpage-tabs" role="tablist" style="padding: 15px 15px 0 15px;">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <li role="presentation" class="active"><a href="#tc-editform" aria-controls="tc-editform" role="tab">日程编辑</a></li>
                            <li role="presentation" ><a href="#tc-repeatform" aria-controls="tc-repeatform" role="tab">重复</a></li>
                        </ul>
                    </div> 
                    <div class="modal-body">
                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="tc-editform">
                            <form>
                                <div class="row">
                                <div class='form-group col-md-12'>
                                    <label for="tc-editpage-eventtitle" class="control-label">标题</label>
                                    <input type="text" class="form-control eventtitle" id="tc-editpage-eventtitle">
                                </div>
                                </div>
                                <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="tc-editpage-eventstart" class="control-label">开始日期</label>
                                    <input type="text" class="form-control datetimepicker-input eventstart" id="tc-editpage-eventstart" data-toggle="datetimepicker" data-target="#tc-editpage-eventstart"/>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="tc-editpage-eventend" class="control-label">结束日期</label>
                                    <input type='text' class="form-control eventend" id='tc-editpage-eventend' />
                                </div>
                                </div>
                                <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="tc-editpage-eventcolor" class="control-label">色彩</label>
                                    <input id="tc-editpage-eventcolor" class="form-control eventcolor" >
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="tc-editpage-eventtags" class="control-label">标签</label>
                                    <input id="tc-editpage-eventtags" class="form-control eventtags" >
                                </div>
                                </div>
                                <div class="row">
                                <div class='form-group col-md-12'>
                                    <label for="tc-editpage-eventremark" class="control-label">备注</label>
                                    <textarea class="form-control eventremark" id="tc-editpage-eventremark" rows="3"></textarea>
                                </div>
                                </div>
                            </form>                        
                        </div>
                        <div role="tabpanel" class="tab-pane" id="tc-repeatform">
                            <form class="form-horizontal">
                                <div class='form-group '>
                                    <label for="tc-editpage-rpttype" class="col-md-2 col-md-offset-1 control-label">重复类型</label>
                                    <div class="col-md-8">
                                        <select class="form-control">
                                            <option>每个星期几</option>
                                            <option>每周</option>
                                            <option>每月</option>
                                            <option>每年</option>
                                        </select>
                                    </div>
                                </div>
                                <div class='form-group '>
                                    <label for="tc-editpage-rptweekday" class="col-md-2 col-md-offset-1 control-label">重复星期</label>
                                    <div class="col-md-8">
                                        <div class="checkbox-inline"><label><input type="checkbox" class="rptweekday" value="1"> 一</label></div>
                                        <div class="checkbox-inline"><label><input type="checkbox" class="rptweekday" value="2"> 二</label></div>
                                        <div class="checkbox-inline"><label><input type="checkbox" class="rptweekday" value="3"> 三</label></div>
                                        <div class="checkbox-inline"><label><input type="checkbox" class="rptweekday" value="4"> 四</label></div>
                                        <div class="checkbox-inline"><label><input type="checkbox" class="rptweekday" value="5"> 五</label></div>
                                        <div class="checkbox-inline"><label><input type="checkbox" class="rptweekday" value="6"> 六</label></div>
                                        <div class="checkbox-inline"><label><input type="checkbox" class="rptweekday" value="7"> 日</label></div>
                                    </div>
                                </div>
                                <div class='form-group '>
                                    <label for="tc-editpage-rptrange" class="col-md-2 col-md-offset-1 control-label">重复时间</label>
                                    <div class="col-md-8">
                                        <div class="input-group">
                                            <span class="input-group-addon">开始</span>
                                            <input type="text" class="form-control" readonly />
                                            <span class="input-group-addon" style="border-left: 0; border-right: 0;"><input type="checkbox" style="vertical-align: middle;"> 结束</span>
                                            <input type="text" class="form-control" readonly />
                                        </div>
                                    </div>
                                </div>
                                <div class='form-group '>
                                    <label for="tc-editpage-rptrule" class="col-md-2 col-md-offset-1 control-label">重复规则</label>
                                    <div class="col-md-8">
                                        <input type="text" class="form-control eventtitle" id="tc-editpage-rptrule" readonly>
                                    </div>
                                </div>
                            </form>     
                        </div>
                    </div>
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
                                    <a id='tc-editpage-openEventDoc' href='javascript:void(0);'>打开源文档</a>
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