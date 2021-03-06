import React from 'react';
import { FormControl } from 'react-bootstrap';
import AutoFormGroup from './AutoFormGroup';

export default class TitleInputGroup extends React.Component {

    constructor(props) {
        super(props);
        //
        this.state = {
            value: this.props.value
        }
        //
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const newTitle = e.target.value;
        this.setState({
            value: newTitle
        });
        this.props.onTitleChange(newTitle);
    }

    render() {
        const { horizontal, controlId, label} = this.props;
        return (
            <AutoFormGroup {...{ horizontal, controlId, label }}>
                <FormControl
                    autoFocus={this.props.autoFocus}
                    type="text"
                    value={this.state.value}
                    placeholder="请输入标题"
                    onChange={this.handleChange}
                />
            </AutoFormGroup>
        )
    }

}