import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, ControlLabel, Col, FormControl } from 'react-bootstrap';
const Huebee = require('huebee/dist/huebee.pkgd'); 
import 'huebee/dist/huebee.css';

// 重写方法以触发change事件
Huebee.prototype.setTexts = function() {
    if ( !this.setTextElems ) {
        return;
    }
    for ( var i=0; i < this.setTextElems.length; i++ ) {
        var elem = this.setTextElems[i];
        var property = elem.nodeName == 'INPUT' ? 'value' : 'textContent';
        // 触发change事件
        if ( elem.value != this.color ) {
            elem[ property ] = this.color;
            elem.dispatchEvent(new Event('change'));
        }
    }
};

export default class ColorPicker extends React.Component {
    constructor(props) {
        super(props);
    }

    //TODO: 根据饱和度计算字体颜色

    componentDidMount() {
        // 初始化组件
        this.input = ReactDOM.findDOMNode(this.inputFormControl);
        this.huebeeInstance = new Huebee(this.input, {
            staticOpen: false, // Displays open and stays open. 
            setText: true, // Sets elements’ text to color. 将原始的文本设置设置成颜色值.
            setBGColor: true, // Sets elements’ background color to color.
            hues: 12, // Number of hues of the color grid. Hues are slices of the color wheel.
            hue0: 0, // The first hue of the color grid. 
            shades: 5, // Number of shades of colors and shades of gray between white and black. 
            saturations: 2, // Number of sets of saturation of the color grid.
            notation: 'hex', // Text syntax of colors values.
            className: null, // Class added to Huebee element. Useful for CSS.
            customColors: [ 
                '#32CD32', '#5484ED', '#A4BDFE', 
                '#46D6DB', '#7AE7BF', '#51B749',
                '#FBD75B', '#FFB878', '#FF887C', 
                '#DC2127', '#DBADFF', '#E1E1E1'	
            ]
        });
    }

    render() {
        //TODO: 读取父元素horizontal属性，决定条件渲染
        const isHorizontal = this.props.horizontal;
        const colorFormControl = (
            <FormControl type="text"
                ref={(instance) => this.inputFormControl = instance}
                value={this.props.value} //hex色彩值
                style={{ //改变颜色
                    backgroundColor: `${this.props.value}`
                }} 
                readOnly={this.props.readOnly}
                onChange={this.props.onInputChange}
            />            
        )
        if (isHorizontal) {
            return (
                <FormGroup controlId={this.props.id}>
                    <Col componentClass={ControlLabel} sm={2}>
                        {this.props.label}
                    </Col>
                    <Col sm={10}>
                        {colorFormControl}
                    </Col>
                </FormGroup>
            )
        } else {
            return (
                <FormGroup controlId={this.props.id}>
                    <ControlLabel>{this.props.label}</ControlLabel>
                    {colorFormControl}
                </FormGroup>                
            )
        }

    }
}