import React from 'react';
import ReactDOM from 'react-dom';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App';
import './index.css';
import QWebChannel from './utils/WizWebChannel'

new QWebChannel(qt.webChannelTransport, async function (channel) {
	// init WizNotePlus APIs
    const objectNames = ["WizExplorerApp", "JSPluginSpec", "JSPluginModuleSpec"];
    for (let i = 0; i < objectNames.length; i++) {
        const key = objectNames[i];
        window[key] = channel.objects[key];
	}
	window.objApp = WizExplorerApp;
	window.objWindow = WizExplorerApp.Window;
	window.objCommon = WizExplorerApp.CommonUI;
	window.objDatabase = await WizExplorerApp.DatabaseManager.Database();
	//
	ReactDOM.render(<App />, document.getElementById('root'));
})

