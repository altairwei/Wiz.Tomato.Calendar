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
        this.calendar = null;
        //绑定句柄
        this.handleFullCalendarRender = this.handleFullCalendarRender.bind(this);
        this.onViewRender = this.onViewRender.bind(this);
        this.onEventRender = this.onEventRender.bind(this);
        this.onEventDrop = this.onEventDrop.bind(this);
        this.onEventResize = this.onEventResize.bind(this);
    }

    // 事件句柄
    // ------------------------------------------------------------

    handleFullCalendarRender(el) {
        // FullCalendar 渲染之前执行此句柄，传入DOM
        this.calendar = el;
        this.dataLoader = new WizEventDataLoader(this.calendar);
        this.props.onCalendarRender(el);
    }

    onViewRender( view, element ) {
        // 刷新视图，重新获取日历事件
        const $calendar = $(this.calendar);
        const eventSources = this.dataLoader.getEventSources( view, element );
        $calendar.fullCalendar('removeEvents');
        for (let i=0 ; i < eventSources.length; i++) {
            $calendar.fullCalendar('addEventSource', eventSources[i]);
        }
    }

    onEventDrop( event, delta, revertFunc, jsEvent, ui, view ) {
        if (event.id){
            this.dataLoader.updateEventDataOnDrop(event, delta, revertFunc, jsEvent, ui, view)
        } else {
            revertFunc();
        }        
    }

    onEventResize( event, delta, revertFunc, jsEvent, ui, view ) {
        if (event.id){
            this.dataLoader.updateEventDataOnResize(event, delta, revertFunc, jsEvent, ui, view);
        } else {
            revertFunc();
        }
    }

    onEventRender( eventObj, $el ) {
        // 设置文本颜色
        const rgbString = $el.css('background-color');
        const rgbArray = /^rgb\((\d*), (\d*), (\d*)\)$/.exec(rgbString);
        if (rgbArray) {
            const hsl = rgb2hsl(rgbArray[1], rgbArray[2], rgbArray[3]);
            const lightness = hsl[2] - Math.cos( (hsl[0]+70) / 180*Math.PI ) * 0.15;
            const textColor = lightness > 0.5 ? '#222' : 'white';
            $el.css('color', textColor);
        }
        // 元素已经渲染，可修改元素
        const isComplete = parseInt(eventObj.complete) == 5;
        if ( isComplete ) {
            // 样式
            $el.addClass('tc-complete');
        }
    }

    componentDidMount() {
        
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
                    // 设置句柄
                    select = {this.props.onSelect}
                    viewRender = {this.onViewRender}
                    eventRender = {this.onEventRender}
                    eventClick = {this.props.onEventClick}
                    eventDrop = {this.onEventDrop}
                    eventResize = {this.onEventResize}
                />
            </div>
        );
    }
}

function rgb2hsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;

    var M = Math.max(r, g, b);
    var m = Math.min(r, g, b);
    var C = M - m;
    var L = 0.5*(M + m);
    var S = (C === 0) ? 0 : C/(1-Math.abs(2*L-1));

    var h;
    if (C === 0) h = 0; // spec'd as undefined, but usually set to 0
    else if (M === r) h = ((g-b)/C) % 6;
    else if (M === g) h = ((b-r)/C) + 2;
    else if (M === b) h = ((r-g)/C) + 4;

    var H = 60 * h;

    // 分别是hue, sat, lum
    return [H, parseFloat(S), parseFloat(L)];
}