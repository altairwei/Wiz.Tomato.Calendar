import React from 'react';
import Calendar from './components/Calendar/Calendar';
import EventPopover from './components/EventPopover/EventPopover';
import EventModal from './components/Modal/EventModal';
import EventCreateModal from './components/Modal/EventCreateModal';
import EventEditModal from './components/Modal/EventEditModal';

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
        this.handleCalendarRender = this.handleCalendarRender.bind(this);
        this.handleEventClick = this.handleEventClick.bind(this);
        this.handlePopoverHide = this.handlePopoverHide.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleEventEdit = this.handleEventEdit.bind(this);
    }

    handleCalendarRender(el) {
        this.calendar = el;
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
        const $calendar = $(this.calendar);
        $calendar.fullCalendar('unselect')
        //
        this.setState({
            isEditingEvent: false,
            isCreatingEvent: false
        });
    }

    render() {

        return (
            <div id='wiz-tomato-calendar' >
                <Calendar 
                    onEventClick={this.handleEventClick} 
                    onSelect={this.handleSelect}
                    onCalendarRender={this.handleCalendarRender}
                />
                {
                    !!this.state.selectedRange &&
                        <EventCreateModal 
                            key={'create' + this.state.selectedRange.jsEvent.pageX}
                            show={this.state.isCreatingEvent}
                            onModalClose={this.handleModalClose}
                            isCreatingEvent={this.state.isCreatingEvent}
                            selectedRange={this.state.selectedRange}
                        />
                }
                {
                    !!this.state.editingEvent && 
                        <EventEditModal 
                            key={'edit' + this.state.editingEvent.id}
                            show={this.state.isEditingEvent}
                            onModalClose={this.handleModalClose}
                            editingEvent={this.state.editingEvent}
                        />
                }
                {
                    !!this.state.isShowingEvent && 
                        <EventPopover 
                            key={'popover' + this.state.clickedArgs.event.id}
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