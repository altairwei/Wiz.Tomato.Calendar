import React from 'react';
import { Modal, Nav, NavItem, Tabs, Tab, Button, Row, Col, CloseButton } from 'react-bootstrap';
import EventDetailFrom from '../Form/EventDetailForm';
import EventModal from './EventModal'
import moment from 'moment';

export default class EventCreateModal extends React.Component {

    constructor(props) {
        super(props);
        //
        //
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    handleTitleChange(newTitle) {
        console.log(newTitle);
    }

    handleStartChange(newDateValue) {
        console.log(newDateValue)
    }

    handleEndChange(newDateValue) {
        console.log(newDateValue)
    }

    handleColorChange(newColorValue) {
        console.log(newColorValue)
    }

    render() {
        const selectedRange = this.props.selectedRange;
        return (
            <EventModal {...this.props}>
                <EventModal.NavHeader {...this.props}>
                    <NavItem eventKey="1" href="#tc-repeatform">
                        日程编辑
                    </NavItem>
                    <NavItem eventKey="2" href="#tc-repeatform">
                        重复规则
                    </NavItem>
                </EventModal.NavHeader>
                <EventModal.TabBody {...this.props}>
                    <Tab.Pane eventKey="1">
                        <EventDetailFrom 
                            key={new Date().toISOString()} //每次select都重新渲染
                            eventTitle=""
                            start={selectedRange.start.format('YYYY-MM-DD HH:mm:ss')}
                            end={selectedRange.end.format('YYYY-MM-DD HH:mm:ss')}
                            onTitleChange={this.handleTitleChange}
                            onStartChange={this.handleStartChange}
                            onEndChange={this.handleEndChange}
                            onColorchange={this.handleColorChange}
                        />
                    </Tab.Pane>
                    <Tab.Pane eventKey="2">Tab 1 content</Tab.Pane>
                </EventModal.TabBody>
                <EventModal.ToolbarFooter>
                    这里是toolbar
                </EventModal.ToolbarFooter>
            </EventModal>
        )
    }
}