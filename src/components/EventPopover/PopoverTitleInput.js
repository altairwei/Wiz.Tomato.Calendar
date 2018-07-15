import React from 'react';
import './PopoverTitleInput.css';

export default class EventTitleInput extends React.Component {

    constructor(props) {
        super(props);
        //初始化状态
        this.state = {
            eventTitle: this.props.eventTitle, //储存原始props.title
            value: this.props.eventTitle //储存受控input的值
        }
        //
        this.handleChange = this.handleChange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        /**
         * 如果用EventPopover的状态和句柄管理此组件的话，
         * 当父组件接受的props.event发生改变时，状态无法随之变化
         * 到时候依然要用到此静态方法来更具props更新状态。
         * 所以不如直接在input组件中应用此静态方法，
         * 以避免父组件重新渲染造成的动画效果
         */
        if ( props.eventTitle !== state.eventTitle ) {
            //当title发生变化时，重新初始化状态
            return {
                eventTitle: props.eventTitle,
                value: props.eventTitle
            };
        }

        return null;
    }

    handleChange(e) {
        //
        this.setState({value: e.target.value})
        //将事件传递上去
        this.props.onTitleChange(e);
    }

    render() {
        return (
            <input type="text" id="tc-editpopper-eventtitle" 
                htmlFor={this.props.targetForm}
                className='eventtitle'
                value={this.state.value}
                onChange={this.handleChange}
            />
        )
    }

}