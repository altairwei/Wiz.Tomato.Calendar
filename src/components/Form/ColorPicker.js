import React from 'react';
import { FormGroup, ControlLabel, Col} from 'react-bootstrap';
import ColorInput from './ColorInput';

export default class ColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(colorValue) {
        //向上传递
        this.props.onColorChange(colorValue);
    }

    render() {
        const isHorizontal = this.props.horizontal;
        const colorFormControl = (
            <ColorInput 
                value={this.props.value} //hex色彩值
                readOnly={this.props.readOnly}
                onChange={this.handleChange}
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