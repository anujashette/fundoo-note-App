import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { InputBase, ClickAwayListener, Tooltip, IconButton, Chip } from '@material-ui/core';
import EditOutline from '@material-ui/icons/EditOutlined';
import { createNote } from '../services/NoteService';
import Snackbar from '@material-ui/core/Snackbar';
import ReminderComponent from './ReminderComponent';
import ColorComponent from './ColorComponent';
import ArchiveComponent from './ArchiveComponent';
import MoreComponent from './MoreComponent';
import Archive from '@material-ui/icons/ArchiveOutlined';
import Cancel from '@material-ui/icons/Close'
import Reminder from '@material-ui/icons/WatchLaterOutlined'

class CreateNoteComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: '',
                description: '',
                reminder: [],
                notecolor: '',
                archive: false,
                trash: false,
                notelabel: []
            },
            open: false,
            snackbaropen: false,
            snackbarmsg: '',
            NoteType: true,
            reminderType:true,
            labelArray: [],
            labelArray2:[],
            reminderArray:[],
            

        }
        this.handleClose = this.handleClose.bind(this)
    }

    snackBarClose = () => {
        this.setState({ snackbaropen: false })
    }

    handleNewNote = () => {
        this.setState({ open: true })
    }

    handleClickAway = (e) => {
        if (this.state.data.title || this.state.data.description) {
            this.handleClose(e)
            this.handleClear()
        }
        this.setState({ open: false })
    }

    handleChange = (e) => {
        const { data } = this.state;
        data[e.target.name] = e.target.value;
        this.setState({ data });
    }

    handleClear = () => {
        const { data } = this.state;
        data['title'] = '';
        data['description'] = '';
        data['notecolor'] = '';
        data['notelabel'] = []
        this.setState({ data, labelArray: [] })
    }

    async handleClose(e) {
        e.preventDefault();
        this.setState({ open: false })

        if (this.state.data.title || this.state.data.description) {
            let noteInput = {
                title: this.state.data.title,
                description: this.state.data.description,
                reminder: this.state.data.reminder,
                archive: this.state.data.archive,
                notecolor: this.state.data.notecolor,
                notelabel: this.state.data.notelabel
            }
            await createNote(noteInput)
                .then((response) => {
                    this.props.handleGetNotes()
                    console.log('Creare note response', response)
                })
                .catch((error) => {
                    console.log('Creare note response', error)
                })
        }
        this.handleClear()

    }

    handleArchive = () => {
        const { data } = this.state;
        data['archive'] = true;
        this.setState({ data });
        console.log(this.state.data.archive);
    }

    selectColor = (selectedColor) => {
        this.setState({ open: true })
        const data = this.state
        data['notecolor'] = selectedColor
        this.setState({ data })
        console.log('color applied', selectedColor);
    }

    addLabel = (labelId, labels) => {
        const labelArray = this.state.labelArray.concat(labels)
        console.log("label array in create",labelArray);
        
        const { data } = this.state
        data['notelabel'] = data.notelabel.concat(labelId)
        this.setState({ data, labelArray })
        console.log("selected labels add//////////////////////////&***********************", this.state.data.notelabel);
    }

    deleteLabel = (labelId, labels) => {
       let index = this.state.labelArray.indexOf(labels)
        const labelArray = this.state.labelArray.splice(index, 0)
        index = this.state.labelArray.indexOf(labelId)
        const { data } = this.state
        data['notelabel'] = data.notelabel.splice(index, 0)
    // let labelArray2 = [];
    //     for(let i=0; i<this.state.labelArray.length; i++){
    //         if(this.state.labelArray[i] === labels){
    //             continue;
    //         }
    //         labelArray2 = this.state.labelArray2.concat(this.state.labelArray[i]) 
            
    //         console.log("labels",labelArray2);            

    //     }

    //     // console.log("label delete array",this.state.labelArray);

    //     console.log("label delete array",labelArray2);

        this.setState({ data, labelArray })
    }

    dummyFunction = () => {

    }

    createReminder = (reminderDate) =>{
        const reminderArray = this.state.reminderArray.concat(reminderDate)
        const {data} = this.state
        // data['reminder'] = data.reminder.concat(reminderDate)
        this.setState({reminderArray})
        console.log("reminderArray date",this.state.reminderArray);    
        // console.log("this state in create",this.state.data.reminder);    
    }

    render() {
        const displayLabel = this.state.labelArray.map((key, index) => {
            return (
                <Chip
                    key={index}
                    label={key}
                    // onDelete={this.handleDelete(key)}
                    style={{
                        height: "20px", minWidth: "100px"
                    }}
                />
            )
        })
        // const displayReminder = this.state.reminderArray.map((key, index) => {
        //     console.log("reminders in display",this.props.noteData.reminder);
            
        //     // if(this.props.noteData.reminder.length > 0 && this.props.noteData.reminder[0] !== null){
        //     //     let date = this.props.noteData.reminder
        //     //     date =  Date.parse(date)
        //     //     date = new Date(date)                
        //     return (
        //         <Chip
        //             icon={<Reminder style={{width:"18px",height:"18px"}}/>}
        //             key={index}
        //             label={key}
        //             // onDelete={this.deleteReminder(key)}
        //             deleteIcon={<Cancel style={{width:"18px",height:"18px"}}/>}
        //             style={{
        //                 height: "23px", minWidth: "100px"
        //             }}
        //         />
        //     )}
        // // }
        // )

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
                    {/* <ClickAwayListener onClickAway={this.handleClickAway}> */}
                    {!this.state.open ?
                        <Card id="new-note-card" >
                            <CardContent style={{ padding: "14px" }} >
                                <div className="Note-bar">
                                    <InputBase
                                        placeholder="Take a note..."
                                        onClick={this.handleNewNote}
                                        className="Take-a-note"
                                        value={this.state.data.title}
                                        name="title"
                                    > </InputBase>
                                    <EditOutline />
                                </div>
                            </CardContent>
                        </Card>
                        :
                        <Card id="new-note-card-large" style={{ background: this.state.notecolor }} >
                            <CardContent style={{ padding: "0px", background: this.state.notecolor }}>
                                <div className="Note-bar-large" style={{ background: this.state.notecolor }}>
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
                                        style={{ color: "#434343", fontSize: "15px" }}
                                    >
                                    </InputBase>
                                   
                                    <div className="label-div-create">
                                    {this.state.labelArray ?
                                        <div  >
                                            {displayLabel}
                                        </div>
                                        :
                                        null
                                    }

                                    {/* {this.state.reminderArray ?
                                        <div >
                                            {displayReminder}
                                        </div>
                                    :
                                        null
                                    } */}
                                    
                                    </div>
                                    <div className="Icon-div-edit">
                                    <ReminderComponent
                                    reminderType={this.state.reminderType}
                                    createReminder={this.createReminder}
                                    />
                                    <ColorComponent 
                                    selectColor={this.selectColor} 
                                    createNote={this.state.NoteType} />

                                    <Tooltip title="Archive">
                                        <IconButton onClick={this.handleArchive}><Archive style={{ width: "20px", height: "15px" }} /></IconButton>
                                    </Tooltip>
                                    <MoreComponent
                                        noteState={this.state}
                                        getNotes={this.dummyFunction}
                                        labels={this.props.labelData}
                                        NoteType={this.state.NoteType}
                                        addLabel={this.addLabel}
                                        deleteLabel={this.deleteLabel}
                                        getLabels={this.props.getLabels}
                                    />

                                    <button className="close-button" onClick={this.handleClose} style={{ background: this.state.notecolor }}>Close</button>
                                </div>
                                </div>
                            </CardContent>
                        </Card>
                }
                    {/* </ClickAwayListener> */}
                </div>
            </div>
        );
    }
}

export default CreateNoteComponent;