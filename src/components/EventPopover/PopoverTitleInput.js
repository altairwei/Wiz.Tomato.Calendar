import React from 'react';
import './PopoverTitleInput.css';

export default class EventTitleInput extends React.Component {

    constructor(props) {
        super(props);
        //初始化状态
        this.state = {
            value: this.props.eventTitle
        }
        //
        this.handleChange = this.handleChange.bind(this);
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