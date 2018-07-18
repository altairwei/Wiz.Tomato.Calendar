import React from 'react';
import Calendar from './components/Calendar/Calendar';
import EventPopover from './components/EventPopover/EventPopover';
import EventModal from './components/Modal/EventModal';
import EventCreatModal from './components/Modal/EventCreateModal'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        //
        this.state = {
            isShowingEvent: false,
            isEditingEvent: false,
            isCreatingEvent: false,
            clickedArgs: null,
            editingEvent: null,
            selectedRange: null
        }
        //
        this.handleEventClick = this.handleEventClick.bind(this);
        this.handlePopoverHide = this.handlePopoverHide.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleEventEdit = this.handleEventEdit.bind(this);
    }

    handleEventClick( event, jsEvent, view ) {
        const args = { event, jsEvent, view }
        this.setState({
            isShowingEvent: true,
            clickedArgs: args
        })
    }

    handlePopoverHide() {
        //每次出现都渲染一个新的Popover
        this.setState({
            isShowingEvent: false
        })
    }

    handleSelect( start, end, jsEvent, view ) {
        const args = {start, end, jsEvent, view};
        this.setState({
            isCreatingEvent: true,
            selectedRange: args
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
        return (
            <div id='wiz-tomato-calendar' >
                <Calendar key={1} onEventClick = {this.handleEventClick} onSelect={this.handleSelect}/>
                {
                    !!this.state.selectedRange &&
                        <EventCreatModal 
                            show={this.state.isCreatingEvent}
                            onModalClose={this.handleModalClose}
                            isCreatingEvent={this.state.isCreatingEvent}
                            selectedRange={this.state.selectedRange}
                        />
                }
                {
                    this.state.isShowingEvent && 
                        <EventPopover 
                            key={this.state.clickedArgs.event.id}
                            event={this.state.clickedArgs.event}
                            reference={this.state.clickedArgs.jsEvent.target}
                            onEditBtnClick={this.handleEventEdit}
                            onPopoverHide={this.handlePopoverHide}
                        /> 
                }
            </div>
        );
    }
}