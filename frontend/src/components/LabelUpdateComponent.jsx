import React, { Component } from 'react';
import { ListItem, ListItemIcon, ListItemText, Tooltip, InputBase } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import LabelIcon from '@material-ui/icons/Label'
import { deleteLabel, updateLabel } from '../services/NoteService';
import Done from '@material-ui/icons/Done'

class LabelUpdateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHover: false,
            labelData: props.labelData,
            renameLabel: false,
            label:props.labelData.label
        }
    }

    componentDidMount(){
        this.props.handleGetLabel()
    }

    labelDelete = () => {
        let labeId = {
            labelId: this.state.labelData._id
        }
        let response = deleteLabel(labeId)
        this.props.handleGetLabel()
        console.log('delete LABEL response', response);

    }


    handleChange = (e) => {
        
        const label = e.target.value
        this.setState({ label: label });
        console.log('data label')
    }

    onMouseEnterHandler = () => {
        this.setState({
            isHover: true
        });
    }

    onMouseLeaveHandler = () => {
        this.setState({
            isHover: false
        });
    }

    handleUpdate = () =>{
        this.setState({ renameLabel: false })
        let labelData ={ labelId: this.state.labelData._id
        ,label:this.state.label}
        let updateRes = updateLabel(labelData)
        this.props.handleGetLabel()
        console.log('update label response' , updateRes);
    }

    handleRename = () => {
        this.setState({ renameLabel: true })
    }

    render() {
        console.log('label name=============================>', this.state.labelData.label);

        return (
            <div>
                <div onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
                    <ListItem
                        // onClick={this.handleEditLabel} 
                        // className={this.state.onClickCss}
                        style={{ cursor: "pointer", display: "flex" }}>
                        {this.state.isHover ?
                            <Tooltip title="Delete label">
                                <ListItemIcon onClick={this.labelDelete}><Delete /></ListItemIcon>
                            </Tooltip>
                            :
                            <ListItemIcon ><LabelIcon /></ListItemIcon>
                        }
                        {this.state.renameLabel ?
                            <InputBase
                                multiline
                                placeholder="Rename label"
                                value={this.state.label}
                                name="Label"
                                onChange={e => this.handleChange(e)}
                                // type="text"
                                autoFocus
                                style={{ color: "#434343", fontSize: "15px", padding: "5px" }}
                            ></InputBase>
                            :
                            <ListItemText onClick={this.handleRename} primary={this.state.label} />
                        }
                        {this.state.renameLabel ?
                            <Tooltip title="Remame label">
                                <ListItemIcon onClick={this.handleUpdate}  style={{ justifyContent: "flex-end" }}><Done /></ListItemIcon>
                            </Tooltip>
                            :
                            <Tooltip title="Remame label">
                                <ListItemIcon onClick={this.handleRename} style={{ justifyContent: "flex-end" }}><Edit /></ListItemIcon>
                            </Tooltip>
                        }

                    </ListItem>
                </div>
            </div>
        );
    }
}

export default LabelUpdateComponent;