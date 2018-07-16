import React from 'react';
import ReactDOM from 'react-dom';
import { FormGroup, ControlLabel, Col, FormControl } from 'react-bootstrap';
const Huebee = require('huebee/dist/huebee.pkgd'); 
import 'huebee/dist/huebee.css';

export default class ColorInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        //处理手动输入变更，传入颜色hex
        const colorValue = e.target.value
        this.props.onChange(colorValue);
    }

    //TODO: 根据饱和度计算字体颜色

    componentDidMount() {
        // 初始化组件
        this.huebeeInstance = new Huebee(this.el, {
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
        //手动更新
        this.huebeeInstance.setColor(this.props.value);
        //处理颜色选择
        this.huebeeInstance.on( 'change', this.props.onChange)
    }

    componentDidUpdate(prevProps) {
        // 手动更新
        this.huebeeInstance.setColor(this.props.value);
    }

    componentWillUnmount() {
        //注意，huebee没有destroy的方法
    }

    render() {

        return (
            <input type='text' 
                className='form-control' 
                ref={el => this.el = el}
                onChange={this.handleChange}
            />
        )

    }
}