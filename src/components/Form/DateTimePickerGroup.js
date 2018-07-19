import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, ControlLabel, Col, FormControl } from 'react-bootstrap';
import AutoFormGroup from './AutoFormGroup';
import 'moment';
import 'bootstrap/js/collapse';
import 'bootstrap/js/transition';
import 'eonasdan-bootstrap-datetimepicker';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';

class DateTimeInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) { 
        const newDateValue = e.date.format('YYYY-MM-DD HH:mm:ss')
        this.setState({value: newDateValue});
        // 传递
        this.props.onDateTimeChange(newDateValue);
    }

    componentDidMount() {
        // 初始化组件
        if (this.props.readOnly) this.el.readOnly = true;
        this.$el = $(this.el).datetimepicker({
            showTodayButton: true,
            locale: 'zh-cn',
            format: 'YYYY-MM-DD HH:mm:ss'
        });
        //
        this.instance = this.$el.data("DateTimePicker");
        // 初始化值
        this.instance.date(this.props.value);
        // 绑定change事件
        // 放在初始化后进行绑定，避免初始化过程触发change事件
        this.$el.on("dp.change", this.handleChange);
    }

    componentDidUpdate(prevProps) {
        // 手动更新value
        this.instance.date(this.state.value);
    }

    componentWillUnmount() {
        // destroy
        this.instance.destroy();
        this.$el.off("dp.change", this.handleChange);
    }

    render() {

        return (
            <input type='text' 
                className='form-control' 
                ref={el => this.el = el}
            />
        )

    }
}

export default class DateTimePickerGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { horizontal, controlId, label} = this.props;
        return (
            <AutoFormGroup {...{ horizontal, controlId, label }}>
                <DateTimeInput {...this.props} />
            </AutoFormGroup>            
        )

    }
}