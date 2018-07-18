import React from 'react';
import { Modal, Nav, NavItem, Tabs, Tab, Button, Row, Col, CloseButton } from 'react-bootstrap';
import EventDetailFrom from '../Form/EventDetailForm';
import moment from 'moment';

class NavHeader extends React.Component {
    //this.props.children 接受 <NavItem />
    render() {
        return (
            <Modal.Header
                style={{borderBottom: 'none', padding: '0'}}>
                <Nav bsStyle="tabs"
                    style={{padding: '15px 15px 0 15px'}}>
                    <CloseButton onClick={this.props.onModalClose} />
                    {this.props.children}
                </Nav>
            </Modal.Header>
        )
    }
}

class TabBody extends React.Component {
    //this.props.children 接受 <Tab.Pane />
    render() {
        return (
            <Modal.Body>
                <Tab.Content animation>
                    {this.props.children}
                </Tab.Content>
            </Modal.Body>            
        )
    }
}

class ToolbarFooter extends React.Component {
    render() {
        return (
            <Modal.Footer>
                {this.props.children}
            </Modal.Footer>
        )
    }
}

class EventModal extends React.Component {
    render() {
        let NavHeader, TabBody, ToolbarFooter;
        React.Children.forEach(this.props.children, (thisArg) => {
            const name = thisArg.type.name;
            if ( name == 'NavHeader' ) {
                NavHeader = thisArg;
            } else if ( name == 'TabBody' ) {
                TabBody = thisArg;
            } else if ( name == 'ToolbarFooter' ) {
                ToolbarFooter = thisArg;
            }
        })

        return (
            <Modal show={this.props.show} onHide={this.props.onModalClose}> 
                <Tab.Container id="tabs-with-dropdown" defaultActiveKey="1">
                    <Row className="clearfix">
                        <Col sm={12}>
                            { NavHeader }
                            { TabBody }
                        </Col>
                    </Row>
                </Tab.Container>
                { ToolbarFooter }
            </Modal>
        )
    }
}

EventModal.NavHeader = NavHeader;
EventModal.TabBody = TabBody;
EventModal.ToolbarFooter = ToolbarFooter;

export default EventModal;