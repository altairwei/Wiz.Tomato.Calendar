import $ from 'jquery';
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