# 番茄日历 开发日志

## 1 实现目标

* 采用自带日历的数据储存方式——WizDocument
  * [x] 事件元数据用Param方式储存；
  * [ ] 实现一个极简的富文本编辑器；用来储存文档；
  * [ ] 文档页面的自定义HTML标签属性用来储存数据，同时可以显示额外信息；

* 三级任务视图：事件级别，任务级别，计划级别；
  * [ ] 已完成任务在日历视图中隐藏，这样就能很容易看出以前有哪些任务未完成。

* 参考Google日历的UI;

* 事件编辑页面
  * [ ] 编辑页面添加附件按钮，可上传为文档附件;
  * [ ] 简单的富文本编辑器，可参考收藏的笔记 `Pell` 以及 `ProseMirror` 项目。
  * [ ] 利用原生的文档提醒功能：为事件设置提醒！并询问是否加入当日作为代办事件。
  * [ ] 提供一套颜色，若自定义颜色（JS插件）则colorID设置为0。
  * [ ] 在展示页面显示是否调转

* 重复事件
  * [ ] 参考C++UI界面的添加到日历功能，有很多颜色，和更多的重复方式。
  * [ ] 新建一个Repeat_Event文件夹，这里面放置重复事件。

* 按钮样式
  * [ ] 用 Bootstrap 按钮控制，但样式用 Buttons 库的。

* 中国日历

* 组件
  * 将 EventPopover 组件的样式分为 Structure 和 theme ，并且加上命名空间。

要显示这些农历，节假日信息，有两种方法:

一是直接调用google calendar的订阅地址，把这些信息通过配置fullCalendar自带的events的方式，像显示日程安排一样显示出来，fullCalendar是原生支持google calendar调用的（不过貌似只能调一个文件）；

比如官方示例里的显示美国节假日的例子：

```JavaScript
// US Holidays
events: 'http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic'
```

换一下源地址中的ID部分，就可以显示其他日程，比如：

中国节假日(Calendar ID: china__zh_cn@holiday.calendar.google.com); 
农历(Calendar ID: lunar__zh_cn@holiday.calendar.google.com); 

## 2 技术信息

`WizCommonUI` 提供了一些工具用来处理HTML标签：

```C++
//添加文档到日历中。这个方法会出现一个对话框，提示用户输入参数。pDocumentDisp：文档对象，类型为IWizDocument；pbRet：用户是否点击了确定按钮
[id(2), helpstring("method AddDocumentToCalendar")] HRESULT AddDocumentToCalendar([in] IDispatch* pDocumentDisp, [out,retval] VARIANT_BOOL* pbRet);

//创建一个日历事件。显示一个对话框，提示用户输入某些参数。pDatabaseDisp：数据库对象；dtEvent：事件开始时间；ppDocumentDisp：成功创建事件后，自动生成的文档
[id(3), helpstring("method CreateCalendarEvent")] HRESULT CreateCalendarEvent([in] IDispatch* pDatabaseDisp, [in] DATE dtEvent, [out,retval] IDispatch** ppDocumentDisp);

//编辑日历事件。显示一个对话框，提示用户编辑。pDocumentDisp：文档对象，类型为IWizDocument；pbRet：用户是否点击了确定按钮
[id(4), helpstring("method EditCalendarEvent")] HRESULT EditCalendarEvent([in] IDispatch* pDocumentDisp, [out,retval] VARIANT_BOOL* pbRet);

//从HTML标记里面获得一个属性值。bstrHtmlTag：HTML标记内容；bstrTagAttributeName：属性名；返回值：属性值
[id(34), helpstring("method HtmlTagGetAttributeValue")] HRESULT HtmlTagGetAttributeValue([in] BSTR bstrHtmlTag, [in] BSTR bstrTagAttributeName, [out, retval] BSTR* pbstrAttributeValue);

//从HTML文字里面提取一个或者多个标记。bstrHtmlText：HTML文字；bstrTagName：HTML标记名；bstrTagAttributeName：HTML标记属性名；bstrTagAttributeValue：HTML标记属性值；返回值：所有符合条件的标记，类型为安全数组。如果在javascript里面使用，请参阅本文后面部分。
[id(35), helpstring("method HtmlExtractTags")] HRESULT HtmlExtractTags([in] BSTR bstrHtmlText, [in] BSTR bstrTagName, [in] BSTR bstrTagAttributeName, [in] BSTR bstrTagAttributeValue, [out, retval] VARIANT* pvTags);

//从HTML里面获得所有的链接。bstrHtmlText：HTML文字；bstrURL：HTML的URL；返回值：所有链接，类型为安全数组。如果在javascript里面使用，请参阅本文后面部分。
[id(36), helpstring("method HtmlEnumLinks")] HRESULT HtmlEnumLinks([in] BSTR bstrHtmlText, [in] BSTR bstrURL, [out, retval] VARIANT* pvLinks);

//从HTML文字里面，提取HTML正文。bstrHtmlText：HTML文字；bstrURL：HTML的URL；返回值：HTML正文
[id(37), helpstring("method HtmlGetContent")] HRESULT HtmlGetContent([in] BSTR bstrHtmlText, [in] BSTR bstrURL, [out, retval] BSTR* pbstrContent);

//从HTML里面提取指定的tag
[id(94), helpstring("method HtmlExtractTags2")] HRESULT HtmlExtractTags2([in] BSTR bstrHtmlText, [in] BSTR bstrTagName, [in] BSTR bstrTagAttributeName, [in] BSTR bstrTagAttributeValue, [out, retval] BSTR* pvTags);

//从HTML里面提取连接
[id(95), helpstring("method HtmlEnumLinks2")] HRESULT HtmlEnumLinks2([in] BSTR bstrHtmlText, [in] BSTR bstrURL, [out, retval] BSTR* pvLinks);

```

`WizDatabase` 相关接口:

```C++
//获得具有日历事件的文档。dtStart：开始时间；dtEnd：结束时间；返回值：IWizDocumentCollection
[id(43), helpstring("method GetCalendarEvents")] HRESULT GetCalendarEvents([in] DATE dtStart, [in] DATE dtEnd, [out,retval] IDispatch** ppDocumentCollectionDisp);

//获得日历中的事件
[id(63), helpstring("method GetCalendarEvents2")] HRESULT GetCalendarEvents2([in] DATE dtStart, [in] DATE dtEnd, [out,retval] IDispatch** ppEventCollectionDisp);

//获得todo list对象的文档
[id(62), helpstring("method GetTodoDocument")] HRESULT GetTodoDocument([in] DATE dtDate, [out,retval] IDispatch** ppDocumentDisp);

```

`WizDocument` 相关接口:

```C++
//添加文档到日历。dtStart：开始时间；dtEnd：结束时间
[id(61), helpstring("method AddToCalendar")] HRESULT AddToCalendar([in] DATE dtStart, [in] DATE dtEnd, [in] BSTR bstrExtInfo);

//从日历中删除文档
[id(62), helpstring("method RemoveFromCalendar")] HRESULT RemoveFromCalendar(void);

//获得事件数据（如果文档包含事件数据的话）
[propget, id(66), helpstring("property Event")] HRESULT Event([out, retval] IDispatch** pVal);
[propput, id(66), helpstring("property Event")] HRESULT Event([in] IDispatch* newVal);

//添加文档到日历中，可以设置重复参数
[id(67), helpstring("method AddToCalendar2")] HRESULT AddToCalendar2([in] DATE dtStart, [in] DATE dtEnd, [in] BSTR bstrRecurrence, [in] BSTR bstrEndRecurrence, [in] BSTR bstrExtInfo);
```