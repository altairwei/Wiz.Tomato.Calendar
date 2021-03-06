/*	Tomato Assistant v1.0 beta
 *	Copyright (c) Altair_wei 2017
 *	Dependency: Font Aewsome, Buttons, humane, Adobe Audition Sound Effects, js-sha1
 */

///////////////////////////////////////
/////////////全局变量列表///////////////
///////////////////////////////////////

// 浏览器对象
var objApp = window.external;
var objDatabase = objApp.Database;
var objCommon = objApp.CreateWizObject("WizKMControls.WizCommonUI");
var objWindow = objApp.Window;
var pluginPath = objApp.GetPluginPathByScriptFileName("Global.js");

// UI界面对象
var todoListTabs = document.getElementById("todolist-tabs");
var newTodolistButton = document.getElementById("new-Todolist");
var todoListBox = document.getElementById("todolist-box");
var detailForm = document.forms['detail-form'];
var detailFormElementsArray = document.forms['detail-form'].elements;
var startAudio = document.getElementById("timer-start-sound");
var breakAudio = document.getElementById("timer-break-sound");
var syncButton = document.getElementById("sync");
var importButton = document.getElementById("import");
var removeTrashBtn = document.getElementById("removeTrash");
var newTodoForm = document.getElementById("newtodoform");
var startBtn = document.getElementById("start");
var pauseBtn = document.getElementById("pause");
var resetBtn = document.getElementById("reset")

// 数据对象
var selectedItem;
var selectedChildItem;
var selectedTodolistId;
var todoItemArray = new Array();
var tabLinks = new Array();
var todoListDivs = new Array();
var xmlDatabaseDoc;
var objXmlDatabase;
var oldXmlSHA1;

// 设置
startAudio.volume = 0.1;
breakAudio.volume = 0.1;

///////////////////////////////////////
///////////////事件绑定列表/////////////
///////////////////////////////////////

// 启动与关闭事件
window.addEventListener("load", setOpenStatusTrue);
window.addEventListener("unload", setOpenStatusFalse);
window.addEventListener("unload", saveXmlToDoc);
window.addEventListener("load", initXmlDatabse);

// UI界面事件绑定
newTodolistButton.onclick = newTodolist;
syncButton.onclick = saveXmlToDoc;
importButton.onclick = getTodoItem;
removeTrashBtn.onclick = removeTrash;
newTodoForm.onsubmit = makeNewTodo;

// 计时器控制按钮事件绑定
startBtn.onclick = startTomatoTimer;
pauseBtn.onclick = pauseTimer;
resetBtn.onclick = resetTimer;

/////////////////////////////////////////////
/////////////////工具函数/////////////////////
/////////////////////////////////////////////

// 切换开关按钮状态
function setOpenStatusTrue(){
	// "globalBrower"是从全局插件注入的对象
	if (globalBrowser) {
		globalBrowser.ExecuteFunction1("ta_setOpenStatus", true, null);
	} else {
		return false;
	}
	
}

function setOpenStatusFalse(){
	if (globalBrowser) {
		globalBrowser.ExecuteFunction1("ta_setOpenStatus", false, null);
	} else {
		return false;
	}
	
}

// 创建XML简易元素
function createSimpleTypeElement(elementName, elementValue){
	var objElement = objXmlDatabase.createElement(elementName);
	var objValueStr = objXmlDatabase.createTextNode(elementValue);
	objElement.appendChild(objValueStr);
	return objElement;
}

// 操作html文档link
function handleHtmlLink(tempFile, xmlGUID){
	// 解析html文档
	var strHtml = objCommon.LoadTextFromFile(tempFile);
	var parser = new DOMParser();
	docHtml = parser.parseFromString(strHtml, "text/html");
	// 更改并保存或者直接返回href
	var xmlLink = docHtml.getElementById("xmldata");
	if (xmlGUID){
		// 更改link元素href值
		var newhref = "index_files/ta_todolist_" + xmlGUID + ".xml";
		xmlLink.setAttribute("href", newhref);
		// 序列化html文档
		var serializer = new XMLSerializer();
		var strHtml = serializer.serializeToString(docHtml);
		objCommon.SaveTextToFile(tempFile, strHtml, "Unicode");
		return xmlLink.getAttribute("href");
	} else {
		return xmlLink.getAttribute("href");
	}
}

// 生成UUID
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

// 通过GUID获得TaTodoItem元素对象
function getXmlTodoItem(attrValue, itemAttr, isAttr, retralType) {
	// 要选择的属性名称，默认为GUID
	var itemAttr = arguments[1] ? arguments[1] : "GUID";
	// 是否通过属性选择，默认1
	var isAttr = arguments[2] ? arguments[2] : 1;
	// 返回值类型
	var retralType = arguments[3] ? arguments[3] : 1;
	// 选择方法
	if (isAttr == 1){
		var todoXPath = "//TaTodoItem[@" + itemAttr + "='" + attrValue + "']"
		switch (retralType){
			case 1:
				var queryResults = objXmlDatabase.evaluate(
					todoXPath, objXmlDatabase, 	null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null
				).iterateNext();
				break;
			case 2:
				var queryResults = objXmlDatabase.evaluate(
					todoXPath, objXmlDatabase, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null
				);
				break;
		}
	} else { 
		// 通过子元素的值来选择父元素
		var todoXPath = "//TaTodoItem[" + itemAttr + "='" + attrValue + "']";
		switch (retralType){
			case 1:
				var queryResults = objXmlDatabase.evaluate(
					todoXPath, objXmlDatabase, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null
				).iterateNext();
				break;
			case 2:
				var queryResults = objXmlDatabase.evaluate(
					todoXPath, objXmlDatabase, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
				);
				break;
		}
	}
	return queryResults;
}

// 通过GUID获得TaTodoList元素对象
function getXmlTodoList(ListGUID){
	var tagXPath = "/Tomato_Assistant/TaTodoList[@ListGUID='" + ListGUID + "']";
	var tagList = objXmlDatabase.evaluate(
		tagXPath, objXmlDatabase, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
	).singleNodeValue;
	return tagList;
}

// 指定标签名返回相匹配元素的第一个子元素
function getFirstChildWithTagName(element, tagName) {
    for ( var i = 0; i < element.childNodes.length; i++ ) {
        if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
    }
}

// 返回链接在#标志之后的部分
function getHash(url) {
    var hashPos = url.lastIndexOf ( '#' );
    return url.substring( hashPos + 1 );
}

// 改变指定元素Class
function changeElementClassName(obj, isAdd, givenClass){
	if (isAdd){
		obj.classList.add(givenClass);
	} else {
		obj.classList.remove(givenClass);
	}
}


// 创造按钮
function createButton(type, buttonClass, inconClass){
	var buttonElem = document.createElement(type);
	buttonElem.className = buttonClass;
	var iconElem = document.createElement("i");
	iconElem.className = inconClass;
	buttonElem.appendChild(iconElem);
	return buttonElem;
}

////////////////////////////////////////
//////////////XML数据库/////////////////
////////////////////////////////////////

