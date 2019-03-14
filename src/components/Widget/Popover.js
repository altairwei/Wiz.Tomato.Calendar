import $ from 'jquery';
import 'jquery-ui';
import Popper from 'popper.js';
import './EventPopover.css'

$.widget("tc.Popover", {
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
})