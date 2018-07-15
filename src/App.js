import React from 'react';
import Calendar from './components/Calendar/Calendar';
import EventPopover from './components/EventPopover/EventPopover';
import EventModal from './components/Modal/EventModal'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedEvent: null
        }
        this.handleEventClick = this.handleEventClick.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    handleEventClick( event, jsEvent, view ) {
        //console.log(event.title, event, jsEvent, view)
        this.setState({
            clickedEventArgs: { event, jsEvent, view }
        })
    }

    handleSelect( start, end, jsEvent, view ) {
        this.setState({
            show: true
        })        
    }

    handleModalClose() {
        this.setState({ 
            show: false 
        });
    }

    render() {
        return (
            <div id='wiz-tomato-calendar' >
                <Calendar onEventClick = {this.handleEventClick} onSelect={this.handleSelect}/>
                {
                    this.state.clickedEventArgs && 
                        <EventPopover
                            event = {this.state.clickedEventArgs.event} 
                            reference = {this.state.clickedEventArgs.jsEvent.target} 
                        /> 
                }
                {
                    <EventModal show={this.state.show} onModalClose={this.handleModalClose}/>
                }
            </div>
        );
    }
}