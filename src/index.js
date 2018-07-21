import React from 'react';
import ReactDOM from 'react-dom';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App';
import './index.css';
import { WizExplorerWindow as objWindow, WizExplorerApp as objApp } from './utils/WizInterface'

ReactDOM.render(<App />, document.getElementById('root'));


const moment = require("moment/moment");
const momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);
var pluginPath = objApp.GetPluginPathByScriptFileName("TomatoCalendar_Global.js");

class Clock {
    constructor(event) {
        this.tomatoClock = moment.duration(25, 'minutes');
        objWindow.AddToolButtonEx("document", "TomatoClock", '25:00', '', '', "/ShowText=1 ");
		//objWindow.AddToolButton("main", "TomatoClock", '25:00', "", "");
        //
        this.tick = this.tick.bind(this);
    }

    startTomatoClock() {
        this.tomatoClockTimer = setInterval(this.tick, 1000)
    }

    tick() {
        const now = this.tomatoClock.subtract(1000, 'milliseconds').format('mm:ss');
		console.log(now);
        objWindow.UpdateToolButton("document", "TomatoClock", "/ButtonText=" + now, '');
		//objWindow.RemoveToolButton("main", "TomatoClock");
		//objWindow.AddToolButton("main", "TomatoClock", now, "", "");
    }
}

//new Clock().startTomatoClock();
