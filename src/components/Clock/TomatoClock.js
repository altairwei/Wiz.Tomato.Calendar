const moment = require("moment");
const momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);
import { WizExplorerWindow as objWindow, WizExplorerApp as objApp, WizBubbleMessage } from '../../utils/WizInterface';
const pluginPath = objApp.GetPluginPathByScriptFileName("TomatoCalendar_Global.js");
const clockIcon = pluginPath + 'assets/clock.ico';
const coffeeIcon = pluginPath + 'assets/coffee.ico';

const TomatoMins = 25;
const CoffeeMins = 5;

export default class Clock {
    constructor(event) {
        this.tomatoClock = moment.duration(TomatoMins, 'minutes');
        this.coffeeClock = moment.duration(CoffeeMins, 'minutes');
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
        this.resetStateToTomato('main');
    }

    resetStateToTomato(type = 'document') {
        objWindow.RemoveToolButton(type, "TomatoClock");
        objWindow.AddToolButtonEx(type, "TomatoClock", '🍅 25:00', '', '', "/ShowText=1");
    }

    resetStateToCoffee(type = 'document') {
        objWindow.RemoveToolButton(type, "TomatoClock");
        objWindow.AddToolButtonEx(type, "TomatoClock", '☕ 05:00', '', '', "/ShowText=1");
    }

    resetMainToolButtonText(text) {
        objWindow.RemoveToolButton("main", "TomatoClock");
        objWindow.AddToolButtonEx("main", "TomatoClock", text, '', '', "/ShowText=1");
    }

    tick() {
        // 判断切换点
        if ( this.tomatoClock.asMinutes() == TomatoMins && this.coffeeClock.asMinutes() == CoffeeMins ) {
            // 起始番茄时钟状态
            this.resetStateToTomato('main');
            WizBubbleMessage('番茄时间开始了！', '');
        } else if ( this.tomatoClock.asMinutes() == 0 && this.coffeeClock.asMinutes() == CoffeeMins ) {
            // 开始休息时间
            this.resetStateToCoffee('main');
            WizBubbleMessage('休息一会儿吧！', '');
        } else if ( this.tomatoClock.asMinutes() == 0 && this.coffeeClock.asMinutes() == 0 ) {
            // 新一轮循环
            this.resetStateToTomato('main');
            this.tomatoClock = moment.duration(TomatoMins, 'minutes');
            this.coffeeClock = moment.duration(5, 'minutes');
        }
        // 运行时钟
        if ( this.tomatoClock.asSeconds() > 0 && this.coffeeClock.asSeconds() > 0 ) {
            // 番茄时间
            let now = this.tomatoClock.subtract(1000, 'milliseconds').format('mm:ss');
            if ( this.tomatoClock.asSeconds() < 60 ) now = '00:' + now;
            //objWindow.UpdateToolButton("document", "TomatoClock", `/ButtonText=🍅 ${now}`, '');
            this.resetMainToolButtonText('🍅 ' + now);
        } else if ( this.tomatoClock.asSeconds() <= 0 && this.coffeeClock.asSeconds() > 0 ) {
            // 休息时间
            let now = this.coffeeClock.subtract(1000, 'milliseconds').format('mm:ss');
            if ( this.coffeeClock.asSeconds() < 60 ) now = '00:' + now;
            //objWindow.UpdateToolButton("document", "TomatoClock", `/ButtonText=☕ ${now}`, '');
            this.resetMainToolButtonText('☕ ' + now);
        } else {
            alert('Out of Clock !');
        }
    }
}