// 初始化XML数据库
function initXmlDatabse(){
	// 检查数据库文档是否存在
	var taskFolderDocs = objDatabase.GetFolderByLocation("/My Tasks/", false).Documents;
	for (var i=0; i<taskFolderDocs.Count; i++){
		var docParam = taskFolderDocs.Item(i).GetParamValue("is_xmlDatabase");
		switch (docParam) {
			case "true":
				// 载入XML数据库
				objXmlDatabase = loadXmlDatabase(taskFolderDocs.Item(i));
				xmlDatabaseDoc = taskFolderDocs.Item(i);
				// UI界面初始化
				initUI();
				// 只要有一个true就直接跳出循环
				return false;
				break;
			case "" || "false":
				break;
		}
	}
	// 创建文档记录
	var todoDoc = objDatabase.CreateTodo2Document("/My Tasks/", "番茄助理数据库");
	todoDoc.SetParamValue("is_xmlDatabase", "true");
	xmlDatabaseDoc = todoDoc;
	// 创建XML数据库及Index.html
	createXmlDoc(todoDoc);
	// 载入XML数据库
	objXmlDatabase = loadXmlDatabase(todoDoc);
	// 创建今日待办列表
	createXmlTodolist("今日待办", "todaysTodoList");
	// 创建已完成
	createXmlTodolist("已完成", "finishedTodolist");
	// 初始化
	saveXmlToDoc();
	initUI();
	return false;
}

// 解压文档到临时文件夹
function unzipTodoDoc(todoDoc, doNotUnzip){
	// 默认解压文档
	var doNotUnzip = arguments[1] ? arguments[1] : 0;
	// 判断文档是否存在
	if (todoDoc == null) return false;
	// 创建临时文件夹
	var tempPath = objCommon.GetSpecialFolder("TemporaryFolder");
	tempPath += "tomato_assistant_temp/";
	objCommon.CreateDirectory(tempPath);
	// 根据特定文档创建文件夹
	tempPath += todoDoc.GUID + "/";
	objCommon.CreateDirectory(tempPath);
	objCommon.CreateDirectory(tempPath + "index_files/");
	// 解压.wiz文件到临时文件夹
	switch (doNotUnzip) {
		case 0:
			var tempFile = tempPath + "index.html";
			todoDoc.SaveToHtml(tempFile, 0);
			break;
		case 1:
			break;
	}
	// 返回路径, 包含"/GUID/"
	return tempPath;
}


// 创建XML数据库和Index.html
function createXmlDoc(todoDoc){
	// 获取插件地址
	var pluginPath = objApp.GetPluginPathByScriptFileName("Global.js");
	var pluginPathXsd = pluginPath + "Schema.xsd";
	// 创建临时文件夹并获得路径
	var tempPath = unzipTodoDoc(todoDoc, 1);
	var tempFile = tempPath + "index.html";
	// 创建xml文档路径
	var xmlGUID = generateUUID();
	var xmlTempFilePath = tempPath + "index_files/ta_todolist_" + xmlGUID + ".xml";
	// 创建xml字符串内容
	var schar = '\r';
	var xmlhead = '<?xml version="1.0"?>' + schar 
					+'<Tomato_Assistant noNamespaceSchemaLocation = "' 
					+ pluginPathXsd + '">' +schar;
	var xmlfoot = '</Tomato_Assistant>';
	var strXML = xmlhead + xmlfoot;
	// 创建xml文件
	objCommon.SaveTextToFile(xmlTempFilePath, strXML, "Unicode");
	// 创建html文件及其附件
	objCommon.CopyFile(pluginPath + "index.html", tempFile);
	// 更改link元素href值
	handleHtmlLink(tempFile, xmlGUID);
	// 保存到文档，包括脚本
	xmlDatabaseDoc.UpdateDocument(tempFile, 0x0002);
	// 返回该xml文件路径
	return xmlTempFilePath;
}

// 读取XML数据库
function loadXmlDatabase(todoDoc){
	// 获得路径及字符串
	var tempPath = unzipTodoDoc(todoDoc);
	var tempFile = tempPath + "index.html";
	var xmlPath = handleHtmlLink(tempFile);
	var xmlTempFile = tempPath + xmlPath;
	var strXML = objCommon.LoadTextFromFile(xmlTempFile);
	// 计算SHA1
	oldXmlSHA1 = sha1(strXML);
	// 解析字符串
	var parser = new DOMParser();
	var objXml = parser.parseFromString(strXML, "text/xml")
	return objXml;
}

// 保存数据库到文档
function saveXmlToDoc(){
	// 获得笔记对象GUID以及准备地址
	var GUID = xmlDatabaseDoc.GUID;
	var xmlGUID = generateUUID();
	var tempPath = objCommon.GetSpecialFolder("TemporaryFolder");
	tempPath += "tomato_assistant_temp/";
	tempPath += GUID + "/"
	// 准备新的xml文件名
	var xmlTempFilePath = tempPath + "index_files/ta_todolist_" + xmlGUID + ".xml";
	var tempFile = tempPath + "index.html";
	// 将XML对象序列化并保存
	var serializer = new XMLSerializer();
	var strXML = serializer.serializeToString(objXmlDatabase);
	// 判断XML是否发生改变
	var newXmlSHA1 = sha1(strXML);
	if (newXmlSHA1 === oldXmlSHA1){
		console.log("XML not changed.");
		return false;
	} else if (newXmlSHA1 !== oldXmlSHA1){
		console.log("XML changed.");
		objCommon.SaveTextToFile(xmlTempFilePath, strXML, "Unicode");
		// 更改Link连接
		handleHtmlLink(tempFile, xmlGUID);
		// 更新XML数据库文档
		xmlDatabaseDoc.UpdateDocument(tempFile, 0x0002);
		return true;
	}
}

// 创建待办事项列表
function createXmlTodolist(TagName, givenGUID) {
	if (givenGUID){
		var GUID = givenGUID;
	} else {
		var GUID = generateUUID();
	}
	//
	var objTaskList = objXmlDatabase.createElement("TaTodoList");
	objTaskList.setAttribute("TagName", TagName);
	objTaskList.setAttribute("ListGUID", GUID);
	//
	var objRootElement = objXmlDatabase.evaluate(
		"/Tomato_Assistant", objXmlDatabase, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
	).singleNodeValue;
	var finishedTodolist = getXmlTodoList("finishedTodolist");
	if (finishedTodolist){
		objRootElement.insertBefore(objTaskList,finishedTodolist)
	} else {
		objRootElement.appendChild(objTaskList);
	}
	return objTaskList;
}


// 在XML中构建待办事项
function createXmlTodoItem(
	ListGUID, itemGUID, itemTitle, itemPrio, itemStatus, itemPctComp, itemDeadline, 
	itemDeadlineTime, itemTomatoNum, itemInterruptNum, itemRemarks
){
	// 参数默认值设定
	var itemPrio = arguments[3] ? arguments[3] : "5";
	var itemStatus = arguments[4] ? arguments[4] : "planned";
	var itemPctComp = arguments[5] ? arguments[5] : "0";
	var itemDeadline = arguments[6] ? arguments[6] : "";
	var itemDeadlineTime = arguments[7] ? arguments[7] : "";
	var itemTomatoNum = arguments[8] ? arguments[8] : "0";
	var itemInterruptNum = arguments[9] ? arguments[9] : "0";
	var itemRemarks = arguments[10] ? arguments[10] : "";
	// 创建TaTodoItem元素
	var objTaTodoItem = objXmlDatabase.createElement("TaTodoItem");
	objTaTodoItem.setAttribute("GUID", itemGUID);
	objTaTodoItem.setAttribute("ListGUID", ListGUID);
	// 创建title等简易元素
	var objTitle = createSimpleTypeElement("title", itemTitle);
	var objPrio = createSimpleTypeElement("prio", itemPrio);
	var objStatus = createSimpleTypeElement("status", itemStatus);
	var objPctComp = createSimpleTypeElement("pct_comp", itemPctComp);
	var objDeadline = createSimpleTypeElement("deadline", itemDeadline);
	var objDeadlineTime = createSimpleTypeElement("deadline_time", itemDeadlineTime);
	var objTomatoNum = createSimpleTypeElement("tomato_num", itemTomatoNum);
	var objInterruptNum = createSimpleTypeElement("interrupt_num", itemInterruptNum);
	var objRemarks = createSimpleTypeElement("remarks", itemRemarks);
	// 创建复杂元素
	var objTomatoTime = objXmlDatabase.createElement("tomato_time");
	var objInterruptTime = objXmlDatabase.createElement("interrupt_time");
	var objChildItemList =  objXmlDatabase.createElement("child_item_list");
	// 组合信息
	var elementArray = [
		objTitle, objPrio, objStatus, objPctComp, objDeadline, 
		objDeadlineTime, objTomatoNum, objInterruptNum, objRemarks, 
		objTomatoTime, objInterruptTime, objChildItemList
	]
	for (var i=0; i<elementArray.length; i++){
		objTaTodoItem.appendChild(elementArray[i]);
	}
	// 将待办事项存入XML数据库
	var objTodoList = getXmlTodoList(ListGUID);
	objTaTodoItem = objTodoList.appendChild(objTaTodoItem);
	// 返回待办事项
	return objTaTodoItem;
	
}

