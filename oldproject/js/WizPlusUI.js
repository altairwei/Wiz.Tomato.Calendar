/* 依赖于jQuery UI Widget Factory
 * 一些常用的组件
 * 
 * 
 */

 /* Control Button
  * 与 jQuery-UI 原生的 button 组件相比，该组件能传入按钮执行的句柄，
  * 并且是具备激活状态的。
 --------------------------------------------------------------- */

$.widget("wu.ControlButton", $.ui.button, {
    options: {
		classes: {
            "wu-ctrlbtn" : "",
            "wu-ctrlbtn-default" : "",
            "wu-ctrlbtn-hover" : "",
            "wu-ctrlbtn-active" : "",
		},
		disabled: null,
		icon: null, // 传入FontAwesome的<i></i>字符串。
		iconPosition: "beginning",
		label: null,
        showLabel: true,
        actionTarget: null, // 传入jQuery对象
        actionCallback: null, // 传入要执行的callback
        actionCallbackParam: null, // callback需要的参数
	},


    _create: function() {
        let that = this, opts = this.options, el = this.element;

        // 绑定事件
        this._on(el, {
            click : that._toggleAction,
        })

        // 
        this._addClass(el, "wu-ctrlbtn");
        this._addClass(el, "wu-ctrlbtn-default");

        return this._super();
    },

    _toggleAction: function() {
        let that = this, opts = this.options, el = this.element;
        
        // 判断语句，查看按钮处于什么状态
        if ( el.hasClass('wu-ctrlbtn-active') ) {
            // 关闭元素控件操作
            opts.actionCallback.call(opts.actionTarget, 'destroy');
            // 清除Class
            this._removeClass(el, "wu-ctrlbtn-active");
            this._addClass(el, "wu-ctrlbtn-default");
        } else {
            // 开启元素控件操作
            opts.actionCallback.call(opts.actionTarget, opts.actionCallbackParam);
            
            // 设置激活Class
            this._addClass(el, "wu-ctrlbtn-active");
            this._removeClass(el, "wu-ctrlbtn-default");
        }
    },

} )

// 创建Widget: 元素控制面板组件
$.widget("wu.cPanelGroup", $.ui.controlgroup, {

    _resolveClassesValues: function( classes, instance ) {
        var controlgroupCornerRegex = /ui-corner-([a-z]){2,6}/g;
        var result = {};
        // 遍历“传入的classes”所有元素
		$.each( classes, function( key ) {
            // 获取子组件对应classes设置
            var current = instance.options.classes[ key ] || "";
            //去除当前classes设置中的ui-corner-class，再去掉首位空白
            current = $.trim( current.replace( controlgroupCornerRegex, "" ) );
            // 将子组件修改后的对应设置与传入classes的对应设置连接成字符串，并将连续空白用一个空格代替
			result[ key ] = ( current + " " + classes[ key ] ).replace( /\s+/g, " " );
		} );
		return result;
	},

	_buildSimpleOptions: function( position, key ) {
		var direction = this.options.direction === "vertical";
		var result = {
			classes: {}
		};
		result.classes[ key ] = {
			"middle": "",
			"first": "ui-corner-" + ( direction ? "top" : "left" ),
			"last": "ui-corner-" + ( direction ? "bottom" : "right" ),
			"only": "ui-corner-all"
		}[ position ];

		return result;
    },
    
    refresh: function() {
        this._super();
	}
})