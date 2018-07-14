import React from 'react';
import ReactDOM from 'react-dom';
import FullCalendar from './FullCalendar';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import './Calendar.css';
import WizEventDataLoader from '../../models/WizEventDataLoader'

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
        this.dataLoader = null;
        this.$calendar = null;
        //绑定句柄
        this.onViewRender = this.onViewRender.bind(this);
        this.onEventRender = this.onEventRender.bind(this);
    }

    onViewRender( view, element ) {
        // 刷新视图，重新获取日历事件
        const calendar = this.$calendar;
        const eventSources = this.dataLoader.getEventSources( view, element );
        calendar.fullCalendar('removeEvents');
        for (let i=0 ; i < eventSources.length; i++) {
            calendar.fullCalendar('addEventSource', eventSources[i]);
        }
    }

    onEventRender( eventObj, $el ) {
        // 元素已经渲染，可修改元素
        const isComplete = parseInt(eventObj.complete) == 5;
        if ( isComplete ) {
            // 样式
            $el.addClass('tc-complete');
        }
    }

    componentDidMount() {
        this.$calendar = $( ReactDOM.findDOMNode(this.refs.fullcalendar.refs.calendar) );
        /**
         * 设置事件句柄
         * 因为fullcalendar-reactWrapper的实现是直接返回<div id='fullcalendar'></div>
         * 并且调用$('#fullcalendar').fullcalendar(this.props)进行构建，因此React并没有
         * 管理FullCalendar状态和渲染的能力。所以直接在设置中做好callback，让插件自我管理。
         */
        this.dataLoader = new WizEventDataLoader(this.$calendar);
        this.$calendar.fullCalendar('option', {
            viewRender: this.onViewRender,
            eventRender: this.onEventRender
        });
    }
 
    render() {
        return (
            <div id="calendar-container">
                <FullCalendar ref='fullcalendar'
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
                />
            </div>
        );
    }
}