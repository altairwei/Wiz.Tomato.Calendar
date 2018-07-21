import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import RepeatRuleSelectGroup from './RepeatRuleSelectGroup';

export default function EventRepeatForm(props) {
    
    return (
        <Form horizontal>
            <RepeatRuleSelectGroup horizontal
                label="重复规则"
                rptRule={props.rptRule}
                onRptRuleChange={props.onRptRuleChange}
            />
        </Form>
    )
}