// 读取自带todolist数据, 只进行一次初始化
function getTodoItem(){
	var todoDocCollection = objDatabase.GetTodo2Documents("/My Tasks/Inbox/");
	for (var i=0; i<todoDocCollection.Count; i++){
		var docTodo = todoDocCollection.Item(i);
		// 只操作todolist2类型文档
		if (!docTodo.TodoItems) return null;
		// 判断是否已经初始化
		var docTags = docTodo.Tags;
		for (var a=0; a<docTags.Count; a++){
			var wizDocTagName = docTags.Item(a).Name;
			if (wizDocTagName == "Imported") return null;
		}
		// 创建todolist
		var objTaskList = createXmlTodolist(docTodo.Title);
		var ListGUID = objTaskList.getAttribute("ListGUID");
		// 读取todoItem数据
		var items = docTodo.TodoItems;
		for (var j=0; j<items.Count; j++){
			var todo = items.Item(j);
			var itemGUID = generateUUID();
			var itemTitle = todo.Text;
			if (todo.Prior == 0) {
				var itemPrio = 5;
			} else {
				var itemPrio = todo.Prior;
			}
			if (todo.Complete == 4) {
				var itemStatus = "finished";
			} else { var itemStatus = "planned"; }
			var itemPctComp = 10 * todo.Complete;
			// 创建XML待办事项元素
			var objTaTodoItem = createXmlTodoItem(
				ListGUID, itemGUID, itemTitle, itemPrio, itemStatus, itemPctComp
			);
			// 添加子待办事项
			var childrenCollection = todo.Children;
			
			for (var k=0; k<childrenCollection.Count; k++){
				var itemChildItem = createSimpleTypeElement("child_item", childrenCollection.Item(k).Text);
				itemChildItem.setAttribute("is_finished", "false");
				objTaTodoItem.lastChild.appendChild(itemChildItem);
			}
			objTaskList.appendChild(objTaTodoItem);	
		}
		docTodo.TagsText += ";Imported"
	}
	// 将所有已完成事项移入finishedTodolist
	var xmlTodoItemCollection = getXmlTodoItem("finished", "status", 2, 2);
	var finishedTodolist = getXmlTodoList("finishedTodolist");
	for (var b=0; b<xmlTodoItemCollection.snapshotLength; b++) {
		var xmlTodoItem = xmlTodoItemCollection.snapshotItem(b);
		finishedTodolist.appendChild(xmlTodoItem);
	}
	// 初始化UI界面
	saveXmlToDoc();
	// 注意这里可能出bug, 尚未解决刷新页面无法获取全局脚本浏览器对象的问题
	location.reload();
}

/////////////////////////////////////////////
////////////////UI界面操作///////////////////
/////////////////////////////////////////////

// 界面初始化
////////////////////////////////////////////

// 初始化用户数据
function initUI() {
	// 初始化todolist界面
	createTodoList();
	// 初始化今日待办事项
	initTodays();
	// 初始化todoItem
	initTodoItem();
}

// 初始化todolist界面
function createTodoList() {
	// 根据XML数据库创建Todolist
	var objTodoListAll = objXmlDatabase.evaluate(
		"/Tomato_Assistant/TaTodoList", objXmlDatabase, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null
	);
	var objTodoList = objTodoListAll.iterateNext();
	while(objTodoList != null){
		// 读取属性
		var TagName = objTodoList.getAttribute("TagName");
		var ListGUID = objTodoList.getAttribute("ListGUID");
		// 创建导航
		var tabLi = document.createElement("li");
		tabLi.className = "todolist-tab"
		// 创建删除按钮
		var deleteButton = document.createElement("span");
		deleteButton.className = "tab-delete-button-hide";
		var deleteButtonIcon = document.createElement("i");
		deleteButtonIcon.className = "fa fa-remove";
		deleteButton.appendChild(deleteButtonIcon);
		// 创建超链接
		var tabA = document.createElement("a");
		var tabText = document.createTextNode(TagName);
		tabA.href = "#" + ListGUID;
		tabA.appendChild(deleteButton);
		tabA.appendChild(tabText);
		// 组合tab子元素
		tabLi.appendChild(tabA);
		todoListTabs.appendChild(tabLi);
		// 创建todolist
		var todoList = document.createElement("div");
		todoList.id = ListGUID;
		todoList.title = TagName;
		todoList.className = "todolist";
		// 添加到容器上
		todoListBox.appendChild(todoList);
		// 事件函数绑定
		tabA.onmouseover = displayTabDeleteButton;
		tabA.onmouseout = hideTabDeleteButton;
		deleteButton.onclick = deleteTodolist;
		// 下一个todolist
		objTodoList = objTodoListAll.iterateNext()
	}
	// 初始化导航栏
	initTodoListTabs();
}

// 初始化todolist导航栏
function initTodoListTabs() {
    // 获取导航栏连接以及待办事项列表对象
    var tabListItems = document.getElementsByClassName("todolist-tab");
    for ( var i = 0; i < tabListItems.length; i++ ) {
        if ( tabListItems[i].nodeName == "LI" ) {
			// 返回导航栏上的超链接元素
			var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
			// 获得超链接元素href里的GUID
			var id = getHash( tabLink.getAttribute('href') );
			// 以GUID为键创建超链接元素对象数组
			tabLinks[id] = tabLink;
			// 以GUID为键创建todolist数组
			todoListDivs[id] = document.getElementById( id );
        }
      }

	
    // 高亮第一个Tab
    var i = 0;

    for ( var id in tabLinks ) {
		// 绑定选中事件
        tabLinks[id].onclick = showTab;
        tabLinks[id].onfocus = function() { this.blur() };
        if ( i == 0 ) {
			tabLinks[id].className = 'selected';
			selectedTodolistId = id;
		}
        i++;
    }

    // 除了第一个todolist, 隐藏其他的todolist
    var i = 0;

    for ( var id in todoListDivs ) {
        if ( i != 0 ) todoListDivs[id].className = 'todolist hide';
        i++;
    }
}

function showTab() {
    selectedTodolistId = getHash( this.getAttribute('href') );

    // 显示选中todolist
    for ( var id in todoListDivs ) {
        if ( id == selectedTodolistId) {
            tabLinks[id].className = 'selected';
			todoListDivs[id].className = 'todolist';
			if (id != "finishedTodolist" && id != "todaysTodoList") {tabLinks[id].childNodes[0].className = "tab-delete-button";}			
        } else {
            tabLinks[id].className = '';
            todoListDivs[id].className = 'todolist hide';
        }
    }
	// 排序
	rankTodoItems();
	// 阻止浏览器跳转
    return false;
}

