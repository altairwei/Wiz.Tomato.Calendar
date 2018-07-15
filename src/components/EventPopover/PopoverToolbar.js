import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ButtonGroup, ButtonToolbar, SplitButton, DropdownButton, MenuItem } from 'react-bootstrap';

export default class PopoverToolbar extends React.Component {

    render() {
        //
        return (
            <ButtonToolbar>
                <ButtonGroup>
                    <Button id='tc-editpopper-save' 
                        onClick={this.props.onSaveBtnClick}
                        disabled={!this.props.enableSaveBtn}>
                        保存
                    </Button>
                    <Button id='tc-editpopper-finish'
                        onClick={this.props.onCompleteBtnClick}>
                        完成
                    </Button>
                    <Button id='tc-editpopper-edit'>
                        编辑
                    </Button>
                    <SplitButton pullRight 
                        title='删除' 
                        id='tc-editpopper-delete' 
                        onClick={this.props.onDeleteDataBtnClick}>
                        <MenuItem 
                            eventKey="1" 
                            id='tc-editpopper-openEventDoc'
                            onClick={this.props.onOpenDocBtnClick}>
                            打开源文档
                        </MenuItem>
                        <MenuItem 
                            eventKey="2" 
                            id='tc-editpopper-deleteEventDoc'
                            onClick={this.props.onDeleteDocBtnClick}>
                            删除源文档
                        </MenuItem>
                    </SplitButton>
                </ButtonGroup>
            </ButtonToolbar>
        )
    }
}