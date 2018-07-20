import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import {SelectPicker} from './SelectPickerGroup';
import AutoFormGroup from  './AutoFormGroup';

export default class EventRepeatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rptRule: this.props.rptRule,
            disableWeekSelect: true
        }
        this.handleRptBaseRuleChange = this.handleRptBaseRuleChange.bind(this);
        this.handleWeekDayChange = this.handleWeekDayChange.bind(this);
    }

    handleRptBaseRuleChange(newSelection) {
        switch(newSelection) {
            case 'EveryWeek':
            case 'Every2Week':
                this.setState({
                    disableWeekSelect: false
                })
                break;
            default:
                this.setState({
                    disableWeekSelect: true
                })
                break
        }
    }

    handleWeekDayChange(newSelection) {
        console.log(newSelection)
    }

    render() {
        const { horizontal, controlId, label } = this.props;
        return (
            <AutoFormGroup {...{ horizontal, controlId, label }}>
                <Row>
                    <Col sm={4}>
                        <SelectPicker
                            title="请选择重复规则"
                            value="Weekly"
                            width="auto"
                            onSelectionChange={this.handleRptBaseRuleChange}
                        >
                            <option value="none">不重复</option>
                            <optgroup label="简单规则">
                                <option value="Daily">每日</option>
                                <option value="Weekly">每周</option>
                                <option value="Monthly">每月</option>
                                <option value="Yearly">每年</option>
                            </optgroup>
                            <optgroup label="复合规则">
                                <option value="EveryWeek">每一个星期几</option>
                                <option value="Every2Week">每两个星期几</option>
                                <option value="EveryWeekday">每个工作日</option>
                            </optgroup>
                        </SelectPicker>
                    </Col>
                    <Col sm={8}>
                        <SelectPicker
                            multiple
                            width="80%"
                            disabled={this.state.disableWeekSelect}
                            title="选择重复的星期"
                            onSelectionChange={this.handleWeekDayChange}
                        >
                            <option value="1">星期一</option>
                            <option value="2">星期二</option>
                            <option value="3">星期三</option>
                            <option value="4">星期四</option>
                            <option value="5">星期五</option>
                            <option value="6">星期六</option>
                            <option value="7">星期日</option>
                        </SelectPicker>
                    </Col>
                </Row>
            </AutoFormGroup>      
        )
    }
}