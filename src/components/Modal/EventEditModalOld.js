import $ from 'jquery';
import 'bootstrap/js/modal';
import 'bootstrap/js/tab';
import FormHandles from '../Utils/FormHandles';
import { createDatetimePicker } from '../Widget/DateTimePicker';
import { createColorPicker } from '../Widget/ColorPicker';
import { createBootstrapSelect } from '../Widget/BootstrapSelect'
import EventModal from './EventModalOld';

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
                    // 显示默认标签页
                    this.modal.find('#tc-editpage-tabs a:first').tab('show');
                    $(node).click(function(e) {
                        e.preventDefault();
                        $(this).tab('show');
                    })
                }
            },
            {//所有输入框
                node: 'input',
                excludes: '#tc-editpage-isend',
                eventName: 'change',
                handle: () => that.modal.find('#tc-editpage-save').attr('disabled', false)
            }
        ]);

        this.renderEditForm();
        this.renderRepeatForm();
        this.renderControlButtons();
        
    };

    renderEditForm() {
        const that = this;
        const event = this.args.event;
        if ( !this.editForm ) {
            this.editForm = $(this.HtmlEditForm);
            $(this.modal).find('#tc-editform').append( this.editForm );
        } 
        this.renderFormComponent(this.editForm, [
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
            }
        ])

    }

    get HtmlEditForm() {
        return `
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
        `
    };

    renderRepeatForm() {
        const that = this;
        const event = this.args.event;
        if ( !this.repeatForm ) {
            this.repeatForm = $(this.HtmlRepeatForm);
            $(this.modal).find('#tc-repeatform').append( this.repeatForm );
        };
        this.renderFormComponent(this.repeatForm, [
            {//重复规则
                node: '#tc-editpage-rptrule',
                renderer: (node) => {
                    // 渲染重复规则选择组件
                    createBootstrapSelect(node);
                    // 判断重复规则并设置UI
                    let rptRegexArray = this._checkRptType(event.rptRule);
                    if (!rptRegexArray) rptRegexArray = [];
                    if ( rptRegexArray.length == 3 ) {
                        // 判断为 EveryWeek
                        this.repeatForm.find(node).selectpicker('val', `Every${rptRegexArray[1]}Week`);
                        const weekDays = rptRegexArray[2].split('');
                        for (let day of weekDays) {
                            this.repeatForm.find('.rptweekday').attr('disabled', false);
                            this.repeatForm.find(`.rptweekday[value='${day}']`).prop("checked", true);
                        }
                    } else if ( rptRegexArray.length == 2 ) {
                        // 判断为EveryWeekday135等
                        this.repeatForm.find(node).selectpicker('val', `EveryWeekday`);
                        const weekDays = rptRegexArray[1].split('');
                        for (let day of weekDays) {
                            this.repeatForm.find(`.rptweekday`).not(`.rptweekday[value='6']`).not(`.rptweekday[value='7']`).attr('disabled', false);
                            this.repeatForm.find(`.rptweekday[value='${day}']`).prop("checked", true);
                        }

                    } else if ( rptRegexArray.length == 1 ) {
                        // 判断为简单 Daily,weekly等
                        this.repeatForm.find(node).selectpicker('val', event.rptRule);
                    } else {
                        this.repeatForm.find(node).selectpicker('val', 'none');
                        this.repeatForm.find('.rptweekday').prop("checked", false).attr('disabled', true);
                    }
                    
                } ,
                eventName: 'changed.bs.select',
                handle: (e, clickedIndex, newValue, oldValue) => {
                    if ( clickedIndex == 5 || clickedIndex == 6 ) {
                        // EveryWeek
                        $('.rptweekday').attr('disabled', false);
                    } else if ( clickedIndex == 7 ) {
                        // EveryWeekday
                        this.repeatForm.find(`.rptweekday`).not(`.rptweekday[value='6']`).not(`.rptweekday[value='7']`).attr('disabled', false);
                    } else {
                        $('.rptweekday').prop("checked", false).attr('disabled', true);
                    }
                }
            },
            {//开始范围
                node: '#tc-editpage-rptstart',
                value: event.start.format('YYYY-MM-DD')
            },
            {//是否结束
                node: '#tc-editpage-isend',
                eventName: 'click',
                handle: (node) => {
                    const isEndCheckbox = this.repeatForm.find('#tc-editpage-isend');
                    const rptEnd = this.repeatForm.find('#tc-editpage-rptend');
                    if ( isEndCheckbox.get(0).checked ) {
                        rptEnd.attr('readonly', false);
                    } else {
                        rptEnd.attr('readonly', true);
                        rptEnd.val('');
                    }
                }
            },
            {//结束范围
                node: '#tc-editpage-rptend',
                renderer: (node) => $(node).val(''),
                renderer: createDatetimePicker
            }
        ])
    }

    _checkRptType(rptRule) {
        let regex;
		if ( (regex = /^Every(\d)?Weeks?(\d*)$/).test(rptRule) ) {
            return regex.exec(rptRule);
		} else if ( (regex = /^EveryWeekday(\d*)$/).test(rptRule) ) {
            return regex.exec(rptRule);
		} else if ( (regex = /Daily|Weekly|Monthly|Yearly/).test(rptRule) ) {
            return regex.exec(rptRule);
		}
    }

    get HtmlRepeatForm() {
        return `
            <form class="form-horizontal">
                <div class='form-group '>
                    <label for="tc-editpage-rpttype" class="col-md-2 col-md-offset-1 control-label">重复类型</label>
                    <div class="col-md-8">
                        <select class="" id="tc-editpage-rptrule">
                            <option value="none">不重复</option>
                            <optgroup label="简单规则">
                                <option value="Daily">每日</option>
                                <option value="Weekly">每周</option>
                                <option value="Monthly">每月</option>
                                <option value="Yearly">每年</option>
                            </optgroup>
                            <optgroup label="复合规则">
                                <option value="EveryWeek">每一个星期几</option>
                                <option value="Every2Week">每两个星期几</option>
                                <option value="EveryWeekday">每个工作日</option>
                            </optgroup>
                        </select>
                    </div>
                </div>
                <div class='form-group '>
                    <label for="tc-editpage-rptweekday" class="col-md-2 col-md-offset-1 control-label">重复星期</label>
                    <div class="col-md-8">
                        <div class="checkbox-inline"><label><input type="checkbox" class="rptweekday" value="1" disabled> 一</label></div>
                        <div class="checkbox-inline"><label><input type="checkbox" class="rptweekday" value="2" disabled> 二</label></div>
                        <div class="checkbox-inline"><label><input type="checkbox" class="rptweekday" value="3" disabled> 三</label></div>
                        <div class="checkbox-inline"><label><input type="checkbox" class="rptweekday" value="4" disabled> 四</label></div>
                        <div class="checkbox-inline"><label><input type="checkbox" class="rptweekday" value="5" disabled> 五</label></div>
                        <div class="checkbox-inline"><label><input type="checkbox" class="rptweekday" value="6" disabled> 六</label></div>
                        <div class="checkbox-inline"><label><input type="checkbox" class="rptweekday" value="7" disabled> 日</label></div>
                    </div>
                </div>
                <div class='form-group '>
                    <label for="tc-editpage-rptrange" class="col-md-2 col-md-offset-1 control-label">重复范围</label>
                    <div class="col-md-8">
                        <div class="input-group">
                            <span class="input-group-addon">开始</span>
                            <input type="text" id="tc-editpage-rptstart" class="form-control" readonly />
                            <span class="input-group-addon" style="border-left: 0; border-right: 0;"><input id="tc-editpage-isend" type="checkbox" style="vertical-align: middle;"> 结束</span>
                            <input type="text" id="tc-editpage-rptend" class="form-control" placeholder="从不结束" readonly />
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
        `
    };

    renderControlButtons() {
        const that = this;
        const event = this.args.event;
        const formHandles = new FormHandles();
        if ( !this.controlButtons ) {
            this.controlButtons = $(this.HtmlControlButtons);
            $(this.modal).find('.modal-footer').append( this.controlButtons );
        }
        this.renderFormComponent(this.controlButtons, [
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
        ]);
    }

    get HtmlControlButtons() {
        return `
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
        `
    }

    get HtmlModalTemplate() {
        return `
            <div class="modal fade" tabindex="-1" role="dialog" id='tc-EventEditModal'>
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <!-- 头部 -->
                        <div class="modal-header" style="border-bottom: none; padding: 0;">
                            <!-- 标签页链接 -->
                            <ul class="nav nav-tabs" id="tc-editpage-tabs" role="tablist" style="padding: 15px 15px 0 15px;">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <li role="presentation" class="active"><a href="#tc-editform" aria-controls="tc-editform" role="tab">日程编辑</a></li>
                                <li role="presentation" ><a href="#tc-repeatform" aria-controls="tc-repeatform" role="tab">重复</a></li>
                            </ul>
                        </div> 
                        <!-- 主体 -->
                        <div class="modal-body">
                            <!-- 标签页内容 -->
                            <div class="tab-content">
                                <div role="tabpanel" class="tab-pane active" id="tc-editform"></div>
                                <div role="tabpanel" class="tab-pane" id="tc-repeatform"></div>
                            </div>
                        </div>
                        <!-- 尾部 -->
                        <div class="modal-footer"></div>
                    </div>
                </div>
            </div>
        `
    }

}