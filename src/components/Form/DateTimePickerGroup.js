import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, ControlLabel, Col, FormControl } from 'react-bootstrap';
import AutoFormGroup from './AutoFormGroup';
import DateTimeInput from './DateTimeInput';

export default class DateTimePickerGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // 初始化组件
        this.input = ReactDOM.findDOMNode(this.inputFormControl);
        $(this.input).datetimepicker({
            format: 'YYYY-MM-DD HH:mm:ss'
        });
    }

    render() {
        return (
            <AutoFormGroup {...this.props}>
                <DateTimeInput {...this.props} />
            </AutoFormGroup>            
        )

    }
}