// 初始化今日待办事项
function initTodays(){
	var todaysList = document.getElementById("todaysTodoList");
	//
	var todaysPlanBox = document.createElement("div");
	todaysPlanBox.id = "todaysPlanBox";
	var todaysTips = document.createElement("span");
	todaysTips.id = "todays-tips";
	todaysTips.textContent = "今天暂时没有安排哦~";
	//
	todaysPlanBox.appendChild(todaysTips);
	todaysList.appendChild(todaysPlanBox);
}

// 新建todolist
function newTodolist() {
	// 获取用户自定义名称
	var newTagName = objCommon.InputBox("新建待办事项列表", "请输入新待办事项列表名称", "");
	if (!newTagName) return false;
	// 创建待办事项列表
	createXmlTodolist(newTagName);
	// 重新初始化待办事项列表
	saveXmlToDoc();
	location.reload();
}

// 初始化todoItem
function initTodoItem(){
	// 读取所有todolist
	var todoListArray = document.getElementsByClassName("todolist");
	// 根据todolistGUID读取数据并添加todoItem
	for (var i=0; i<todoListArray.length; i++) {
		// 获得todolist Html对象
		var todoList = todoListArray[i];
		var ListGUID = todoList.id;
		var objXmlTodoList = getXmlTodoList(ListGUID);
		var todoItemAll = objXmlDatabase.evaluate(
			".//TaTodoItem", objXmlTodoList, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null
		);
		var todoItem = todoItemAll.iterateNext()
		while (todoItem != null){
			// 基本信息
			var itemGUID = todoItem.getAttribute("GUID");
			var itemTitle = todoItem.childNodes[0].textContent;
			var itemPrio = todoItem.childNodes[1].textContent;
			var itemStatus = todoItem.childNodes[2].textContent;
			var itemPctComp = todoItem.childNodes[3].textContent;
			var itemDeadline = todoItem.childNodes[4].textContent;
			var itemDeadlineTime = todoItem.childNodes[5].textContent;
			var itemTomatoNum = todoItem.childNodes[6].textContent;
			var itemInterruptNum = todoItem.childNodes[7].textContent;
			var itemRemarks = todoItem.childNodes[8].textContent;
			// 复杂信息
			var itemChildList = todoItem.lastChild.childNodes;
			var childItemArray = new Array();
			for (var j=0; j<itemChildList.length; j++) {
				var childItemTitleText = itemChildList[j].firstChild.nodeValue;
				var isFinished = itemChildList[j].getAttribute("is_finished");
				var childTomatoNum = itemChildList[j].getAttribute("child_tomato_num");
				if (!childTomatoNum) {childTomatoNum = 0};
				var childItem = markeChildItem(childItemTitleText, isFinished, childTomatoNum)
				//
				childItemArray.push(childItem);		
			}
			// 创建HTML待办事项
			createTodoItem(
				ListGUID, itemGUID, itemTitle, itemPrio, itemStatus, itemPctComp, itemDeadline, 
				itemDeadlineTime, itemTomatoNum, itemInterruptNum, itemRemarks, childItemArray
			)
			// 下一个todoItem
			todoItem = todoItemAll.iterateNext();
		}
		
	}
	// 初始化排序
	rankTodoItems();
}

// 显示tab删除按钮
function displayTabDeleteButton(){
	var tabLinkClass = this.className;
	if (tabLinkClass == "selected" && selectedTodolistId != "finishedTodolist" && selectedTodolistId != "todaysTodoList"){
		this.childNodes[0].className = "tab-delete-button";
	}
}

// 隐藏tab删除按钮
function hideTabDeleteButton(){
	var tabLinkClass = this.className;
	if (tabLinkClass == "selected" && selectedTodolistId != "finishedTodolist" && selectedTodolistId != "todaysTodoList"){
		this.childNodes[0].className = "tab-delete-button-hide";
	}
}

// 删除代办事项
function deleteTodolist() {
	event.stopPropagation();
	var userConfirm = objCommon.ShowMessage("确定删除该待办事项列表？", "确认", 1);
	switch (userConfirm) {
		case 1:
			var ListGUID = getHash(this.parentNode.getAttribute('href'));
			// 删除XML数据库记录
			var curXmlTodolist = getXmlTodoList(ListGUID);
			curXmlTodolist.parentNode.removeChild(curXmlTodolist);
			// 删除UI界面todolist
			var curHtmlTodolist = document.getElementById(ListGUID);
			curHtmlTodolist.parentNode.removeChild(curHtmlTodolist);
			// 删除导航栏
			var curHtmlTab = this.parentNode.parentNode;
			curHtmlTab.parentNode.removeChild(curHtmlTab);
			break;
		case 2:
			return false;
			break;
	}
}

// 移除已完成事项
function removeTrash(){
	// 移除XML数据
	var finishedTodolist = getXmlTodoList("finishedTodolist");
	for (var i=0; i<finishedTodolist.children.length; i++) {
		var xmlTodoItem = finishedTodolist.children[i];
		finishedTodolist.removeChild(xmlTodoItem);
	}
	// 移除Html数据
	var htmlFinishedTodolist = document.getElementById("finishedTodolist");
	for (var j=0; j<htmlFinishedTodolist.children.length; j++) {
		var xmlTodoItem = htmlFinishedTodolist.children[j];
		htmlFinishedTodolist.removeChild(xmlTodoItem);
	}
}

/////////////////////////////////////////////
/////////////待办事项操作模块//////////////
/////////////////////////////////////////////

// 新建待办事项按钮
function makeNewTodo(){
	if (!this.elements['newtodotitle'].value) return false;
	// 读取代办事项标题
	var itemTitle = this.elements['newtodotitle'].value;
	// 创建GUID编号
	var itemGUID = generateUUID();
	// 存入XML数据库
	var ListGUID = selectedTodolistId;
	createXmlTodoItem(ListGUID, itemGUID, itemTitle);
	// 创建HTML元素
	createTodoItem(ListGUID, itemGUID, itemTitle);
	// 刷新
	this.elements['newtodotitle'].value = "";
	rankTodoItems();
	return false;
}

// 创建待办事项元素
function createTodoItem(
	ListGUID, itemGUID, itemTitle, itemPrio, itemStatus, itemPctComp, itemDeadline, 
	itemDeadlineTime, itemTomatoNum, itemInterruptNum, itemRemarks, childItemArray
){
	// 参数默认值设定
	var itemPrio = arguments[3] ? arguments[3] : "5";
	var itemStatus = arguments[4] ? arguments[4] : "planned";
	var itemPctComp = arguments[5] ? arguments[5] : "0";
	var itemDeadline = arguments[6] ? arguments[6] : "";
	var itemDeadlineTime = arguments[7] ? arguments[7] : "";
	var itemTomatoNum = arguments[8] ? arguments[8] : "0";
	var itemInterruptNum = arguments[9] ? arguments[9] : "0";
	var itemRemarks = arguments[10] ? arguments[10] : "";
	// 创建待办事项框
	var todoItem = document.createElement("div");
	var todoItemTitle = document.createElement("p");
	todoItemTitle.className = "item-title";
	// 创建checkbox
	var itemCheckBox = document.createElement("i");
	itemCheckBox.className = "check-box fa fa-square-o";
	if (itemStatus == "finished"){
		itemCheckBox.className = "check-box fa  fa-check-square-o";
	}
	todoItem.appendChild(itemCheckBox);
	// 创建标题并读取
	var todoItemText = document.createTextNode(itemTitle);
	todoItemTitle.appendChild(todoItemText);
	todoItem.appendChild(todoItemTitle);
	// 读取待办事项ID值
	todoItem.id = itemGUID;
	todoItem.ListGUID = getXmlTodoItem(itemGUID).getAttribute("ListGUID");
	// 添加类别与属性
	todoItem.className = "todoItem";
	todoItem.setAttribute("prio", itemPrio);
	todoItem.setAttribute("itemstatus", itemStatus);
	todoItem.pctcomp = itemPctComp;
	todoItem.deadline = itemDeadline;
	todoItem.deadlinetime = itemDeadlineTime;
	todoItem.tomatonum = itemTomatoNum;	
	todoItem.interruptnum = itemInterruptNum;
	todoItem.remarks = itemRemarks;
	todoItem.setAttribute("selectedstatus","false");
	todoItem.childItemArray = childItemArray;
	// 创建删除按钮
	var itemDeleteButton = createButton(
		"button", "button button-circle button-tiny item-delete-button hide ", "fa fa-remove"
	);
	todoItem.appendChild(itemDeleteButton);	
	//添加到占位框中
	var todoList = document.getElementById(ListGUID);
	todoList.appendChild(todoItem);
	// 绑定事件函数
	todoItem.onclick = selectItem;
	todoItem.onmouseover = displayItemDeleteButton;
	todoItem.onmouseout = displayItemDeleteButton;
	itemCheckBox.onclick = convertCheckBox;
	itemDeleteButton.onclick = deleteItem;
	
}

