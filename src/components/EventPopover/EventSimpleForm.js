import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Glyphicon } from 'react-bootstrap';
import DateTimePicker from '../Form/DateTimePicker';
import ColorPicker from '../Form/ColorPicker';

export default class EventSimpleForm extends React.Component {
    constructor(props) {
        super(props);
        //
        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleInputChange() {
        //TODO: 处理数据边跟
    }

    render() {
        return (
            <Form horizontal>
                <DateTimePicker readOnly id = 'tc-editpopper-eventdate' 
                    label={<i className='far fa-calendar-alt fa-lg' />}
                    value={this.props.eventStart.format('YYYY-MM-DD HH:mm:ss')}
                    onInputChange={this.handleInputChange}
                />
                <ColorPicker id = 'tc-editpopper-eventcolor' 
                    label={<i className='fas fa-paint-brush fa-lg' />}
                    value={this.props.colorValue}
                    onInputChange={this.handleInputChange}
                />
            </Form>
        )
    }

}