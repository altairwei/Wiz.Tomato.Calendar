import React from 'react';
import AutoFormGroup from './AutoFormGroup';
import 'awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css';

class WeekCheckboxBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            weekDay: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    }

    handleChange(e) {
        console.log(this.state)
    }

    handleCheckboxClick(e) {
        const checkbox = e.target;
        this.setState(function(prevState){
            const weekDay = prevState.weekDay;
            weekDay.push(checkbox.value);
            return { weekDay };
        })
    }

    componentDidMount() {
        /*
        // 初始化组件
        this.$el = $(this.el).selectpicker({
            style: 'btn-default'
        });
        //
        this.instance = this.$el.data('selectpicker');
        // 初始化值
        this.instance.val(this.props.value)
        // 绑定change事件
        this.$el.on("changed.bs.select", this.handleChange);
        */
    }

    render() {
        return (
            <div>
                <div className="checkbox checkbox-inline checkbox-success">
                    <input type="checkbox" id="checkbox1" value="1" 
                        className="styled"
                        onClick={this.handleCheckboxClick}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="checkbox1"> 一</label>
                </div>
                <div className="checkbox checkbox-inline">
                    <input type="checkbox" id="checkbox2" value="2" 
                        onClick={this.handleCheckboxClick}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="checkbox2"> 二</label>
                </div>
                <div className="checkbox checkbox-inline">
                    <input type="checkbox" id="checkbox3" value="3" 
                        onClick={this.handleCheckboxClick}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="checkbox3"> 三</label>
                </div>
                <div className="checkbox checkbox-inline">
                    <input type="checkbox" id="checkbox4" value="4" 
                        onClick={this.handleCheckboxClick}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="checkbox4"> 四</label>
                </div>
                <div className="checkbox checkbox-inline">
                    <input type="checkbox" id="checkbox5" value="5" 
                        onClick={this.handleCheckboxClick}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="checkbox5"> 五</label>
                </div>
                <div className="checkbox checkbox-inline">
                    <input type="checkbox" id="checkbox6" value="6" 
                        onClick={this.handleCheckboxClick}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="checkbox6"> 六</label>
                </div>
                <div className="checkbox checkbox-inline">
                    <input type="checkbox" id="checkbox7" value="7" 
                        onClick={this.handleCheckboxClick}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="checkbox7"> 日</label>
                </div>
            </div>
        )
    }

}

export default function WeekCheckboxGroup(props) {
    const { horizontal, controlId, label } = props;
    return (
        <AutoFormGroup {...{ horizontal, controlId, label }}>
            <WeekCheckboxBar {...props}/>
        </AutoFormGroup>      
    )
}