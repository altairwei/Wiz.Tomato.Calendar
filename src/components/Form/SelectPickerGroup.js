import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import AutoFormGroup from './AutoFormGroup';
import 'bootstrap/js/dropdown';
import 'bootstrap-select';
import 'bootstrap-select/dist/css/bootstrap-select.css'

export class SelectPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, clickedIndex, newValue, oldValue) { 
        const newSelection = this.$el.find('option').eq(clickedIndex).val();
        this.setState({value: newSelection});
        // 传递
        this.props.onSelectionChange(newSelection);
    }

    componentDidMount() {
        const { title = '', width = false, multiple, disabled } = this.props
        // 初始化组件
        this.$el = $(this.el);
        this.$el.val(this.props.value);
        this.$el.prop('title', title);
        this.$el.prop('multiple', multiple);
        this.$el.prop('disabled', disabled);
        this.$el.selectpicker({
            style: 'btn-default',
            width
        });
        //
        this.instance = this.$el.data('selectpicker');
        // 绑定change事件
        this.$el.on("changed.bs.select", this.handleChange);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {disabled} = this.props;
        this.$el.prop('disabled', disabled);
        if (disabled) {
            this.$el.val('')
        }
        this.$el.selectpicker('refresh');

    }

    componentWillUnmount() {
        // destroy
        this.instance.destroy();
        this.$el.off("changed.bs.select", this.handleChange);
    }

    render() {
        return (
            <div>
                <select ref={el => this.el = el}>
                    {this.props.children}
                </select>
            </div>
            
        )
    }   
}

export default function SelectPickerGroup(props) {
    const { horizontal, controlId, label } = props;
    return (
        <AutoFormGroup {...{ horizontal, controlId, label }}>
            <SelectPicker {...props} >
                {props.children}
            </SelectPicker>
        </AutoFormGroup>      
    )
}