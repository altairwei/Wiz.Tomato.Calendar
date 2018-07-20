import React from 'react';
import { NavItem, Tab, Button } from 'react-bootstrap';
import EventDetailFrom from '../Form/EventDetailForm';
import EventRepeatForm from '../Form/EventRepeatForm';
import EventModal from './EventModal';
import moment from 'moment';

export default class EventCreateModal extends React.Component {

    constructor(props) {
        super(props);
        //
        this.state = {
            title: '',
            start: this.props.selectedRange.start.format('YYYY-MM-DD HH:mm:ss'),
            end: this.props.selectedRange.end.format('YYYY-MM-DD HH:mm:ss'),
            backgroundColor: ''
        }
        //
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleEventCreate = this.handleEventCreate.bind(this);
        //
        this.handleRptBaseRuleChange = this.handleRptBaseRuleChange.bind(this);
    }

    handleTitleChange(newTitle) {
        this.setState({
            title: newTitle
        })
    }

    handleStartChange(newDateValue) {
        this.setState({
            start: newDateValue
        })
    }

    handleEndChange(newDateValue) {
        this.setState({
            end: newDateValue
        })
    }

    handleColorChange(newColorValue) {
        this.setState({
            backgroundColor: newColorValue
        })
    }

    handleRptBaseRuleChange(newRptBaseRule) {
        console.log(newRptBaseRule)
    }    

    handleEventCreate() {
        // 打包数据
        const eventData = $.extend({}, this.state);
        this.props.onEventCreate(eventData);
        //
        this.props.onModalClose();
    }

    render() {
        const { show, onModalClose } = this.props;
        return ( 
            <EventModal {...{show, onModalClose}}>
                <EventModal.NavHeader {...{onModalClose}}>
                    <NavItem eventKey="1" >
                        日程编辑
                    </NavItem>
                    <NavItem eventKey="2" >
                        重复规则
                    </NavItem>
                </EventModal.NavHeader>
                <EventModal.TabBody>
                    <Tab.Pane eventKey="1">
                        <EventDetailFrom 
                            eventTitle={this.state.title}
                            start={this.state.start}
                            end={this.state.end}
                            backgroundColor={this.state.backgroundColor}
                            //事件句柄
                            onTitleChange={this.handleTitleChange}
                            onStartChange={this.handleStartChange}
                            onEndChange={this.handleEndChange}
                            onColorchange={this.handleColorChange}
                        />
                    </Tab.Pane>
                    <Tab.Pane eventKey="2">
                        <EventRepeatForm 
                            rptBaseRule='Weekly'
                            onRptBaseRuleChange={this.handleRptBaseRuleChange}    
                        />
                    </Tab.Pane>
                </EventModal.TabBody>
                <EventModal.ToolbarFooter>
                    <Button 
                        bsStyle="success"
                        onClick={this.handleEventCreate}
                    >
                        创建
                    </Button>
                    <Button onClick={this.props.onModalClose}>
                        取消
                    </Button>
                </EventModal.ToolbarFooter>
            </EventModal>
        )
    }
}