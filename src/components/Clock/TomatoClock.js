const moment = require("moment");
const momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);
import { WizExplorerWindow as objWindow, WizExplorerApp as objApp, WizBubbleMessage } from '../../utils/WizInterface';
const pluginPath = objApp.GetPluginPathByScriptFileName("TomatoCalendar_Global.js");
// 因为Wiznote无法即时更新图标，所以改用Unicode字符
const clockIcon = pluginPath + 'assets/clock.ico';
const coffeeIcon = pluginPath + 'assets/coffee.ico';

const TOMATO_MINS = 25;
const COFFEE_MINS = 5;
const TOOLBUTTON_TYPE = 'headTitle';

export default class Clock {
    constructor(event) {
        this.tomatoClock = moment.duration(TOMATO_MINS, 'minutes');
        this.coffeeClock = moment.duration(COFFEE_MINS, 'minutes');
        //
        this.tick = this.tick.bind(this);
        //
        window.moment = moment;
    }

    startTomatoClock() {
        this.tomatoClockTimer = setInterval(this.tick, 1000);
    }

    stopTomatoClock() {
        clearInterval(this.tomatoClockTimer);
        this.resetStateToTomato(TOOLBUTTON_TYPE);
    }

    resetStateToTomato(type = 'document') {
        this.resetToolButtonText('🍅 25:00', type);
        this.tomatoClock = moment.duration(TOMATO_MINS, 'minutes');
        this.coffeeClock = moment.duration(COFFEE_MINS, 'minutes');
    }

    resetStateToCoffee(type = 'document') {
        this.resetToolButtonText('☕ 05:00', type);
    }

    resetToolButtonText(text, type) {
        if (type == 'main') {
            objWindow.RemoveToolButton("main", "TomatoClock");
            objWindow.AddToolButtonEx("main", "TomatoClock", text, '', '', "/ShowText=1");            
        } else if (type == 'document') {
            objWindow.UpdateToolButton("document", "TomatoClock", `/ButtonText=${text}`, '');
        } else if (type == 'headTitle') {
            document.title = text;
        }
    }

    tick() {
        // 判断切换点
        if ( this.tomatoClock.asMinutes() == TOMATO_MINS && this.coffeeClock.asMinutes() == COFFEE_MINS ) {
            // 起始番茄时钟状态
            this.resetStateToTomato(TOOLBUTTON_TYPE);
            WizBubbleMessage('番茄时间开始了！', '');
        } else if ( this.tomatoClock.asMinutes() == 0 && this.coffeeClock.asMinutes() == COFFEE_MINS ) {
            // 开始休息时间
            this.resetStateToCoffee(TOOLBUTTON_TYPE);
            WizBubbleMessage('休息一会儿吧！', '');
        } else if ( this.tomatoClock.asMinutes() == 0 && this.coffeeClock.asMinutes() == 0 ) {
            // 新一轮循环
            this.resetStateToTomato(TOOLBUTTON_TYPE);
            this.tomatoClock = moment.duration(TOMATO_MINS, 'minutes');
            this.coffeeClock = moment.duration(COFFEE_MINS, 'minutes');
            WizBubbleMessage('番茄时间开始了！', '');
        }
        // 运行时钟
        if ( this.tomatoClock.asSeconds() > 0 && this.coffeeClock.asSeconds() > 0 ) {
            // 番茄时间
            let now = this.tomatoClock.subtract(1000, 'milliseconds').format('mm:ss');
            if ( this.tomatoClock.asSeconds() < 60 ) now = '00:' + now;
            this.resetToolButtonText('🍅 ' + now, TOOLBUTTON_TYPE);
        } else if ( this.tomatoClock.asSeconds() <= 0 && this.coffeeClock.asSeconds() > 0 ) {
            // 休息时间
            let now = this.coffeeClock.subtract(1000, 'milliseconds').format('mm:ss');
            if ( this.coffeeClock.asSeconds() < 60 ) now = '00:' + now;
            this.resetToolButtonText('☕ ' + now, TOOLBUTTON_TYPE);
        } else {
            alert('Out of Clock !');
        }
    }
}