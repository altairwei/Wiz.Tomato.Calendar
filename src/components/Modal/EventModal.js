import React from 'react';
import { Modal, Nav, NavItem, Tabs, Tab, Button, Row, Col, CloseButton } from 'react-bootstrap';

export default class EventPopover extends React.Component {

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onModalClose}>
                <Tab.Container id="tabs-with-dropdown" defaultActiveKey="1">
                    <Row className="clearfix">
                        <Col sm={12}>
                            <Modal.Header
                                style={{borderBottom: 'none', padding: '0'}}>
                                <Nav bsStyle="tabs"
                                    style={{padding: '15px 15px 0 15px'}}>
                                    <CloseButton
                                        label={true}
                                        onClick={this.props.onModalClose}
                                    />
                                    <NavItem eventKey="1" href="#tc-repeatform">
                                        日程编辑
                                    </NavItem>
                                    <NavItem eventKey="2" href="#tc-repeatform">
                                        重复规则
                                    </NavItem>
                                </Nav>                    
                            </Modal.Header>
                            <Modal.Body>
                                <Tab.Content animation>
                                    <Tab.Pane eventKey="1">
                                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                                        ac consectetur ac, vestibulum at eros.
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="2">
                                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                                        cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
                                        dui. Donec ullamcorper nulla non metus auctor fringilla.
                                    </Tab.Pane>
                                </Tab.Content>
                            </Modal.Body>
                        </Col>
                    </Row>
                </Tab.Container>
                <Modal.Footer>
                    <Button >这是一个按钮</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}