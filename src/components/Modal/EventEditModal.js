import React from 'react';
import { NavItem, Tab, Button, ButtonGroup, SplitButton, MenuItem, Row, Col } from 'react-bootstrap';
import EventDetailFrom from '../Form/EventDetailForm';
import EventModal from './EventModal'
import moment from 'moment';
import EventHandles from '../../models/EventHandles';

class ModalToolbar extends React.Component {

    render() {
        return (
            <Row>
                <Col sm={7} style={{textAlign: 'left'}}>
                    <ButtonGroup>
                        <Button id='tc-editpage-Save' 
                            bsStyle="danger"
                            onClick={this.props.onBtnClick}
                            disabled={!this.props.enableSaveBtn}>
                            保存
                        </Button>
                        <Button id='tc-editpage-Complete'
                            onClick={this.props.onBtnClick}>
                            {parseInt(this.props.complete) == 5 ? '恢复' : '完成'}
                        </Button>
                        <Button 
                            id='tc-editpage-DeleteData'
                            onClick={this.props.onBtnClick}>
                            删除
                        </Button>
                        <SplitButton pullRight 
                            title='删除源文档' 
                            id='tc-editpage-DeleteDoc' 
                            onClick={this.props.onBtnClick}>
                            <MenuItem 
                                eventKey="1" 
                                id='tc-editpage-OpenDoc'
                                onClick={this.props.onBtnClick}>
                                打开源文档
                            </MenuItem>
                            <MenuItem 
                                eventKey="2" 
                                id='tc-editpage-openEventDoc'
                                onClick={this.props.onBtnClick}>
                                编辑源数据
                            </MenuItem>
                        </SplitButton>                                
                    </ButtonGroup>
                </Col>
                <Col sm={2} smOffset={3}>
                    <Button onClick={this.props.onModalClose}>
                        取消
                    </Button>
                </Col>
            </Row>
        )
    }

}

export default class EventEditModal extends React.Component {
    constructor(props) {
        super(props);
        this.eventHandles = new EventHandles();
        //
        this.state = {
            newEventData: {}
        }
        //
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
    }

    handleTitleChange(newTitle) {
        this.setState(function(prevState, props) {
            const newEventData = $.extend({}, prevState.newEventData)
            newEventData.title = newTitle;
            return { newEventData };
        })
    }

    handleStartChange(newDateValue) {
        this.setState(function(prevState, props) {
            const newEventData = $.extend({}, prevState.newEventData)
            newEventData.start = newDateValue;
            return { newEventData };
        })
    }

    handleEndChange(newDateValue) {
        this.setState(function(prevState, props) {
            const newEventData = $.extend({}, prevState.newEventData)
            newEventData.end = newDateValue;
            return { newEventData };
        })
    }

    handleColorChange(newColorValue) {
        this.setState(function(prevState, props) {
            const newEventData = $.extend({}, prevState.newEventData)
            newEventData.backgroundColor = newColorValue;
            return { newEventData };
        })
    }

    handleBtnClick(e) {
        //
        const newEventData = $.extend({}, this.state.newEventData)
        //
        const id = e.target.id;
        const btnType = id.split('-')[2];
        const handleName = `on${btnType}BtnClick`;
        this.eventHandles[handleName](this.props.editingEvent, newEventData)
        //
        this.props.onModalClose();
    }

    render() {
        const { show, onModalClose } = this.props;
        const event = this.props.editingEvent;
        const enableSaveBtn = !$.isEmptyObject(this.state.newEventData);
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
                            //传入日程属性
                            key={'edit' + event.id}
                            eventTitle={event.title}
                            start={event.start.format('YYYY-MM-DD HH:mm:ss')}
                            end={event.end.format('YYYY-MM-DD HH:mm:ss')}
                            backgroundColor={event.backgroundColor}
                            complete={event.complete}
                            //事件句柄
                            onTitleChange={this.handleTitleChange}
                            onStartChange={this.handleStartChange}
                            onEndChange={this.handleEndChange}
                            onColorchange={this.handleColorChange}
                        />
                    </Tab.Pane>
                    <Tab.Pane eventKey="2">Tab 1 content</Tab.Pane>
                </EventModal.TabBody>
                <EventModal.ToolbarFooter>
                    <ModalToolbar
                        enableSaveBtn={enableSaveBtn}
                        complete={this.state.complete}
                        onBtnClick={this.handleBtnClick}/>
                </EventModal.ToolbarFooter>
            </EventModal>
        )
    }    
}