import React from 'react';
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    events:[
                {
                    title: 'All Day Event',
                    start: '2017-05-01'
                },
                {
                    title: 'Long Event',
                    start: '2017-05-07',
                    end: '2017-05-10'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2017-05-09T16:00:00'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2017-05-16T16:00:00'
                },
                {
                    title: 'Conference',
                    start: '2017-05-11',
                    end: '2017-05-13'
                },
                {
                    title: 'Meeting',
                    start: '2017-05-12T10:30:00',
                    end: '2017-05-12T12:30:00'
                },
                {
                    title: 'Birthday Party',
                    start: '2017-05-13T07:00:00'
                },
                {
                    title: 'Click for Google',
                    url: 'http://google.com/',
                    start: '2017-05-28'
                }
            ],		
    }
  }
 
  render() {
    return (
      <div id="calendar-container">
        <FullCalendar
            // 基本配置
            id = "calendar"
            themeSystem = 'standard'
            height = 'parent'
            header = {{
                left: 'prev,next,today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
            }}
            // 中文化
            buttonText = {{
                today: '今天',
                month: '月',
                week: '周',
                day: '日',
                list: '表'
            }}
            monthNames = {[
                '1月', '2月', '3月', '4月', 
                '5月', '6月', '7月', '8月', 
                '9月', '10月', '11月', '12月'
            ]}
            monthNamesShort = {[
                '1月', '2月', '3月', '4月', 
                '5月', '6月', '7月', '8月', 
                '9月', '10月', '11月', '12月'
            ]}
            dayNames = {[
                '周日', '周一', '周二', '周三', '周四', '周五', '周六'
            ]}
            dayNamesShort = {[
                '周日', '周一', '周二', '周三', '周四', '周五', '周六'
            ]}
            allDayText = '全天'
            // 设置视图
            defaultView = 'agendaWeek'
            nowIndicator = {true}
            firstDay = {1}
            views = {{
                agenda: {
                    minTime: "08:00:00",
                    slotLabelFormat: 'h(:mm) a'
                }           
            }}
            navLinks= {true}
            allDayDefault = {false}
            eventLimit= {true}
            // 设置事件
            selectable = {true}
            selectHelper = {true}
            editable = {true}
            forceEventDuration = {true}
            // 设置UI
            unselectCancel = '.modal *'
            dragOpacity = {{
                "month": .5,
                "agendaWeek": 1,
                "agendaDay": 1
            }}
            // 设置事件句柄
            
        />
      </div>
    );
  }
}