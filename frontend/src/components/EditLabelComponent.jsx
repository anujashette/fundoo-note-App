import React, { Component } from 'react';
import { Dialog, InputBase, Divider, DialogContent, ListItem, ListItemIcon, ListItemText, IconButton, Tooltip, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import LabelIcon from '@material-ui/icons/Label'
import Done from '@material-ui/icons/Done'
import Edit from '@material-ui/icons/Edit'
import Close from '@material-ui/icons/Close'
import Delete from '@material-ui/icons/Delete'
import { addLabel } from '../services/NoteService';
import LabelUpdateComponent from './LabelUpdateComponent';

const theme = createMuiTheme({
    overrides: {
        MuiDialog: {
            paperWidthSm: {
                "width": " auto",
                "height":"auto",
                "max-width":"300px",
                "border-radius": "10px"
            }
        },
        MuiBackdrop: {
            root: {
                "position": "relative",
                "touch-action": "none",
                "background-color": "rgba(0, 0, 0, 0.0)",
                "-webkit-tap-highlight-color": "transparent"
            }
        }
    }
})

class EditLabelComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openLabel: true,
            label: '',
            labelArray: this.props.labelData,
            labelEditor:false,
            isHover:false,
            labelClick:''
        }
    }

    componentDidMount(){
        this.props.handleGetLabel()
        this.setState({labelArray: this.props.labelData})
    }

    handleChange = (e) => {
        let label = e.target.value
        this.setState({ label: label });
    }

    handleClose = () =>{
       this.setState({ labelEditor:false,label:''})
    //    this.props.handleGetLabel()
    }

    OpenEditor = () =>{
        this.setState({labelEditor:true})
    }

    handleCreate = () =>{
        this.setState({label:'', labelEditor:false})
        let labelData ={ label: this.state.label}
        let response = addLabel(labelData);
        this.props.handleGetLabel()
    }

    handleLabel = ( ) =>{
        
    }

    render() {
        console.log("EditLabelComponent");
        
        if (this.state.labelArray) {
            var labels = this.state.labelArray.map((key, index) => {
                if (!key.isDeleted) {
                    return (
                        <LabelUpdateComponent 
                        handleGetLabel={this.props.handleGetLabel}
                        labelData = {key}
                        key={index}/>)
                }
                else
                    return null
            })
        }

        return (
            <div>
                <MuiThemeProvider theme={theme}>
                <Dialog
                    open={this.state.openLabel}
                    onClose={this.props.handleLabelClose}
                    aria-labelledby="form-dialog-title"
                    // style={{height:"10px"}}
                >
                    <div className="edit-label-1">
                        <DialogContent>Edit labels</DialogContent>

                        {this.state.labelEditor ?
                                 <ListItem
                                 style={{ cursor: "pointer", display: "flex" }}>
                            <Tooltip title="Cancel">
                                 <ListItemIcon onClick={this.handleClose}>< Close/></ListItemIcon>
                            </Tooltip>
                                 <InputBase
                                    multiline
                                    placeholder="+ create new label"
                                    value={this.state.label}
                                    name="Label"
                                    onChange={e => this.handleChange(e)}
                                    type="label"
                                    style={{ color: "#434343", fontSize: "15px", padding: "5px" }}
                                 ></InputBase>
                            <Tooltip title="Create label">

                                <IconButton  onClick={this.handleCreate} style={{ justifyContent: "flex-end" }}><Done /></IconButton>
                            </Tooltip> 
                             </ListItem>
                            :
                            <ListItem
                            style={{ cursor: "pointer", display: "flex" }}>

                            {/* <ListItemIcon ><p/></ListItemIcon> */}

                            <InputBase
                                multiline
                                placeholder="+ create new label"
                                value="+ create new label"
                                name="Label"
                                onClick={ this.OpenEditor}
                                type="label"
                                style={{ color: "#434343", fontSize: "15px", padding: "5px" }}
                            ></InputBase>
                            {/* <ListItemIcon><p/></ListItemIcon> */}

                        </ListItem>  
                        }
                        <div className="label-edit-div">
                            {labels}
                        </div>
                    </div>

                    <Divider />
                    <div className="edit-label-2">
                        <button className="done-button" onClick={this.props.handleLabelClose}>Done</button>
                    </div>
                </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default EditLabelComponent;