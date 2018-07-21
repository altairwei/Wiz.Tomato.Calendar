function OnTomatoCalendarClicked() {
	var pluginPath = objApp.GetPluginPathByScriptFileName("TomatoCalendar_Global.js");
	objWindow.ViewHtml(`${pluginPath}dist/index.html`, true);
}

(function() {
    var pluginPath = objApp.GetPluginPathByScriptFileName("TomatoCalendar_Global.js");
    var languangeFileName = pluginPath + "plugin.ini";
	// 番茄日历
	var buttonText = objApp.LoadStringFromFile(languangeFileName, "strTomatoCalendar");
    window.OnTomatoCalendarClicked = OnTomatoCalendarClicked;
	objWindow.AddToolButton("main", "TomatoCalendar", buttonText, `${pluginPath}oldproject/icons/calendar.ico`, "OnTomatoCalendarClicked");
})()



window.testButton = function(){
    alert('hello')
}