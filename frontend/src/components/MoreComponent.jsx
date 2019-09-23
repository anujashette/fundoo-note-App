import React, { Component } from 'react';
import MoreMenu from '@material-ui/icons/MoreVert';
import { Tooltip, IconButton, createMuiTheme, MuiThemeProvider, Menu, MenuItem } from '@material-ui/core';
import { updateTrash, deleteNote } from '../services/NoteService';
import LabelComponent from './LabelComponent';


const theme = createMuiTheme({
    overrides: {
        MuiMenu: {
            paper: {
                "height": "17%",
                "width": "10%"
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

class MoreComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openLabel: false,
            anchorEl: null,
            noteState: props.noteState,
            firstItem:'Delete note',
            secondItem:'Add label'
        }
    }

    handleMore = (event) => {
        if(this.state.noteState.data.trash){
            this.handleTrash()
        }
        this.setState({ openMore: true, anchorEl: event.currentTarget })
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleTrash = () =>{
        this.setState({firstItem:'Delete forever', secondItem:'Restore'})
    }

    foreverDelete = ()=>{
        this.setState({ anchorEl: null });
        let deleteId = {noteId:this.state.noteState.id}
        let response = deleteNote(deleteId)
        this.props.changeDisplay()
        console.log('Delete note',response)
    }

    handleDelete = () => {
        console.log('delete noteID::::',this.state.noteState.data.trash,this.state.noteState.id);
        if(this.state.noteState.data.trash){
            this.foreverDelete()
        }
        else{
        this.setState({ anchorEl: null });
        let tarshData = {noteId:this.state.noteState.id}
        updateTrash(tarshData)
        .then(async(response)=>{
            console.log('Trash note',response)
            this.props.changeDisplay()
        })
        .catch((error)=>{
            console.log('trash error',error)
        })
       }
    }

    restoreNote = () =>{
        let data = this.state.noteState.data
        data['trash'] = false
        this.setState({ anchorEl: null ,openLabel:false,data});
        // this.setState({trash: false})
        console.log('Trash note',this.state.noteState.data)
        this.handleDelete();
        // alert('Restore note')
    }

    handleAddLabel = () =>{
        if(this.state.noteState.data.trash){
            this.restoreNote()
        }
        else{
            this.setState({ anchorEl: null , openLabel:true });
        }
    }

    handleLabelClose = () =>{
        this.setState({anchorEl: null,openLabel:false})
    }

    render() {
        console.log('labels in more  menu' ,this.props.labels);
        return (
            <div>
                <Tooltip title="More">
                    <IconButton
                        aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMore}>
                        <MoreMenu style={{  height: "15px",width:" 15px"}}/>
                    </IconButton>
                </Tooltip>
                <div>
                    <MuiThemeProvider theme={theme}>

                    {this.state.openLabel ? 
                        <LabelComponent 
                        noteId={this.state.noteState.id}
                        openLabel={this.state.openLabel} 
                        handleLabelClose={this.handleLabelClose}
                        getNotes = {this.props.getNotes}
                        labels={this.props.labels}
                        addLabel={this.props.addLabel}
                        deleteLabel={this.props.deleteLabel}
                        NoteType={this.props.NoteType}
                        getLabels={this.props.getLabels}
                        ></LabelComponent>
                    :
                    <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    {!this.props.NoteType ?
                        <MenuItem onClick={this.handleDelete}>{this.state.firstItem}</MenuItem>
                    :
                        null
                    }
                        <MenuItem onClick={this.handleAddLabel}>{this.state.secondItem}</MenuItem>
                </Menu>
                    }
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}

export default MoreComponent;