import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../Css/displayNote.scss'
import { CardActions, Chip, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import ReminderComponent from './ReminderComponent';
import ColorComponent from './ColorComponent';
import ArchiveComponent from './ArchiveComponent';
import MoreComponent from './MoreComponent';
import EditNoteComponent from './EditNoteComponent';
import { deleteNoteLabel, deleteRemind } from '../services/NoteService';

const theme = createMuiTheme({
    overrides: {
        MuiCardContent: {
            root: {
                "last-child": {
                    "padding-bottom": "10px"
                }
            }
        }
    },
    MuiCardContent: {
        root: {
            padding: "5px"
        }
    }
})

let currentDate = new Date()
currentDate = JSON.stringify(currentDate)
currentDate = JSON.parse(currentDate)
currentDate = new Date(currentDate)
console.log("current date", currentDate);

class DisplayNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: props.noteData.title,
                description: props.noteData.description,
                archive: props.noteData.archive,
                trash: props.noteData.trash,
                notelabel: props.noteData.notelabel,
                color: props.noteData.notecolor,
                reminder: props.noteData.reminder
            },
            id: props.noteData._id,
            editNote: false,
            open: false,
            display: "block",
            noteColor: ''
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    changeDisplay = () => {
        this.setState({ display: "none" })
    }

    againDisplay = () => {
        this.setState({ display: "block" })
    }

    handleDelete = data => () => {
        let labelData = {
            noteId: this.state.id,
            labelId: data._id
        }
        console.log('data in dis note label', data._id);

        let deletedLabel = deleteNoteLabel(labelData)
        console.log("deleted label  ", deletedLabel)
        this.props.getNotes()
    };

    selectColor = (selectedColor) => {
        const data = this.state
        data['color'] = selectedColor
        this.setState({ data })
        console.log('color applied', selectedColor);
        // this.props.getNotes()
    }

    deleteReminder = data => () => {
        let Data = {
            noteId: this.state.id
        }
        console.log('data in dis note label', data._id);
        let deletedreminder = deleteRemind(Data)
        console.log("deleted label  ", deletedreminder)
        this.props.getNotes()
    }    

    render() {
        console.log("NOTE DATA in display note ", this.props.noteData.notelabel)
        const displayLabel = this.props.noteData.notelabel.map((key, index) => {
            return (
                <Chip
                    key={index}
                    label={key.label}
                    onDelete={this.handleDelete(key)}
                    style={{
                        height: "20px", minWidth: "100px"
                    }}
                />
            )
        })

        const displayReminder = this.props.noteData.reminder.map((key, index) => {
            return (
                <Chip
                    key={index}
                    label={key}
                    onDelete={this.deleteReminder(key)}
                    style={{
                        height: "20px", minWidth: "100px"
                    }}
                />
            )
        })

        return (
            <div>
                {!this.state.open || this.state.data.trash ?
                    <MuiThemeProvider theme={theme}>
                        <Card id={this.props.viewCss} style={{ display: this.state.display, background: this.state.data.color }}>
                            <div className="note-text-div" >
                                <div className="title-div" onClick={() => this.handleClickOpen()} >
                                    <CardContent style={{ paddingLeft: "0px" }}>
                                        {this.state.data.title}
                                    </CardContent>
                                </div>
                                <div className="desc-div" onClick={() => this.handleClickOpen()} >
                                    <CardContent style={{ padding: "0.50px" }}>
                                        {this.state.data.description}
                                    </CardContent>
                                </div>
                            </div>
                            <div className="label-div" >
                                {displayLabel}
                            </div>
                            <div className="label-div" >
                                {displayReminder}
                            </div>

                            <div className="Icon-div" >
                                <CardActions>
                                    {!this.state.data.trash ?
                                        <CardActions>

                                            <ReminderComponent
                                                getNotes={this.props.getNotes}
                                                id={this.state.id} />

                                            <ColorComponent
                                                selectColor={this.selectColor}
                                                id={this.state.id}
                                            />
                                            <ArchiveComponent changeDisplay={this.changeDisplay} id={this.state.id} archive={this.state.data.archive}
                                            // handleGetNotes={this.handleGetALLNotes}
                                            />
                                        </CardActions>
                                        :
                                        null
                                    }
                                    <MoreComponent
                                        changeDisplay={this.changeDisplay}
                                        noteState={this.state}
                                        getNotes={this.props.getNotes}
                                        labels={this.props.labelData}
                                    />
                                </CardActions>
                            </div>
                        </Card>
                    </MuiThemeProvider>
                    :
                    <EditNoteComponent
                        open={this.state.open}
                        handleClose={this.handleClose}
                        parentState={this.state}
                        changeDisplay={this.changeDisplay}
                        getNotes={this.props.getNotes}
                        labels={this.props.labelData}
                    />
                }
            </div>
        );
    }
}

export default DisplayNote;
