import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import {SelectPicker} from './SelectPickerGroup';
import AutoFormGroup from  './AutoFormGroup';

export default class EventRepeatForm extends React.Component {
    constructor(props) {
        super(props);
        const rptRuleComps = this.splitRptRule(this.props.rptRule);
        this.state = {
            rptRule: this.props.rptRule,
            rptBaseRule: '',
            rptWeekdays: [],
            disableWeekdaySelect: true,
            disabledOptions: []
        }
        $.extend(this.state, rptRuleComps);
        //
        this.handleRptBaseRuleChange = this.handleRptBaseRuleChange.bind(this);
        this.handleWeekdayChange = this.handleWeekdayChange.bind(this);
    }

    splitRptRule(rptRule) {
		let regex, rptRuleComps;
		if ( (regex = /^Every(\d)?Weeks?(\d*)$/).test(rptRule) ) {
			// 每[1234]周[7123456]
			const results = regex.exec(rptRule);
			const interWeek = results[1];
			const weekdays = results[2].split('');
            rptRuleComps = {
                rptBaseRule: `Every${interWeek}Week`,
                rptWeekdays: weekdays,
                disableWeekdaySelect: false
            }
		} else if ( (regex = /^EveryWeekday(\d*)$/).test(rptRule) ) {
			// 每个工作日EveryWeekday135
			const results = regex.exec(rptRule);
			const weekdays = results[1] || '12345';
            rptRuleComps = {
                rptBaseRule: `EveryWeekday`,
                rptWeekdays: weekdays,
                disableWeekdaySelect: false,
                disabledOptions: [6, 7]
            }
		} else if ( (regex = /Daily|Weekly|Monthly|Yearly/).test(rptRule) ) {
			// Daily|Weekly|Monthly|Yearly
			const perRule = regex.exec(rptRule)[0]
            rptRuleComps = {
                rptBaseRule: perRule,
                rptWeekdays: [],
                disableWeekdaySelect: true,
            }
		} else {
            rptRuleComps = {
                rptBaseRule: 'none',
                rptWeekdays: [],
                disableWeekdaySelect: true,
            }
        }

		return rptRuleComps;
    }

    handleRptBaseRuleChange(newSelection) {
        switch(newSelection) {
            case 'EveryWeek':
            case 'Every2Week':
                this.setState({
                    rptBaseRule: newSelection,
                    disableWeekdaySelect: false,
                    disabledOptions: []
                })
                break;
            case 'EveryWeekday':
                this.setState({
                    rptBaseRule: newSelection,
                    disableWeekdaySelect: false,
                    disabledOptions: [6, 7]
                })
                break;
            default:
                this.setState({
                    rptBaseRule: newSelection,
                    disableWeekdaySelect: true
                })
                break
        }
        const newRptRule = newSelection;
        this.props.onRptRuleChange(newRptRule);
    }

    handleWeekdayChange(newSelection) {
        this.setState({
            rptWeekdays: newSelection,
        })
        const newRptRule = this.state.rptBaseRule + newSelection.join('');
        this.props.onRptRuleChange(newRptRule)
    }

    render() {
        const { horizontal, controlId, label } = this.props;
        return (
            <AutoFormGroup {...{ horizontal, controlId, label }}>
                <Row>
                    <Col sm={4}>
                        <SelectPicker
                            title="请选择重复规则"
                            value={this.state.rptBaseRule}
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
                                <option value="EveryWeek">每一个星期</option>
                                <option value="Every2Week">每两个星期</option>
                                <option value="EveryWeekday">每个工作日</option>
                            </optgroup>
                        </SelectPicker>
                    </Col>
                    <Col sm={8}>
                        <SelectPicker
                            multiple
                            title="选择重复的星期"
                            width="80%"
                            value={this.state.rptWeekdays}
                            disabled={this.state.disableWeekdaySelect}
                            disabledOptions={this.state.disabledOptions}
                            onSelectionChange={this.handleWeekdayChange}
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