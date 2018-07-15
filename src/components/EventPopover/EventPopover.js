import React from 'react';
import './EventPopover.css';
import Popper from 'popper.js';
import PopoverTitleInput from './PopoverTitleInput';
import PopoverSimpleForm from './PopoverSimpleForm';
import PopoverToolbar from './PopoverToolbar';
import EventHandles from '../../models/EventHandles';

export default class EventPopover extends React.Component {
    constructor(props) {
        super(props);
        this.popperNode = null;
        this.popperInstance = null;
        this.eventHandles = new EventHandles();
        //
        this.state = {
            newEventData: {}
        }
        // 绑定事件
        this.autoHide = this.autoHide.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSaveBtnClick = this.handleSaveBtnClick.bind(this);
        this.handleCompleteBtnClick = this.handleCompleteBtnClick.bind(this);
        this.handleOpenDocBtnClick = this.handleOpenDocBtnClick.bind(this);
        this.handleDeleteDataBtnClick = this.handleDeleteDataBtnClick.bind(this);
        this.handleDeleteDocBtnClick = this.handleDeleteDocBtnClick.bind(this);
    }

    // 动画效果
    // ------------------------------------------------------------

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

    // 事件句柄
    // ------------------------------------------------------------

    handleTitleChange(e) {
        //储存到将新的值储存newEventData里，当保存时检索newEventData列表
        const newTitle = e.target.value;
        this.setState(function(prevState, props) {
            //拷贝前一个对象
            const newEventData = Object.create(prevState.newEventData);
            newEventData.title = newTitle;
            return { newEventData };
        })
    }

    //TODO: 写一个通用方法计算BtnClick调用，以免代码重复

    handleSaveBtnClick(e) {
        this.hide().then( 
            (ret) => this.eventHandles.onSaveBtnClick(this.props.event, this.state.newEventData) 
        )
    }

    handleCompleteBtnClick(e) {
        this.hide().then(
            (ret) => this.eventHandles.onCompleteBtnClick(this.props.event) 
        )
    }

    handleOpenDocBtnClick(e) {
        this.hide().then(
            (ret) => this.eventHandles.onOpenDocBtnClick(this.props.event) 
        )
    }

    handleDeleteDataBtnClick(e) {
        this.hide().then(
            (ret) => this.eventHandles.onDeleteDataBtnClick(this.props.event) 
        )        
    }

    handleDeleteDocBtnClick(e) {
        this.hide().then(
            (ret) => this.eventHandles.onDeleteDocBtnClick(this.props.event) 
        )  
    }

    // 生命周期
    // ------------------------------------------------------------

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

    componentDidUpdate(prevProps, prevState, snapshot) {
        //
        this.show();
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 当更新属性时才触发动画效果
        if ( nextProps != this.props ) {
            // 设置更新时的动画
            this.hide().then( (ret) => {
                //更新定位
                this.popperInstance.reference = nextProps.reference;
                this.popperInstance.update();
            })
            this.show();
        }

        //
        return true;
    }

    render() {
        return (
            <div className="tc-popover"
                    style={{display: 'none'}}
                    ref={(div) => this.popperNode = div} >
                <div className="arrow"></div>
                <div className="tc-popover-header">
                    <PopoverTitleInput 
                        eventTitle={this.props.event.title}
                        onTitleChange={this.handleTitleChange} 
                        targetForm='tc-popover-event-editForm' />
                </div>
                <div className="tc-popover-body">
                    <PopoverSimpleForm 
                        id='tc-popover-event-editForm'
                        eventStart={this.props.event.start}
                        colorValue={this.props.event.backgroundColor} />
                    <PopoverToolbar
                        enableSaveBtn={!!this.state.newEventData.title}
                        onSaveBtnClick={this.handleSaveBtnClick}
                        onCompleteBtnClick={this.handleCompleteBtnClick}
                        onOpenDocBtnClick={this.handleOpenDocBtnClick}
                        onDeleteDataBtnClick={this.onDeleteDataBtnClick}
                    />
                </div>
            </div>
        );
    }
}