import $ from 'jquery';
import 'bootstrap/js/modal';

export default class EventModal {

    constructor(args) {
        this.args = args;
        const html = this.HtmlTemplate;
        this.modal = $(html).modal({
            show: false
        });
        this.renderTemplate();
    };

    update(args) {
        this.args = args;
        this.renderTemplate();
    };

    show() {
        this.modal.modal('show');
    };

    hide() {
        this.modal.modal('hide');
    };

    /**
     * 写入HTML模板.
     */
    get HtmlTemplate() {
        return `
            <div class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Modal title</h4>
                </div>
                <div class="modal-body">
                    <p>One fine body&hellip;</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
            </div><!-- /.modal -->
        `
    };

    /**
     * 由子类定义渲染任务.
     */
    renderTemplate() { };

    /**
     * 渲染模态框表单组件.
     * @param {string|HTMLElement} modalNode - 表单或包含表单的块元素|CSS选择器.
     * @param {Object[]} tasks - 任务列表.
     * @param {string} tasks[].node - CSS选择器.
     * @param {string} tasks[].value - 需要填入的值.
     * @param {Function} tasks[].renderer - 组件渲染器.
     * @param {string} tasks[].eventName - 事件名称.
     * @param {Function} tasks[].handle - 句柄.
     */
    renderFormComponent(modalNode, tasks) {
        for (let task of tasks) {
            let $comps = $(modalNode).get(0) == $(task.node).get(0) ? $(task.node) : $(modalNode).find(task.node);
            // 渲染组件
            if ( task.value ) $comps.val(task.value);
            if ( typeof task.renderer == 'function' ) task.renderer($comps);
            // 绑定句柄
            if ( task.handle && typeof task.handle == 'function' && task.eventName ) {
                this.refreshEventHandle($comps, task.eventName, task.handle);
            }
        }
    };

    /**
     * 刷新事件句柄.
     * @param {string|HTMLElement} node - 元素或CSS选择器.
     * @param {string} jsEventName - 要刷新的事件名称.
     * @param {function} handle - 要绑定的句柄
     */
    refreshEventHandle(node, jsEventName, handle) {
        // 利用jQuery本身的类数组特性实现多个绑定；
        $(node).off(jsEventName).on(jsEventName, handle);
        return $(node);
    }

    /**
     * 重置表单.
     * @param {string|HTMLElement} form - 表单或包含表单的块元素|CSS选择器.
     * @param {string} excludes - 用CSS选择器代表需要排除的元素.
     */
    resetFormInput(form, excludes) {
        $(form).find('input').not(excludes).each(function(index,element){
            $(element).css('background-color', '');
            $(element).val('');
        })
    }
}