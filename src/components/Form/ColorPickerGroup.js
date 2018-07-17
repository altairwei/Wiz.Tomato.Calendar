import React from 'react';
import { FormGroup, ControlLabel, Col} from 'react-bootstrap';
import ColorInput from './ColorInput';
import AutoFormGroup from './AutoFormGroup';

export default class ColorPickerGroup extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(colorValue) {
        //向上传递
        this.props.onColorChange(colorValue);
    }

    render() {
        return (
            <AutoFormGroup {...this.props}>
                <ColorInput 
                    value={this.props.value} //hex色彩值
                    readOnly={this.props.readOnly}
                    onChange={this.handleChange}
                />
            </AutoFormGroup>            
        )

    }
}