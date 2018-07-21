import React from 'react';
import FullCalendar from './FullCalendar';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import './Calendar.css';
import Clock from '../Clock/TomatoClock'

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
        this.calendar = null;
        this.clock = new Clock();
        //绑定句柄
        this.handleFullCalendarRender = this.handleFullCalendarRender.bind(this);
        this.handleClockStart = this.handleClockStart.bind(this);
    }

    // 事件句柄
    // ------------------------------------------------------------

    handleFullCalendarRender(el) {
        // FullCalendar 渲染之前执行此句柄，传入DOM
        this.calendar = el;
        this.props.onCalendarRender(el);
    }

    handleClockStart(e) {
        const isActive = $(e.target).hasClass('fc-state-active');
        if ( isActive ) {
            $(e.target).removeClass('fc-state-active').text('计时');
            this.clock.stopTomatoClock();
        } else {
            // 开始计时
            $(e.target).addClass('fc-state-active').text('停止');
            this.clock.startTomatoClock();
        }

    }
 
    render() {
        /**
         * 设置事件句柄
         * 因为fullcalendar-reactWrapper的实现是直接返回<div id='fullcalendar'></div>
         * 并且调用$('#fullcalendar').fullcalendar(this.props)进行构建，因此React并没有
         * 管理FullCalendar状态和渲染的能力。所以直接在设置中做好callback，让插件自我管理。
         */
        return (
            <div id="calendar-container">
                <FullCalendar onFullCalendarRender = {this.handleFullCalendarRender}
                    // 基本配置
                    id = "calendar"
                    themeSystem = 'standard'
                    height = 'parent'
                    header = {{
                        left: 'prev,next,today startClock',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay,listWeek'
                    }}
                    customButtons={{
                        startClock: {
                            text: '计时',
                            click: this.handleClockStart
                        }
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
                    // 设置句柄
                    select = {this.props.onSelect}
                    viewRender = {this.props.onViewRender}
                    eventRender = {this.props.onEventRender}
                    eventClick = {this.props.onEventClick}
                    eventDrop = {this.props.onEventDrop}
                    eventResize = {this.props.onEventResize}
                />
            </div>
        );
    }
}