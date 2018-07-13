import React from 'react';
import $ from "jquery";
import fullCalendar from "fullcalendar";
import moment from 'moment';

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
		this.root = null;
		this.instance = null;
		this.date = new Date();
	}

	componentDidMount(){
		const objectMapperSettings = this.fullcalendarObjectMapper.getSettings(this.props);
		this.instance = this.jq(`#${this.root}`).fullCalendar(objectMapperSettings);
	}

  	componentWillReceiveProps(nextProps){
  		this.jq(`#${this.root}`).fullCalendar('destroy');
  		const objectMapperSettings = this.fullcalendarObjectMapper.getSettings(nextProps);
    	this.instance = this.jq(`#${this.root}`).fullCalendar(objectMapperSettings);
  	}

	render(){
		this.root = this.props.id || 'ID' + this.date.getTime(); 
		return(
			<div id={this.root}></div>
		)
	}
}