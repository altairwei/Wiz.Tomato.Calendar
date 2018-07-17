import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ButtonGroup, ButtonToolbar, SplitButton, DropdownButton, MenuItem } from 'react-bootstrap';

export default class PopoverToolbar extends React.Component {

    render() {
        //
        return (
            <ButtonToolbar>
                <ButtonGroup>
                    <Button id='tc-editpopper-Save' 
                        onClick={this.props.onBtnClick}
                        disabled={!this.props.enableSaveBtn}>
                        保存
                    </Button>
                    <Button id='tc-editpopper-Complete'
                        onClick={this.props.onBtnClick}>
                        {parseInt(this.props.complete) == 5 ? '恢复' : '完成'}
                    </Button>
                    <Button id='tc-editpopper-Edit'
                        onClick={this.props.onBtnClick}>
                        编辑
                    </Button>
                    <SplitButton pullRight 
                        title='删除' 
                        id='tc-editpopper-DeleteData' 
                        onClick={this.props.onBtnClick}>
                        <MenuItem 
                            eventKey="1" 
                            id='tc-editpopper-OpenDoc'
                            onClick={this.props.onBtnClick}>
                            打开源文档
                        </MenuItem>
                        <MenuItem 
                            eventKey="2" 
                            id='tc-editpopper-DeleteDoc'
                            onClick={this.props.onBtnClick}>
                            删除源文档
                        </MenuItem>
                    </SplitButton>
                </ButtonGroup>
            </ButtonToolbar>
        )
    }
}