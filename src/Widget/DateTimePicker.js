import $ from 'jquery';
import 'moment';
import 'bootstrap/js/collapse';
import 'bootstrap/js/transition';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'eonasdan-bootstrap-datetimepicker';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';

/**
 * 创建日期时间选择器.
 * @param {string|HTMLElement} node - 元素或CSS选择器.
 */
export function createDatetimePicker(node) {
	//TOOD: 读取Config
	$(node).datetimepicker({
		format: 'YYYY-MM-DD HH:mm:ss'
	});

	return $(node);
}