// 待办事项选中效果
function selectItem(){
	// 避免重复选择
	if (this == selectedItem) return false;
	// 询问是否要打断进行中的事项
	if (selectedItem){
		var timerStatus = resetTimer();
		if (!timerStatus){
			return false;
		}
		// 恢复上一个选中事项的状态
		selectedItem.setAttribute("selectedstatus","false");
		//
		if (selectedChildItem){
			// 取消子任务选中状态
			selectedChildItem.setAttribute("selectedstatus","false");
			detailFormElementsArray['selected-childitem-title'].value = "";
			selectedChildItem = null;
		}
		
	};
	//改变选中事项的Style
	selectedItem = this;
	selectedItem.setAttribute("selectedstatus","true");
	//启动函数链
	displayDetails();
	detectFormChange();
}

// 子任务事项选中
function selectChildItem(){
	// 避免重复选中
	if (this == selectedChildItem) return false;
	// 询问是否打断
	if (selectedChildItem){
		var timerStatus = resetTimer();
		if (!timerStatus){
			return false;
		}
		// 恢复上一个选中事项的状态
		selectedChildItem.setAttribute("selectedstatus","false");
	}
	// 改变选中事项的Style
	selectedChildItem = this;
	selectedChildItem.setAttribute("selectedstatus","true");
	// 启动下游事件
	if (this.getAttribute("isfinished") == "true"){
		detailFormElementsArray['selected-childitem-title'].classList.add("finished");
	} else {
		detailFormElementsArray['selected-childitem-title'].classList.remove("finished");
	};
	detailFormElementsArray['selected-childitem-title'].value = this.childNodes[1].nodeValue;
}


// 展示todoItem删除按钮
function displayItemDeleteButton(){
	var buttonElem = this.childNodes[2];
	buttonElem.classList.toggle("hide");
}

// 删除待办事项
function deleteItem(){
	event.stopPropagation();
	var userConfirm = objCommon.ShowMessage("确定删除该待办事项？", "确认", 1);
	switch (userConfirm) {
		case 1:
			var itemGUID = this.parentNode.id;
			// 删除XML数据库记录
			var curXmlItemElem = getXmlTodoItem(itemGUID);
			curXmlItemElem.parentNode.removeChild(curXmlItemElem);
			// 删除UI界面
			var curHtmlItemElem = this.parentNode;
			curHtmlItemElem.parentNode.removeChild(curHtmlItemElem);
			break;
		case 2:
			return false;
			break;
	}
	
}

// 完成代办事项
function convertCheckBox(){
	event.stopPropagation();
	switch (this.parentNode.getAttribute("itemstatus")){
		case "planned":
			this.parentNode.setAttribute('itemstatus','finished');
			this.className = "check-box fa fa-check-square-o"
			// 移动到已完成
			var htmlFinishedTodolist = document.getElementById("finishedTodolist");
			htmlFinishedTodolist.insertBefore(this.parentNode, htmlFinishedTodolist.firstChild);
			// 保存到XML数据库
			var finishedTodolist = getXmlTodoList("finishedTodolist");
			var curXmlTodoItem = getXmlTodoItem(this.parentNode.id);
			curXmlTodoItem.childNodes[2].firstChild.nodeValue = "finished";
			finishedTodolist.insertBefore(curXmlTodoItem, finishedTodolist.firstChild);
			break;
		case "finished":
			this.parentNode.setAttribute('itemstatus','planned');
			this.className = "check-box fa fa-square-o"
			// 移动回原本todolist
			var oriHtmlTodolist = document.getElementById(this.parentNode.ListGUID);
			oriHtmlTodolist.appendChild(this.parentNode);
			// 保存到XML数据库
			var oriXmlTodolis = getXmlTodoList(this.parentNode.ListGUID);
			var curXmlTodoItem = getXmlTodoItem(this.parentNode.id);
			curXmlTodoItem.childNodes[2].firstChild.nodeValue = "planned";
			oriXmlTodolis.appendChild(curXmlTodoItem);
			break;
	}
	
}

// 排序当前列表todoItem
function rankTodoItems(obj){
	if (selectedTodolistId == "finishedTodolist") return false;
	var curTodolist = document.getElementById(selectedTodolistId);
	var todoItemCollection = curTodolist.children;
	var todoItemArray = new Array();
	for (var i=0; i<todoItemCollection.length; i++){
		// children对象不是数组没有sort()方法，所以遍历所有对象并将其引用放入一个数组
		var todoItemElem = todoItemCollection[i];
		todoItemArray.push(todoItemElem);
	}
	// 对这个数组里面每个对象引用进行排序
	todoItemArray.sort(itemsSort);
	for (var j=0; j<todoItemArray.length; j++){
		// 根据排序结果，通过引用来重排
		curTodolist.appendChild(todoItemArray[j]);
	}
}

// 待办事项排序函数
function itemsSort(obj1, obj2){
	var prio_a = parseInt(obj1.getAttribute("prio"));
	var prio_b = parseInt(obj2.getAttribute("prio"));
	// 根据条件读取日期值
	if (obj1.deadline && obj2.deadline && obj1.deadlinetime && obj2.deadlinetime){
		// 日期和时间都存在
		var date_a = new Date(obj1.deadline + "T" + obj1.deadlinetime).getTime();
		var date_b = new Date(obj2.deadline + "T" + obj2.deadlinetime).getTime();
	} else if (obj1.deadline && obj2.deadline && !obj1.deadlinetime && !obj2.deadlinetime){
		// 日期都存在，时间都不存在
		var date_a = new Date(obj1.deadline).getTime();
		var date_b = new Date(obj2.deadline).getTime();
	} else if (obj1.deadline && obj2.deadline && !obj1.deadlinetime && obj2.deadlinetime){
		// 日期都存在，某个时间存在
		var date_a = new Date(obj1.deadline).getTime();
		var date_b = new Date(obj2.deadline + "T" + obj2.deadlinetime).getTime();
	} else if (obj1.deadline && obj2.deadline && obj1.deadlinetime && !obj2.deadlinetime){
		// 日期都存在，某个时间存在
		var date_a = new Date(obj1.deadline + "T" + obj1.deadlinetime).getTime();
		var date_b = new Date(obj2.deadline).getTime();
	} else if (obj1.deadline && !obj2.deadline && !obj1.deadlinetime && !obj2.deadlinetime){
		// 其中一个日期存在
		var date_a = new Date(obj1.deadline).getTime();
		var date_b = date_a + 1;
	} else if (!obj1.deadline && obj2.deadline && !obj1.deadlinetime && !obj2.deadlinetime){
		// 其中一个日期存在
		var date_b = new Date(obj2.deadline).getTime();
		var date_a = date_b + 1;
	} else {
		var date_a = 0;
		var date_b = 0;
	}
	// 比较
	if (prio_a < prio_b) {
		return -1;
	} else if (prio_a > prio_b) {
		return 1;
	} else if (prio_a = prio_b){
		if (date_a < date_b) {
			return -1;
		} else if (date_a > date_b) {
			return 1;
		} else if (date_a = date_b){return 0}
	}
}

