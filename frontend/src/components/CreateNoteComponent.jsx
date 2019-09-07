import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { InputBase, ClickAwayListener, Tooltip, IconButton } from '@material-ui/core';
import EditOutline from '@material-ui/icons/EditOutlined';
import { createNote } from '../services/NoteService';
import Snackbar from '@material-ui/core/Snackbar';
import ReminderComponent from './ReminderComponent';
import ColorComponent from './ColorComponent';
import ArchiveComponent from './ArchiveComponent';
import MoreComponent from './MoreComponent';
import Archive from '@material-ui/icons/ArchiveOutlined';

class CreateNoteComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: '',
                description: '',
                // reminder:'',
                notecolor:'',
                archive: false,
                trash:false,
                // notelabel:''
            },
            open: false,
            snackbaropen: false,
            snackbarmsg: '',
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

     handleClose (e) {
        e.preventDefault();
        this.setState({ open: false })

        if (this.state.data.title || this.state.data.description) {
            let noteInput = {
                title: this.state.data.title,
                description: this.state.data.description,
                archive : this.state.data.archive,
                notecolor : this.state.notecolor
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
        const data = this.state
        data ['notecolor'] = ''
        this.setState({data})
    }

    handleArchive = () =>{
        const { data } = this.state;
        data['archive'] = true;
        this.setState({ data });
        console.log(this.state.data.archive);
    }

    selectColor = (selectedColor) =>{
        const data = this.state
        data ['notecolor'] = selectedColor
        this.setState({data})
        console.log('color applied',selectedColor);
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
                                                // onChange={e => this.handleChange(e)} 
                                                > </InputBase>
                                            <EditOutline />
                                        </div>
                                    </CardContent>
                            </Card>
                            :
                            <Card id="new-note-card-large" style={{background:this.state.notecolor}} >
                                <CardContent style={{padding:"0px", background:this.state.notecolor }}>
                                    <div className="Note-bar-large" style={{ background:this.state.notecolor}}>
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
                                            <ColorComponent selectColor={this.selectColor} createNote='true'/>
                                            {/* <ArchiveComponent /> */}
                                            <Tooltip title="Archive">
                                                <IconButton onClick={this.handleArchive}><Archive style={{ width: "17px" }} /></IconButton>
                                            </Tooltip>
                                            <MoreComponent />
     
                                            <button className="close-button" onClick={this.handleClose} style={{ background:this.state.notecolor}}>Close</button>
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






















// import React, { Component } from 'react';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import { InputBase, ClickAwayListener } from '@material-ui/core';
// import EditOutline from '@material-ui/icons/EditOutlined';
// import { createNote } from '../services/NoteService';
// import Snackbar from '@material-ui/core/Snackbar';
// import ReminderComponent from './ReminderComponent';
// import ColorComponent from './ColorComponent';
// import ArchiveComponent from './ArchiveComponent';
// import MoreComponent from './MoreComponent';

// class CreateNoteComponent extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             data: {
//                 title: '',
//                 description: '',
//                 // reminder:'',
//                 // notecolor:'',
//                 archive: false,
//                 trash:false,
//                 // notelabel:''
//             },
//             open: false,
//             snackbaropen: false,
//             snackbarmsg: '',
//         }
//         this.handleClose = this.handleClose.bind(this)
//     }

//     snackBarClose = () => {
//         this.setState({ snackbaropen: false })
//     }

//     handleNewNote = () => {
//         this.setState({ open: true })
//     }

//     handleClickAway = (e) => {
//         this.setState({ open: false })
//         if (this.state.data.title || this.state.data.description) {
//             this.handleClose(e)
//             this.handleClear()
//         }
//     }

//     handleChange = (e) => {
//         const { data } = this.state;
//         data[e.target.name] = e.target.value;
//         this.setState({ data });
//     }

//     handleClear = () => {
//         const { data } = this.state;
//         data['title'] = "";
//         data['description'] = "";
//         this.setState({ data })
//     }

//      handleClose (e) {
//         e.preventDefault();
//         this.setState({ open: false })

//         if (this.state.data.title || this.state.data.description) {
//             let noteInput = {
//                 title: this.state.data.title,
//                 description: this.state.data.description,
//                 // archive : ''
//             }
//              createNote(noteInput)
//                 .then((response) => {
//                     this.props.handleGetNotes()
//                     console.log('Creare note response', response)
//                     this.handleClear()
//                 })
//                 .catch((error) => {
//                     console.log('Creare note response', error)
//                 })
//         }
//     }

//     render() {
//         return (
//             <div>
//                 <Snackbar
//                     anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//                     open={this.state.snackbaropen}
//                     autoHideDuration={5000}
//                     onClose={this.snackBarClose}
//                     message={<span id="message-id">{this.state.snackbarmsg}</span>}
//                 ></Snackbar>

//                 <div className="new-note-div" >
//                     <ClickAwayListener onClickAway={this.handleClickAway}>
//                         {!this.state.open ?
//                             <Card id="new-note-card" >
//                                     <CardContent style={{ padding: "14px" }}>
//                                         <div className="Note-bar">
//                                             <InputBase
//                                                 placeholder="Take a note..."
//                                                 onClick={this.handleNewNote}
//                                                 className="Take-a-note"
//                                                 value={this.state.data.title}
//                                                 name="title"
//                                                 // onChange={e => this.handleChange(e)} 
//                                                 > </InputBase>
//                                             <EditOutline />
//                                         </div>
//                                     </CardContent>
//                             </Card>
//                             :
//                             <Card id="new-note-card-large">
//                                 <CardContent style={{padding:"0px"}}>
//                                     <div className="Note-bar-large">
//                                         <InputBase
//                                             placeholder="Title"
//                                             value={this.state.data.title}
//                                             name="title"
//                                             onChange={e => this.handleChange(e)}
//                                             className="Take-a-note-large1"
//                                             type="text"
//                                             style={{ color: "#282c34" }}>
//                                         </InputBase>

//                                         <br />

//                                         <InputBase
//                                             multiline
//                                             placeholder="Take a note..."
//                                             value={this.state.data.description}
//                                             name="description"
//                                             onChange={e => this.handleChange(e)}
//                                             autoFocus
//                                             className="Take-a-note-large2"
//                                             type="text"
//                                             style={{ color:"#434343", fontSize: "15px" }}
//                                             >
//                                         </InputBase>
//                                         <div className="Icon-div">

//                                             <ReminderComponent />
//                                             <ColorComponent />
//                                             <ArchiveComponent />
//                                             <MoreComponent />
     
//                                             <button className="close-button" onClick={this.handleClose}>Close</button>
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                             }
//                     </ClickAwayListener>

//                 </div>
//             </div>
//         );
//     }
// }

// export default CreateNoteComponent;