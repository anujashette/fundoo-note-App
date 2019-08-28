import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { IconButton, InputBase, ClickAwayListener, Tooltip } from '@material-ui/core';
import EditOutline from '@material-ui/icons/EditOutlined';
import { createNote } from '../services/NoteService';
import Undo from '@material-ui/icons/UndoRounded'
import Redo from '@material-ui/icons/RedoRounded'
import Snackbar from '@material-ui/core/Snackbar';
import ReminderComponent from './ReminderComponent';
import ColorComponent from './ColorComponent';
import ArchiveComponent from './ArchiveComponent';
import LabelComponent from './LabelComponent';
import { createMuiTheme, MuiThemeProvider, CardActions } from '@material-ui/core'

const theme = createMuiTheme({
    overrides: {

    }
})

class CreateNoteComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: '',
                description: '',
            },
            open: false,
            snackbaropen: false,
            snackbarmsg: '',
        }
    }

    snackBarClose = () => {
        this.setState({ snackbaropen: false })
    }

    handleNewNote = () => {
        this.setState({ open: true })
    }

    handleClickAway = (e) => {
        this.setState({ open: false })
        if (this.state.data.title || this.state.data.description) {
            this.handleClose(e)
            this.handleClear()
        }
    }

    handleChange = (e) => {
        const { data } = this.state;
        data[e.target.name] = e.target.value;
        this.setState({ data });
    }

    handleClear = () => {
        const { data } = this.state;
        data['title'] = "";
        data['description'] = "";
        this.setState({ data })
    }

    handleClose = (e) => {
        this.setState({ open: false })

        e.preventDefault();
        if (this.state.data.title || this.state.data.description) {
            let noteInput = {
                title: this.state.data.title,
                description: this.state.data.description
            }
            createNote(noteInput)
                .then((response) => {
                    this.props.handleGetNotes()
                    console.log('Creare note response', response)
                    this.handleClear()
                })
                .catch((error) => {
                    console.log('Creare note response', error)
                })
        }
    }

    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.state.snackbaropen}
                    autoHideDuration={5000}
                    onClose={this.snackBarClose}
                    message={<span id="message-id">{this.state.snackbarmsg}</span>}
                ></Snackbar>

                <div className="new-note-div" >
                    <ClickAwayListener onClickAway={this.handleClickAway}>
                        {!this.state.open ?
                            <Card id="new-note-card" >
                                    <CardContent style={{ padding: "14px" }}>
                                        <div className="Note-bar">
                                            <InputBase
                                                placeholder="Take a note..."
                                                onClick={this.handleNewNote}
                                                className="Take-a-note"
                                                value={this.state.data.title}
                                                name="title"
                                                // onChange={e => this.handleChange(e)} 
                                                > </InputBase>
                                            <EditOutline />
                                        </div>
                                    </CardContent>
                            </Card>
                            :
                            <Card id="new-note-card-large" >
                                <CardContent style={{padding:"0px"}}>
                                    <div className="Note-bar-large">
                                        <InputBase
                                            placeholder="Title"
                                            value={this.state.data.title}
                                            name="title"
                                            onChange={e => this.handleChange(e)}
                                            className="Take-a-note-large1"
                                            type="text"
                                            style={{ color: "#282c34" }}>
                                        </InputBase>

                                        <br />

                                        <InputBase
                                            multiline
                                            placeholder="Take a note..."
                                            value={this.state.data.description}
                                            name="description"
                                            onChange={e => this.handleChange(e)}
                                            autoFocus
                                            className="Take-a-note-large2"
                                            type="text"
                                            style={{ color:"#434343", fontSize: "15px" }}
                                            >
                                        </InputBase>
                                        <div className="Icon-div">

                                            <ReminderComponent />
                                            <ColorComponent />
                                            <ArchiveComponent />
                                            <LabelComponent />
                                            <Tooltip title="Undo">
                                                <IconButton><Undo style={{ width: "17px" }} /></IconButton>
                                            </Tooltip>
                                            <Tooltip title="Redo">
                                                <IconButton><Redo style={{ width: "17px" }} /></IconButton>
                                            </Tooltip>
                                            <button className="close-button" onClick={this.handleClose}>Close</button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            }
                    </ClickAwayListener>

                </div>
            </div>
        );
    }
}

export default CreateNoteComponent;