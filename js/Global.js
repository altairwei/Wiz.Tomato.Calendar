function OnTomatoCalendarClicked() {
	var pluginPath = objApp.GetPluginPathByScriptFileName("Global.js");
	objWindow.ViewHtml(`${pluginPath}index.html`, true);
}

(function() {
    var pluginPath = objApp.GetPluginPathByScriptFileName("Global.js");
    var languangeFileName = pluginPath + "plugin.ini";
	// 番茄日历
	var buttonText = objApp.LoadStringFromFile(languangeFileName, "strTomatoCalendar");
	objWindow.AddToolButton("main", "TomatoCalendar", buttonText, `${pluginPath}icons/calendar.ico`, "OnTomatoCalendarClicked");
})()