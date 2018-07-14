import React from 'react';
import ReactDOM from 'react-dom';
import './EventPopover.css';
import Popper from 'popper.js';
import EventTitleInput from './EventTitleInput';
import EventSimpleForm from './EventSimpleForm';

export default class EventPopover extends React.Component {
    constructor(props) {
        super(props);
        this.popperNode = null;
        this.popperInstance = null;
        // 绑定事件
        this.autoHide = this.autoHide.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    autoHide(e) {
        if (
            // 不是日历事件元素
            !$(this.props.reference).is(e.target) &&
            // 也不是子元素
            $(this.props.reference).has(e.target).length === 0 &&
            // 不是popper元素
                !$(this.popperNode).is(e.target) &&
            // 也不是子元素
            $(this.popperNode).has(e.target).length === 0
        ) {
            this.hide();
        }
    }

    hide() {
        const that = this;
        return new Promise(function(resolve, reject){
            $(that.popperNode).hide(0, null, resolve);
        })
        
    }

    show() {
        const that = this;
        return new Promise(function(resolve, reject){
            $(that.popperNode).fadeIn(350, null, resolve);
        })
    }

    handleTitleChange() {
        //TODO: 处理事件标题变更，并储存数据
    }

    componentDidMount() {
        // 初始化组件
        this.popperInstance = new Popper(this.props.reference, this.popperNode, {
			placement: 'auto',
			modifiers: {
				arrow: {
				  element: '.arrow'
				}
			},
		});
        // 设置自动隐藏
        $(document).off('click', this.autoHide).on('click', this.autoHide);
        // 显示
        this.show();
        
    }

    componentWillReceiveProps(nextProps) {
        // 更新定位
        this.hide().then( (ret) => {
            this.popperInstance.reference = nextProps.reference;
            this.popperInstance.update();
        })
        this.show();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //
        this.show();
    }

    render() {
        return (
            <div className="tc-popover" role="tooltip" 
                    ref={(div) => this.popperNode = div} style={{display: 'none'}}>
                <div className="arrow"></div>
                <div className="tc-popover-header">
                    <EventTitleInput title={this.props.event.title} 
                        onTitleChange={this.handleTitleChange} />
                </div>
                <div className="tc-popover-body">
                    <EventSimpleForm 
                        eventStart={this.props.event.start}
                        colorValue={this.props.event.backgroundColor}
                    />
                </div>
            </div>
        );
    }
}