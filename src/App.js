import React from 'react';
import Calendar from './components/Calendar/Calendar';
import EventPopover from './components/EventPopover/EventPopover';
import EventModal from './components/Modal/EventModal'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingEvent: false,
            isEditingEvent: false,
            isCreatingEvent: false,
            clickedArgs: null,
            editingEvent: null,
            selectedRange: null
        }
        this.handleEventClick = this.handleEventClick.bind(this);
        this.handlePopoverHide = this.handlePopoverHide.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleEventEdit = this.handleEventEdit.bind(this);
    }

    handleEventClick( event, jsEvent, view ) {
        this.setState({
            isShowingEvent: true,
            clickedArgs: { event, jsEvent, view }
        })
    }

    handlePopoverHide() {
        this.setState({
            isShowingEvent: false
        })
    }

    handleSelect( start, end, jsEvent, view ) {
        this.setState({
            isCreatingEvent: true,
            selectedRange: {start, end, jsEvent, view}
        })
    }

    handleEventEdit(event) {
        this.setState({
            isEditingEvent: true,
            editingEvent: event
        })        
    }

    handleModalClose() {
        //TODO: 触发fullcalendar unselect
        this.setState({
            isEditingEvent: false,
            isCreatingEvent: false
        });
    }

    render() {
        const shouldShow = this.state.isEditingEvent || this.state.isCreatingEvent;
        return (
            <div id='wiz-tomato-calendar' >
                <Calendar key={1} onEventClick = {this.handleEventClick} onSelect={this.handleSelect}/>
                <EventModal 
                    show={shouldShow} 
                    onModalClose={this.handleModalClose}
                />
                {
                    this.state.isShowingEvent && 
                        <EventPopover 
                            onPopoverHide={this.handlePopoverHide}
                            key={this.state.clickedArgs.event.id}
                            event = {this.state.clickedArgs.event} 
                            reference = {this.state.clickedArgs.jsEvent.target} 
                            onEditBtnClick={this.handleEventEdit}
                        /> 
                }
            </div>
        );
    }
}