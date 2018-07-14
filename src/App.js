import React from 'react';
import Calendar from './components/Calendar/Calendar';
import EventPopover from './components/EventPopover/EventPopover';
import { WizAlert } from './utils/WizInterface'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedEvent: null
        }
        this.handleEventClick = this.handleEventClick.bind(this);
    }

    handleEventClick( event, jsEvent, view ) {
        //console.log(event.title, event, jsEvent, view)
        this.setState({
            clickedEventArgs: { event, jsEvent, view }
        })
    }

    render() {
        return (
            <div id='wiz-tomato-calendar' >
                <Calendar onEventClick = {this.handleEventClick} />
                {
                    this.state.clickedEventArgs && 
                        <EventPopover
                            event = {this.state.clickedEventArgs.event} 
                            reference = {this.state.clickedEventArgs.jsEvent.target} 
                        /> 
                }
            </div>
        );
    }
}