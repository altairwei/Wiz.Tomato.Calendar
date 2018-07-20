import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import SelectPickerGroup from './SelectPickerGroup';
import WeekCheckboxGroup from './WeekCheckboxGroup';

export default function EventRepeatForm(props) {
    
    return (
        <Form horizontal>
            <SelectPickerGroup horizontal
                controlId="tc-rptRule"
                label="重复规则"
                value={props.rptBaseRule}
                onSelectionChange={props.onRptBaseRuleChange}
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
            </SelectPickerGroup>
            <WeekCheckboxGroup horizontal
                label="重复星期"
                value="135"
            />
        </Form>
    )
}