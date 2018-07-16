import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, ControlLabel, Col, FormControl } from 'react-bootstrap';
import 'moment';
import 'bootstrap/js/collapse';
import 'bootstrap/js/transition';
import 'eonasdan-bootstrap-datetimepicker';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';

export default class DateTimePicker extends React.Component {
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
        const isHorizontal = this.props.horizontal;
        const dateFormControl = (
            <FormControl type="text" 
                ref={(instance) => this.inputFormControl = instance}
                value={this.props.value}
                readOnly={this.props.readOnly}
                onChange={this.props.onInputChange}
            />
        )
        if (isHorizontal) {
            return (
                <FormGroup controlId={this.props.id}>
                    <Col componentClass={ControlLabel} sm={2}>
                        {this.props.label}
                    </Col>
                    <Col sm={10}>
                        {dateFormControl}
                    </Col>
                </FormGroup>
            )
        } else {
            return (
                <FormGroup controlId={this.props.id}>
                    <ControlLabel>{this.props.label}</ControlLabel>
                    {dateFormControl}
                </FormGroup>                
            )
        }

    }
}