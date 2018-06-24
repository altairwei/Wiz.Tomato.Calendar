function OnTomatoCalendarClicked() {
	var pluginPath = objApp.GetPluginPathByScriptFileName("tc_global.js");
	objWindow.ViewHtml(`${pluginPath}dist/index.html`, true);
}

(function() {
    var pluginPath = objApp.GetPluginPathByScriptFileName("tc_global.js");
    var languangeFileName = pluginPath + "plugin.ini";
	// 番茄日历
	var buttonText = objApp.LoadStringFromFile(languangeFileName, "strTomatoCalendar");
	objWindow.AddToolButton("main", "TomatoCalendar", buttonText, `${pluginPath}src/oldproject/icons/calendar.ico`, "OnTomatoCalendarClicked");
})()