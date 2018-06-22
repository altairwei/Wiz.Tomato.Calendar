import $ from 'jquery';
import Popper from 'popper.js';

$.widget("tc.EventPopover", {
	options: {
		title: 'No title !', //String
		content: '',
		template: `
		<div class="popover" role="tooltip">
		  <div class="arrow"></div>
		  <div class="popover-header"></div>
		  <div class="popover-body"></div>
		</div>`,
		templatePreprocessor: null, // 传入 this 作为参数
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
		//TODO: 判断template是字符串还是HTMLElement或者jQuery对象
		let opts = this.options;
		let tpp = opts.templatePreprocessor;

		let popper;
		if ( typeof tpp == 'function' ) {
			popper = tpp(template, this);
		} else {
			popper = $(template);
			popper.find('.tc-popover-header').text(opts.title);
		}

		return popper; // jQuery
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