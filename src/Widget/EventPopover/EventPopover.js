import $ from 'jquery';
import 'jquery-ui/ui/widget';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/js/dropdown';
import '@fortawesome/fontawesome-free/js/all';
import Popper from 'popper.js';
import './EventPopover.css';
import { renderFormComponent } from '../../Utils/FormUtils';
import FormHandles from '../../Utils/FormHandles';
import { createColorPicker } from '../ColorPicker';
import EventEditModal from '../../Modal/EventEditModal'

export { renderEditPopper };

$.widget("tc.EventPopover", {
	options: {
		title: 'No title !', //String
		template:
		`
		<div class="tc-popover" role="tooltip">
			<div class="arrow"></div>
			<div class="tc-popover-header">
				<input type="text" id="tc-editpopper-eventtitle"  form='tc-popover-event-editForm' class='eventtitle'>
			</div>
			<div class="tc-popover-body">
				<form id = 'tc-popover-event-editForm' class='form-horizontal'>
					<div class="form-group">
						<label for="tc-editpopper-eventdate" class="col-sm-2 col-form-label"><i class='far fa-calendar-alt fa-lg'></i></label>
						<div class="col-sm-10">
							<input type="text" readonly class="form-control eventdate" id="tc-editpopper-eventdate">
						</div>
					</div>
					<div class="form-group">
						<label for="tc-editpopper-eventcolor" class="col-sm-2 col-form-label"><i class="fas fa-paint-brush"></i></label>
						<div class="col-sm-10">
							<input id="tc-editpopper-eventcolor" class="form-control eventcolor" >
						</div>
					</div>
				</form>
				<div id="tc-editpopper-buttongroup" class="btn-group" role="group">
					<button id='tc-editpopper-save' class="btn btn-default" type="button">保存</button>
					<button id='tc-editpopper-finish' class="btn btn-default" type="button">完成</button>
					<button id='tc-editpopper-edit' class="btn btn-default" type="button">编辑</button>
					<button id='tc-editpopper-delete' class="btn btn-default" type="button">删除</button>
					<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<span class="caret"></span>
					</button>
					<ul class="dropdown-menu dropdown-menu-right">
						<li>
							<a id='tc-editpopper-deleteEventDoc' href='javascript:void(0);'>删除源文档</a>
						</li>
					</ul>
				</div>

			</div>
		</div>
		`,
		placement: 'right',
		offset: '10px',
		autoShow: true,
		reference: null, // 用户输入时可以时jQuery或者HTMLElement
	},
	
	_create: function() {
		let that = this;
		let opts = this.options;
		
		// 检测是否提供reference，没有则设置为 this.element，统一格式化为jQuery对象；
		opts.reference = opts.reference ? $(opts.reference) : this.element;

		// 准备模板，有重复调用的bug
		this.$popperNode = this._processTemplate(opts.template);

		// 创建Popper实例(定位引擎)
		this.popperInstance = new Popper(opts.reference.get(0), this.$popperNode.get(0), {
			placement: opts.placement,
			modifiers: {
				arrow: {
				  element: '.arrow'
				}
			},
		});

		// 设置自动隐藏
		this._setAutoHide();

		//根据设置是否自动显示
		if ( opts.autoShow == true ) this.show();

	},

	_processTemplate: function(template) {
		const that = this;
		const opts = this.options;
		const event = opts.args.event;
		const $popper = $(template);
		const formHandles = new FormHandles();

		renderFormComponent($popper, [
			{// 标题
				node: '#tc-editpopper-eventtitle',
				value: event.title,
				eventName: 'change',
				handle: () => $popper.find('#tc-editpopper-save').attr('disabled', false)
			},
			{// 日期
				node: '#tc-editpopper-eventdate',
				value: event.start.format('YYYY-MM-DD HH:mm:ss')
			},
			{// 颜色
				node: '#tc-editpopper-eventcolor',
				value: event.backgroundColor,
				renderer: (node) => {
					$(node).css('background-color', event.backgroundColor);
					createColorPicker(node);
				},
				eventName: 'change',
				handle: () => $popper.find('#tc-editpopper-save').attr('disabled', false)
			},
			{// 保存按钮
				node: '#tc-editpopper-save',
				renderer: (node) => $(node).attr("disabled", true),
				eventName: 'click',
				handle: () => {
					formHandles.onSaveBtnClick(event, $popper);
					that.hide();
				}
			},
			{// 完成按钮
				node: '#tc-editpopper-finish',
				renderer: (node) => $(node).text(
					parseInt(event.complete) == 5 ? '恢复' : '完成'
				),
				eventName: 'click',
				handle: () => {
					formHandles.onCompleteBtnClick(event);
					that.hide();
				}
			},
			{// 编辑按钮
				node: '#tc-editpopper-edit',
				eventName: 'click',
				handle: () => {
					//TODO: 想办法不要用全局变量
					if ( !window.g_editModal ) new EventEditModal({event});
					g_editModal.update({event});
					g_editModal.show();
				}
			},
			{// 删除日程数据按钮
				node: '#tc-editpopper-delete',
				eventName: 'click',
				handle: () => {
					formHandles.onDeleteDataBtnClick(event);
					that.hide();
				}
			},
			{// 删除源文档按钮
				node: '#tc-editpopper-deleteEventDoc',
				eventName: 'click',
				handle: () => {
					formHandles.onDeleteDocBtnClick(event);
					that.hide();
				}
			}
		])

		return $popper; // jQuery
	},

	_setAutoHide() {
		let opts = this.options;
		let that = this;

		// 先取消已有自动隐藏事件，方式反复添加句柄
		this._off(this.document, 'click');

		// 点击空白处自动隐藏
		this._on(this.document, {
			click: function(e) {
				if (
					// 不是日历事件元素
					!$(opts.reference).is(e.target) &&
					// 也不是子元素
					$(opts.reference).has(e.target).length === 0 &&
					// 不是popper元素
					 !that.$popperNode.is(e.target) &&
					// 也不是子元素
					that.$popperNode.has(e.target).length === 0
				) {
					that.hide();
				}
			}
		})
	},

	update: function() {
		// 根据Options更新popperInstance以及$popperNode
		let opts = this.options;
		// 设置自动隐藏
		this._setAutoHide();
		// 更新 $popperNode
		this.$popperNode = this._processTemplate(this.$popperNode); // 传入的是引用
		// 更新 popperInstance
		this.popperInstance.popper = this.$popperNode.get(0);
		this.popperInstance.reference = opts.reference ? $(opts.reference).get(0) : this.element.get(0);
		this.popperInstance.update();
	},

	show: function() {
		let opts = this.options;
		// 如果没有添加到DOM树则添加
		if( !$(this.$popperNode).parent().is('body') ) $(this.$popperNode).appendTo('body');
		// 显示$popperNode
		this._show(this.$popperNode);

	},

	hide: function() {
		//TODO: 隐藏Popover
		this._hide(this.$popperNode)
	},

	destroy: function() {
		this.popperInstance.destroy();
		$(this.$popperNode).remove();
		this.$popperNode = null;
	}
})

/**
 * 渲染事件小弹窗.
 * @param {object} args 包含FullCalendar传入的参数.
 * @param {object} args.event FullCalendar事件.
 * @param {object} args.jsEvent native JavaScript 事件.
 * @param {object} args.view FullCalendar 视图.
 * @param {object} element is a jQuery element for the container of the new view.
 * @return {Object[]} 返回用于FullCalendar渲染的事件数组.
 */
function renderEditPopper(args, reference) {
	// 渲染弹窗
	const editPopper = $( '<div></div>' ).EventPopover({
		args: args,
		placement: 'auto',
		reference: reference,
	});

	return editPopper;
}