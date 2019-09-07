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
        // alert('Parmanent note deleted')
        console.log('Delete note',response)
    }

    handleDelete = () => {
        console.log('delete noteID::::',this.state.noteState.data.trash,this.state.noteState.id);
        if(this.state.noteState.data.trash){
            this.foreverDelete()
        }

        this.setState({ anchorEl: null });
        let tarshData = {noteId:this.state.noteState.id}
        updateTrash(tarshData)
        .then(async(response)=>{
            console.log('Trash note',response)
            this.props.changeDisplay()
            // await this.props.handleGetNotes()
        })
        .catch((error)=>{
            console.log('trash error',error)
        })
    }

    restoreNote = () =>{
        this.setState({ anchorEl: null ,openLabel:false });
        this.setState({trash: !this.state.noteState.data.trash})
        this.handleDelete();
        // alert('Restore note')
        console.log('Trash note',this.state.noteState.data.trash)
    }

    handleAddLabel = () =>{
        if(this.state.noteState.data.trash){
            this.restoreNote()
        }
        else{
            console.log('label update dialog{{{{{{{{}');
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
                        <MoreMenu style={{ width: "17px" }} />
                    </IconButton>
                </Tooltip>
                <div>
                    <MuiThemeProvider theme={theme}>

                    {this.state.openLabel ? 
                        <LabelComponent 
                        noteId={this.state.noteState.id}
                        openLabel={this.state.openLabel} 
                        handleLabelClose={this.handleLabelClose}
                        changeDisplay={this.props.changeDisplay}
                        
                        labels={this.props.labels}
                        ></LabelComponent>
                    :
                    <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleDelete}>{this.state.firstItem}</MenuItem>
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