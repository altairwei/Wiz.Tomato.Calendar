import React from 'react';
import { FormGroup, ControlLabel, Col, FormControl } from 'react-bootstrap';
import 'moment';
import 'bootstrap/js/collapse';
import 'bootstrap/js/transition';
import 'eonasdan-bootstrap-datetimepicker';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';

export default class DateTimeInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const dateValue = e.date.format('YYYY-MM-DD HH:mm:ss')
        this.setState({value: dateValue});
        // 传递
        this.props.onDateTimeChange(dateValue);
    }

    componentDidMount() {
        // 初始化组件
        if (this.props.readOnly) this.el.readOnly = true;
        this.$el = $(this.el).datetimepicker({
            showTodayButton: true,
            locale: 'zh-cn',
            format: 'YYYY-MM-DD HH:mm:ss'
        });
        this.$el.on("dp.change", this.handleChange)
        //
        this.instance = this.$el.data("DateTimePicker");
        // 初始化值
        this.instance.date(this.props.value);
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