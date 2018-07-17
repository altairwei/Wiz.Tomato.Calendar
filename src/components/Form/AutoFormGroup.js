import React from 'react';
import { FormGroup, ControlLabel, Col} from 'react-bootstrap';

export default class AutoFormGroup extends React.Component {

    render() {
        const isHorizontal = this.props.horizontal;
        if (isHorizontal) {
            return (
                <FormGroup controlId={this.props.id}>
                    <Col componentClass={ControlLabel} sm={2}>
                        {this.props.label}
                    </Col>
                    <Col sm={10}>
                        {this.props.children}
                    </Col>
                </FormGroup>
            )
        } else {
            return (
                <FormGroup controlId={this.props.id}>
                    <ControlLabel>{this.props.label}</ControlLabel>
                    {this.props.children}
                </FormGroup>                
            )
        }

    }
}