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
import { deleteNoteLabel, deleteRemind, getAllNote, getANote } from '../services/NoteService';
import Cancel from '@material-ui/icons/Close'
import Reminder from '@material-ui/icons/WatchLaterOutlined'

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
            noteColor: '',
            isHover: false,
            noteType:false
        }
    }

    getANote = () =>{
        let getId = {noteId:this.state.id}
        let data = this.state.data
        getANote(getId)
        .then((res)=>{
            // console.log("get a note",res.data.data[0].title);
            data['title'] = res.data.data[0].title
            data['description'] = res.data.data[0].description
            data['archive'] = res.data.data[0].archive
            data['trash'] = res.data.data[0].trash
            data['notelabel'] = res.data.data[0].notelabel
            data['color'] = res.data.data[0].notecolor
            data['reminder'] = res.data.data[0].reminder

            console.log("data from note",res.data.data[0].reminder);
            this.setState({data})            
        })
        .catch((error)=>{
            console.log("error",error);
        })
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

    handleDelete = data => async() => {
        let labelData = {
            noteId: this.state.id,
            labelId: data._id
        }
        console.log('data in dis note label', data._id);

        let deletedLabel = await deleteNoteLabel(labelData)
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
        // this.getANote()

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

    dummyFunction = () => {

    }

    render() {
        console.log("NOTE DATA in display note ", this.props.noteData.notelabel)
        const displayLabel = this.props.noteData.notelabel.map((key, index) => {
            console.log("label undefined=====================================>",key);
            if(key !== null){
            return (
                <Chip
                    key={index}
                    label={key.label}
                    onDelete={this.handleDelete(key)}
                    deleteIcon={<Cancel style={{width:"18px",height:"18px"}}/>}
                    style={{
                        height: "20px", maxWidth: "100px"
                    }}
                />
            )}
        })

        const displayReminder = this.props.noteData.reminder.map((key, index) => {
            console.log("reminders in display",this.props.noteData.reminder);
            
            if(this.props.noteData.reminder.length > 0 && this.props.noteData.reminder[0] !== null){
                let date = this.props.noteData.reminder
                date =  Date.parse(date)
                date = new Date(date)                
            return (
                <Chip
                    icon={<Reminder style={{width:"18px",height:"18px"}}/>}
                    key={index}
                    label={date.toLocaleString()}
                    onDelete={this.deleteReminder(key)}
                    deleteIcon={<Cancel style={{width:"18px",height:"18px"}}/>}
                    style={{
                        height: "23px", minWidth: "100px"
                    }}
                />
            )}
        })

        return (
            <div className="note" >
                {!this.state.open || this.state.data.trash ?
                    <MuiThemeProvider theme={theme}>
                        <Card id={this.props.viewCss} style={{ display: this.state.display ,background: this.state.data.color}}>
                            <div className="note-text-div"  style={{ background: this.state.data.color }}>
                                <div className="title-div" onClick={() => this.handleClickOpen()} >
                                        {this.state.data.title}
                                </div>
                                <div className="desc-div" onClick={() => this.handleClickOpen()} >
                                        {this.state.data.description}
                                </div>
                            </div>
                            <div className="label-div" >
                                {displayLabel}
                            </div>
                            <div className="label-div" >
                                {displayReminder}
                            </div>

                            <div className="icon-div">
                               <span className="icon-all-span">

                                    {!this.state.data.trash ?
                                        <span className="span-icon">
                                            <ReminderComponent
                                                getNotes={this.props.getNotes}
                                                id={this.state.id} />
        
                                            <ColorComponent
                                                selectColor={this.selectColor}
                                                id={this.state.id}
                                                getANote={this.getANote}
                                            />

                                            <ArchiveComponent changeDisplay={this.changeDisplay} id={this.state.id} archive={this.state.data.archive}
                                            />
                                            </span>
                                        :
                                        null
                                    }
                                    <MoreComponent
                                        changeDisplay={this.changeDisplay}
                                        noteState={this.state}
                                        getNotes={this.props.getNotes}
                                        labels={this.props.labelData}
                                        NoteType={this.state.noteType}
                                        addLabel={this.dummyFunction}
                                        deleteLabel={this.dummyFunction}
                                        getLabels={this.props.getLabels}
                                        />
                                    </span>
                            </div>
                        </Card>
                    </MuiThemeProvider>
                    :
                    <EditNoteComponent
                        // open={this.state.open}
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