//////////////////////////////////////
//////////详细信息框UI操作/////////////
//////////////////////////////////////

//展示选中待办事项的详细信息
function displayDetails(){
	// 表单所有子元素
	var eachModules = document.forms['detail-form'].children;
	var detailStatusElem = detailForm.querySelector("#detail-status");
	// 获取选中事项标题
	detailFormElementsArray['selected-item-title'].value = selectedItem.childNodes[1].firstChild.nodeValue;
	// 展示优先级
	var detailPrio = detailStatusElem.getElementsByTagName("li")[0];
	detailPrio.children[1].firstChild.nodeValue = selectedItem.getAttribute("prio");
	detailPrio.children[0].onclick = function(){selectSpanStatus(this.parentNode.children[2])};
	var prioMenu = detailPrio.children[2].getElementsByTagName("a");
	for (var i=0; i<prioMenu.length; i++){
		prioMenu[i].onclick = savePrio;
	}
	// 展示完成度
	var detailsPctComp = detailStatusElem.getElementsByTagName("li")[1];
	detailsPctComp.children[1].firstChild.nodeValue = selectedItem.pctcomp + "%";
	detailsPctComp.children[2].children[1].value = selectedItem.pctcomp;
	detailsPctComp.children[0].onclick = function(){selectSpanStatus(this.parentNode.children[2])};
	detailsPctComp.children[2].children[1].onchange = savePctComp;
	// 展示土豆数
	var detailsTomato = detailStatusElem.getElementsByTagName("li")[2];
	detailsTomato.children[1].firstChild.nodeValue = selectedItem.tomatonum;
	detailsTomato.children[0].onclick = changeTomatoInterrupt;
	// 展示打断
	var detailsInterrupt = detailStatusElem.getElementsByTagName("li")[3];
	detailsInterrupt.children[1].firstChild.nodeValue = selectedItem.interruptnum;
	detailsInterrupt.children[0].onclick = changeTomatoInterrupt;
	//获取deadline
	detailFormElementsArray['deadline'].value = selectedItem.deadline;
	detailFormElementsArray['deadlinetime'].value = selectedItem.deadlinetime;
	//获取备注
	detailFormElementsArray['remarks'].value = selectedItem.remarks;
	// 添加子任务列表
	var childItemList = document.createElement("ul");
	childItemList.className = "child-item-list";
	childItemList.id = "child-item-ul";
	if (selectedItem.childItemArray){
		// 读取并添加子任务
		var childItemArray = selectedItem.childItemArray;
		for (var j=0; j<childItemArray.length; j++){
			var childItem = childItemArray[j];
			// 事件绑定
			childItem.onmouseover = displayChildRemoveBtn;
			childItem.onmouseout = displayChildRemoveBtn;
			childItem.onclick = selectChildItem;
			// Checkbox
			var checkBox = childItem.firstChild;
			checkBox.onclick = convertChildCheck;
			// 删除按钮
			var removeBtn = childItem.lastChild;
			removeBtn.onclick = removeChildItem;
			childItemList.appendChild(childItem);
		}
	}
	// 添加元素到详细信息表单
	var childItemListElem = detailForm.querySelector("#child-item-ul");
	if (!childItemListElem){
		detailForm.appendChild(childItemList);
	} else{
		detailForm.replaceChild(childItemList, childItemListElem)
	};
}

// 绑定详细信息表单改变事件
function detectFormChange(){
	detailForm.onsubmit = function(){return false};
	detailFormElementsArray['selected-item-title'].onchange = saveDetailTitleInfo;
	detailFormElementsArray['selected-childitem-title'].onchange = saveChildDetailTitleInfo;
	detailFormElementsArray['deadline'].onchange = saveDetailDateInfo;
	detailFormElementsArray['deadlinetime'].onchange = saveDetailDateTimeInfo;
	detailFormElementsArray['remarks'].onchange = saveDetailRemarksInfo;
	detailFormElementsArray['newchilditem'].onchange = newChildItem;
}

// 保存标题更改
function saveDetailTitleInfo(){
	// 保存到Html
	selectedItem.childNodes[1].textContent = this.value;
	// 保存到XML数据库
	var GUID = selectedItem.id;
	var xmlTodoItem = getXmlTodoItem(GUID);
	xmlTodoItem.childNodes[0].textContent = this.value;	
}

// 保存子任务标题更改
function saveChildDetailTitleInfo(){
	if (!selectedChildItem) return false;
	// 保存到Html
	selectedChildItem.childNodes[1].textContent = this.value;
	saveChildItem();
}

// 保存prio改变
function savePrio(){
	var prioTextNode = this.parentNode.parentNode.children[1].firstChild;
	switch (this.id) {
		case "prio1":
			prioTextNode.nodeValue = "1";
			break;
		case "prio2":
			prioTextNode.nodeValue = "2";
			break;
		case "prio3":
			prioTextNode.nodeValue = "3";
			break;
		case "prio4":
			prioTextNode.nodeValue = "4";
			break;
		case "prio5":
			prioTextNode.nodeValue = "5";
			break;
	}
	// 保存到HtmlTodoItem
	selectedItem.setAttribute("prio", prioTextNode.nodeValue);
	// 保存到XML
	getXmlTodoItem(selectedItem.id).childNodes[1].textContent = prioTextNode.nodeValue;
	// 重新排序
	rankTodoItems();
}

// 保存完成度
function savePctComp(){
	var pctCompTextNode = this.parentNode.parentNode.children[1].firstChild;
	pctCompTextNode.nodeValue = this.value + "%";
	// 保存到Html
	selectedItem.pctcomp = this.value;
	// 保存到XML
	getXmlTodoItem(selectedItem.id).childNodes[3].textContent = this.value;
}

// 切换土豆数和打断数
function changeTomatoInterrupt(){
	event.stopPropagation;
	switch (this.id){
		case "tomato-num":
			this.parentNode.classList.toggle("hide");
			this.parentNode.nextElementSibling.classList.toggle("hide");
			break;
		case "interrupt-num":
			this.parentNode.classList.toggle("hide");
			this.parentNode.previousElementSibling.classList.toggle("hide");
	}
}

// 保存deadline更改
function saveDetailDateInfo(){
	selectedItem.deadline = this.value;
	// 保存到XML数据库
	var GUID = selectedItem.id;
	var xmlTodoItem = getXmlTodoItem(GUID);
	xmlTodoItem.childNodes[4].textContent = this.value;
	// 重新排序
	rankTodoItems();
}

// 保存deadlinetime更改
function saveDetailDateTimeInfo(){
	selectedItem.deadlinetime = this.value;
	// 保存到XML数据库
	var GUID = selectedItem.id;
	var xmlTodoItem = getXmlTodoItem(GUID);
	xmlTodoItem.childNodes[5].textContent = this.value;
	// 重新排序
	rankTodoItems();
}

