import React from 'react';
import { Row, Col, Form, FormGroup, ControlLabel } from 'react-bootstrap';
import TitleInputGroup from './TitleInputGroup';
import DateTimePickerGroup from './DateTimePickerGroup'

export default class EventDetailForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.title
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {

    }

    render() {
        return (
            <Form>
                <TitleInputGroup id="tc-editpage-eventtitle"/>
                <Row>
                    <Col sm={6}>
                        <DateTimePickerGroup 
                            label="开始日期"
                            value="2018-07-17 09:00:00" 
                            onDateTimeChange={() => {}}  />
                    </Col>
                    <Col sm={6}>
                        <DateTimePickerGroup 
                            label="结束日期"
                            value="2018-07-17 09:00:00" 
                            onDateTimeChange={() => {}}  />
                    </Col>
                </Row>
            </Form>
        )
    }

}