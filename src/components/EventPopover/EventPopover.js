import React from 'react';
import './EventPopover.css';
import Popper from 'popper.js';
import PopoverTitleInput from './PopoverTitleInput';
import PopoverToolbar from './PopoverToolbar';
import EventHandles from '../../models/EventHandles';
import { Form, Glyphicon } from 'react-bootstrap';
import DateTimePickerGroup from '../Form/DateTimePickerGroup';
import ColorPickerGroup from '../Form/ColorPickerGroup';

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
        this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
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
            $(that.popperNode).hide(0, null, function(){
                that.props.onPopoverHide(); //TODO: 交由父元素卸载该组件实例，感觉这里不妥
                resolve();
            });
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

    handleColorChange(colorValue) {
        const newColor = colorValue;
        this.setState(function(prevState, props) {
            //拷贝前一个对象
            const newEventData = Object.create(prevState.newEventData);
            newEventData.backgroundColor = newColor;
            return { newEventData };
        })
    }

    handleDateTimeChange(e) {
        //暂时不允许更改
    }

    handleBtnClick(e) {
        const id = e.target.id;
        const btnType = id.split('-')[2];
        const handleName = `on${btnType}BtnClick`
        this.hide().then( (ret) => {
            switch(handleName) {
                case 'onEditBtnClick':
                    this.props.onEditBtnClick(this.props.event); //交由父元素
                    break;
                default:
                    this.eventHandles[handleName](this.props.event, this.state.newEventData)
                    break;
            }
            
        })
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

    componentWillUnmount() {
        $(document).off('click', this.autoHide);
        this.popperInstance.destroy();
    }

    render() {
        const eventStart = this.props.event.start.format('YYYY-MM-DD HH:mm:ss');
        const colorValue = this.props.event.backgroundColor;
        const enableSaveBtn = !!this.state.newEventData.title || !!this.state.newEventData.backgroundColor;
        return (
            <div className="tc-popover"
                    style={{display: 'none'}}
                    ref={(div) => this.popperNode = div} >
                <div className="arrow"></div>
                <div className="tc-popover-header">
                    <PopoverTitleInput 
                        key={this.props.event.id}
                        eventTitle={this.props.event.title}
                        onTitleChange={this.handleTitleChange} 
                        targetForm='tc-popover-event-editForm' />
                </div>
                <div className="tc-popover-body">
                    <Form horizontal id='tc-popover-event-editForm'>
                        <DateTimePickerGroup horizontal readOnly id = 'tc-editpopper-eventdate' 
                            label={<i className='far fa-calendar-alt fa-lg' />}
                            value={eventStart}
                            onDateTimeChange={this.handleDateTimeChange}
                        />
                        <ColorPickerGroup horizontal 
                            key={this.props.event.id}
                            id='tc-editpopper-eventcolor' 
                            label={<i className='fas fa-paint-brush fa-lg' />}
                            value={colorValue}
                            onColorChange={this.handleColorChange}
                        />
                    </Form>
                    <PopoverToolbar
                        complete={this.props.event.complete}
                        enableSaveBtn={enableSaveBtn}
                        onBtnClick={this.handleBtnClick}
                    />
                </div>
            </div>
        );
    }
}