// 保存备注更改
function saveDetailRemarksInfo(){
	selectedItem.remarks = this.value;
	// 保存到XML数据库
	var GUID = selectedItem.id;
	var xmlTodoItem = getXmlTodoItem(GUID);
	xmlTodoItem.childNodes[8].textContent = this.value;
}

// 保存子待办事项
function saveChildItem(){
	var detailChildItemList = detailForm.querySelector("#child-item-ul");
	//将信息复制到todoItem属性
	var childItemArray = detailChildItemList.getElementsByTagName("li");
	childItemArray = Array.prototype.slice.call(childItemArray);
	selectedItem.childItemArray = childItemArray;
	// 将信息储存到XML
	var GUID = selectedItem.id;
	var xmlTodoItem = getXmlTodoItem(GUID);
	var xmlChildItemList = objXmlDatabase.createElement("child_item_list");
	for (var i=0; i<childItemArray.length; i++) {
		var xmlChildItem = objXmlDatabase.createElement("child_item");
		var xmlChildItemTitle = objXmlDatabase.createTextNode(childItemArray[i].childNodes[1].nodeValue);
		xmlChildItem.appendChild(xmlChildItemTitle);
		xmlChildItem.setAttribute("is_finished", childItemArray[i].getAttribute("isFinished"));
		xmlChildItem.setAttribute("child_tomato_num", childItemArray[i].getAttribute("childTomatoNum"));
		xmlChildItemList.appendChild(xmlChildItem);
	}
	xmlTodoItem.replaceChild(xmlChildItemList, xmlTodoItem.lastChild);
}

// 创建子任务
function markeChildItem(childItemTitleText, isFinished = "false", childTomatoNum = 0){
	if (!childItemTitleText) return false;
	// 创建子任务元素
	var childItem = document.createElement("li");
	childItem.setAttribute("isFinished", isFinished);
	childItem.setAttribute("childTomatoNum", childTomatoNum);
	childItem.className = "child-item";
	// 创建checkbox
	var checkBox = document.createElement("i");
	switch (isFinished){
		case "false":
			checkBox.className = "childCheck fa fa-circle-o";
			break;
		case "true":
			checkBox.className = "childCheck fa fa-check-circle-o";
			break;
		default:
			checkBox.className = "childCheck fa fa-circle-o";
			break;
	}
	childItem.appendChild(checkBox);
	// 创建标题
	var childItemTitle = document.createTextNode(childItemTitleText);
	childItem.appendChild(childItemTitle);
	// 创建删除按钮
	var deleteBtn = createButton("span", "child-remove child-remove-hide", "fa fa-remove");
	childItem.appendChild(deleteBtn);
	// 创建完成番茄数
	var tomatoElem = document.createElement("span");
	tomatoElem.className = "child-tomato";
	tomatoElem.textContent = "+" + childTomatoNum;
	var tomatoSymbol = document.createElement("i");
	tomatoSymbol.className = "child-tomato-symbol fa fa-smile-o";
	tomatoElem.insertBefore(tomatoSymbol, tomatoElem.lastChild);
	childItem.appendChild(tomatoElem);
	// 事件绑定
	checkBox.onclick = convertChildCheck;
	deleteBtn.onclick = removeChildItem;
	childItem.onmouseover = displayChildRemoveBtn;
	childItem.onmouseout = displayChildRemoveBtn;
	childItem.onclick = selectChildItem;
	//
	return childItem;
}

// 创建子任务并保存更改
function newChildItem(){
	// 创建子任务元素
	var childItemTitleText = this.value;
	var newChildItem = markeChildItem(childItemTitleText);
	// 组合元素
	var detailChildItemList = detailForm.querySelector("#child-item-ul");
	detailChildItemList.appendChild(newChildItem);
	// 保存信息
	saveChildItem();
	// 重置输入框
	this.value = "";
}

// 完成子待办事项
function convertChildCheck(){
	event.stopPropagation();
	switch (this.parentNode.getAttribute("isFinished")){
		case "false":
			this.parentNode.setAttribute('isFinished','true');
			this.className = "childCheck fa fa-check-circle-o"
			saveChildItem();
			break;
		case "true":
			this.parentNode.setAttribute('isFinished','false');
			this.className = "childCheck fa fa-circle-o"
			saveChildItem();	
			break;
	}
	
}

// 展示子任务删除按钮
function displayChildRemoveBtn(){
	var buttonElem = this.getElementsByClassName("child-remove")[0];
	buttonElem.classList.toggle("child-remove-hide");
}

