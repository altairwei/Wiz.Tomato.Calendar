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
        //TODO: 读取父元素horizontal属性，决定条件渲染
        return (
            <FormGroup controlId={this.props.id}>
                <Col componentClass={ControlLabel} sm={2}>
                    {this.props.label}
                </Col>
                <Col sm={10}>
                    <FormControl type="text" 
                        ref={(instance) => this.inputFormControl = instance}
                        value={this.props.value}
                        readOnly={this.props.readOnly}
                        onChange={this.props.onInputChange}
                    />
                </Col>
            </FormGroup>
        )
    }
}