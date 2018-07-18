import React from 'react';
import { Row, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import TitleInputGroup from './TitleInputGroup';
import DateTimePickerGroup from './DateTimePickerGroup';
import ColorPickerGroup from './ColorPickerGroup';

export default class EventDetailForm extends React.Component {

    constructor(props) {
        super(props);
        //由父组件负责处理数据
    }

    render() {
        const handleTitleChange = this.props.onTitleChange;
        const handleStartChange = this.props.onStartChange;
        const handleEndChange = this.props.onEndChange;
        const handleColorChange = this.props.onColorchange;
        return (
            <Form>
                <TitleInputGroup 
                    autoFocus
                    controlId="tc-createpage-eventtitle"
                    value={this.props.eventTitle} 
                    onTitleChange={handleTitleChange}
                />
                <Row>
                    <Col sm={6}>
                        <DateTimePickerGroup 
                            controlId="tc-createpage-eventstart"
                            label="开始日期"
                            value={this.props.start}
                            onDateTimeChange={handleStartChange}  />
                    </Col>
                    <Col sm={6}>
                        <DateTimePickerGroup 
                            controlId="tc-createpage-eventend"
                            label="结束日期"
                            value={this.props.end}
                            onDateTimeChange={handleEndChange}  />
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <ColorPickerGroup 
                            controlId="tc-createpage-eventcolor"
                            label="色彩"
                            value={this.props.backgroundColor}
                            onColorChange={handleColorChange}
                        />
                    </Col>
                    <Col sm={6}>
                        <FormGroup controlId="tc-createpage-eventtags">
                            <ControlLabel>标签</ControlLabel>
                            <FormControl readOnly/>
                        </FormGroup>     
                    </Col>
                </Row>
                <FormGroup controlId="tc-createpage-eventremark">
                    <ControlLabel>备注</ControlLabel>
                    <FormControl readOnly componentClass="textarea" />
                </FormGroup>
            </Form>
        )
    }

}