// 移除子待办事项
function removeChildItem(){
	var userConfirm = objCommon.ShowMessage("确定删除该待办事项？", "确认", 1);
	switch (userConfirm) {
		case 1:
			event.stopPropagation();
			var curChildItem = this.parentNode;
			curChildItem.parentNode.removeChild(curChildItem);
			saveChildItem();
			break;
		case 2:
			return false;
			break;
	}
	
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

function selectSpanStatus(obj) {
	event.stopPropagation();
	obj.classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
} 

/////////////////////////////////////////////
/////////////计时器及通知模块/////////////////
/////////////////////////////////////////////

// 15分钟番茄时间计时器
var tMins = 25;
var tSecs = 0;
var tomatoTimer;
var fourTomato  = 0;
var timer = document.getElementById("timer");

function startTomatoTimer(){
	if (!selectedItem){
		objCommon.ShowMessage("您尚未选择待办事项", "警告", 0);
		return false;
	}
	// 播放音效
	startAudio.play();
	alertTomatoEvent("(ง •_•)ง  任务开始！请不要中断!");
	if (tomatoTimer) clearInterval(tomatoTimer);
	tomatoTimer = setInterval("tomatoTimerFunc()", 1000);
}

function tomatoTimerFunc(){
	// 分钟的减位
	if (tSecs == 0){
		tSecs = 59;
		tMins--;
	} else {tSecs--};
	// 显示计时器
	if (tSecs < 10 && tMins >= 10){
		tSecsText = "0"+tSecs;
		timer.firstChild.nodeValue = tMins+":"+tSecsText;
	} else if (tSecs >= 10 && tMins <10){
		tMinsText = "0"+tMins;
		timer.firstChild.nodeValue = tMinsText+":"+tSecs;
	} else if (tSecs < 10 && tMins <10){
		tSecsText = "0"+tSecs;
		tMinsText = "0"+tMins;
		timer.firstChild.nodeValue = tMinsText+":"+tSecsText;
	} else {
		timer.firstChild.nodeValue = tMins+":"+tSecs
	};
	// 计时器归零并重置
	if (tSecs == 0 && tMins == 0){
		tMins = 25;
		// 取消计时器
		clearInterval(tomatoTimer);
		// 累加番茄数
		fourTomato++;
		// 执行休息时间计时器
		startBreakTimer();
		addTomato();
	}

}

// 5分钟休息时间计时器
var bMins = 5;
var bSecs = 0;
var breakTimer;

function startBreakTimer(){
	// 播放音效
	if (fourTomato == 4) bMins = 30;
	breakAudio.play();
	switch (fourTomato){
		case 4:
			alertTomatoEvent("φ(≧ω≦*)♪  连续完成四个番茄，可以休息30分钟!");
			break;
		default:
			alertTomatoEvent("[]~(￣▽￣)~* 已完成一个番茄，可以休息5分钟!");
			break;
	}
	breakTimer = setInterval("breakTimerFunc()", 1000);
}

function breakTimerFunc(){
	// 检测是否已经完成了四个番茄时间
	if (fourTomato != 4){
		// 分钟的减位
		if (bSecs == 0){
			bSecs = 59;
			bMins--;
		} else {bSecs--};
		// 显示计时器
		if (bSecs < 10){
			bMinsText = "0"+bMins;
			bSecsText = "0"+bSecs;
			timer.firstChild.nodeValue = bMinsText+":"+bSecsText;
		} else {
			bMinsText = "0"+bMins;
			timer.firstChild.nodeValue = bMinsText+":"+bSecs;
		}
		// 计时器归零并重置
		if (bSecs ==0 && bMins == 0){
			bMins = 5;
			// 取消计时器
			clearInterval(breakTimer);
			// 执行番茄计时器
			startTomatoTimer();
		}
	} else {
		// 分钟的减位
		if (bSecs == 0){
			bSecs = 59;
			bMins--;
		} else {bSecs--};
		// 显示计时器
		if (bMins >= 10 && bSecs < 10){
			bSecsText = "0"+bSecs;
			timer.textContent = bMins+":"+bSecsText;
		} else if (bMins >= 10 && bSecs >= 10){
			timer.textContent = bMins+":"+bSecs;
		} else if (bMins < 10 && bSecs < 10){
			bMinsText = "0"+bMins;
			bSecsText = "0"+bSecs;
			timer.textContent = bMinsText+":"+bSecsText;
		} else if (bMins < 10 && bSecs >= 10) {
			bMinsText = "0"+bMins;
			timer.textContent = bMinsText+":"+bSecs;
		}
		// 计时器归零并重置
		if (bSecs ==0 && bMins == 0){
			bMins = 5;
			fourTomato = 0;
			// 取消计时器
			clearInterval(breakTimer);
			// 执行番茄计时器
			startTomatoTimer();
		}
	}
}

// 暂停计时器
function pauseTimer(){
	clearInterval(tomatoTimer);
	clearInterval(breakTimer);
	if (bMins == 5 && tMins != 25){
		// 处于番茄进行时，暂停进行惩罚
		addInterrupt();
	}
	
}

// 重置计时器
function resetTimer(){
	if (bMins != 5 && tMins == 25){
		// 正处于休息时间，可无惩罚重置
		clearInterval(breakTimer);
		bMins = 5;
		bSecs = 0;
		tSecsText = "0"+tSecs;
		timer.firstChild.nodeValue = tMins+":"+tSecsText;
		return true;
	} else if(bMins == 5 && tMins != 25){
		// 处于番茄进行时，打断有惩罚
		var userConfirm = objCommon.ShowMessage("确定放弃这个番茄？", "确认警告", 1);
		switch (userConfirm){
			case 1:
				// 确定
				clearInterval(tomatoTimer);
				tMins = 25;
				tSecs = 0;
				tSecsText = "0"+tSecs;
				timer.firstChild.nodeValue = tMins+":"+tSecsText;
				alertTomatoEvent('(ಥ﹏ಥ) 你放弃了这个番茄！！');
				addInterrupt();
				return true;
				break;
			case 2:
				// 取消
				return false;
		}
		
	} else {return true;}
}

// 增加番茄数和番茄时间记录
function addTomato(){
	// 累计到待办事项
	var tomatoNumSpan = document.getElementById("tomato-num-value");
	tomatoNumSpan.textContent = parseInt(tomatoNumSpan.textContent) + 1;
	selectedItem.tomatonum = tomatoNumSpan.textContent;
	// 累计到子任务事项
	if (selectedChildItem){
		var oldChildTomato = selectedChildItem.getAttribute("childTomatoNum");
		var newChildTomato = parseInt(oldChildTomato) + 1;
		selectedChildItem.setAttribute("childTomatoNum", newChildTomato);
		var tomatoElem = selectedChildItem.getElementsByClassName("child-tomato")[0];
		tomatoElem.lastChild.nodeValue = "+" + newChildTomato;
	}
	// 保存到XML数据库
	saveChildItem();
	var GUID = selectedItem.id;
	var xmlTodoItem = getXmlTodoItem(GUID);
	xmlTodoItem.childNodes[6].textContent = tomatoNumSpan.textContent;
}

// 增加打断数和打断时间记录
function addInterrupt(){
	var interruptNumSpan = document.getElementById("interrupt-num-value");
	interruptNumSpan.textContent = parseInt(interruptNumSpan.textContent) + 1;
	selectedItem.interruptnum = interruptNumSpan.textContent;
	// 保存到XML数据库
	var GUID = selectedItem.id;
	var xmlTodoItem = getXmlTodoItem(GUID);
	xmlTodoItem.childNodes[7].textContent = interruptNumSpan.textContent;
}

// humane脚本对象注入器
function alertTomatoEvent(message){
	var objBrowser = objWindow.CurrentDocumentBrowserObject;
	var script = "(function(){"
		+ "if(this.humane && document.body.classList.contains('focused') && !document.body.classList.contains('blured')){return 1}"
		+ "else if(!this.humane && document.body.classList.contains('focused') && !document.body.classList.contains('blured')){return 2}"
		+ "else if(this.humane && !document.body.classList.contains('focused') && document.body.classList.contains('blured')){return 3}"
		+ "else if(!this.humane && !document.body.classList.contains('focused') && document.body.classList.contains('blured')){return 4}"
		+ "else if(!this.humane && !document.body.classList.contains('focused') && !document.body.classList.contains('blured')){return 4}"
	+ "}())"
	// 执行脚本注入
	objBrowser.ExecuteScript(script, function(ret){
		console.log(ret);
		switch (ret){
			case 1:
			// 已经注入humane.js
				objBrowser.ExecuteScript(humaneAlert.toString(), function(ret){
					objBrowser.ExecuteFunction2("humaneAlert", message, pluginPath+"css/jackedup.css", null);
				});	
				break;
			case 2:
			// 尚未注入humane.js
				var jsFileName = pluginPath + "js/humane.js";
				objBrowser.ExecuteScriptFile(jsFileName, function(ret){
					objBrowser.ExecuteScript(humaneAlert.toString(), function(ret){
						objBrowser.ExecuteFunction2(
							"humaneAlert", message, pluginPath+"css/jackedup.css", null
						);
					});
				});
				break;
			case 3:
			// Wiznote最小化
				var noticeFileName = pluginPath + "dialog/Notice.html";
				var dialogParam = objWindow.GetHtmlDialogParam(window.WizChromeBrowser);
				// 这里需要将message参数传入对话框
				objWindow.ShowHtmlDialogEx(false, "", noticeFileName, 600, 90, "", message, null);
				break;
			case 4:
				var noticeFileName = pluginPath + "dialog/Notice.html";
				var dialogParam = objWindow.GetHtmlDialogParam(window.WizChromeBrowser);
				objWindow.ShowHtmlDialogEx(false, "", noticeFileName, 600, 90, "", message, null);
				break;
		}
	})
}

// 插入CSS并执行humane, 在编辑状态下执行可能会被编辑器检测到DOM修改, 从而将CSS文件一起保存了。
function humaneAlert(message, cssFileName){
	if (!document.getElementById("humaneCSS")) {
		// 准备引用CSS
		var objLink = document.createElement("link");
		objLink.id = "humaneCSS";
		objLink.setAttribute("rel", "stylesheet");
		objLink.setAttribute("type", "text/css");
		objLink.setAttribute("href", cssFileName);
		document.head.appendChild(objLink);	
	}
	// 执行通知
	var notify = humane.create({ timeout: 10000, waitForMove: false, clickToClose: true})
	notify.log(message);
}


/////////////////////////////////////////////
////////////////今日安排模块//////////////////
/////////////////////////////////////////////


