import React from 'react';
import './EventTitleInput.css';

export default class EventTitleInput extends React.Component {

    render() {
        return (
            <input type = "text" id = "tc-editpopper-eventtitle" 
                className = 'eventtitle'
                value = {this.props.title} 
                onChange = {this.props.onTitleChange}
            />
        )
    }

}