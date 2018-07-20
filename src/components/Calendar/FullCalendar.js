import React from 'react';
import $ from "jquery";
import 'fullcalendar';
import 'moment';

class FullcalendarObjectMapper{
	constructor(){

	}

	getSettings(properties){
		let newSettings = {};
		for (const key in properties) {
      		if (properties.hasOwnProperty(key)) {
        		newSettings[key] = properties[key];
      		}
    	}
    	return newSettings;
	}
}

export default class FullCalendar extends React.Component{
	constructor(){
		super();
		this.jq = $.noConflict();
		this.fullcalendarObjectMapper = new FullcalendarObjectMapper();
		this.instance = null;
		this.date = new Date();
	}

	componentDidMount(){
		this.props.onFullCalendarRender(this.el);
		const objectMapperSettings = this.fullcalendarObjectMapper.getSettings(this.props);
		this.instance = this.jq(this.el).fullCalendar(objectMapperSettings);
	}

	render(){

		return (
			<div id='calendar' ref={ el => this.el = el }></div>
		)
	}
}