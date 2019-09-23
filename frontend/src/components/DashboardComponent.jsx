import React, { Component } from 'react';
import AppBarComponent from './AppBarComponent';
import CreateNoteComponent from './CreateNoteComponent';
import DisplayGrid from './DisplayGrid';
import { getAllNote, getAllLabel, getArchive, getTrash, getSearchNote, getReminder, getLatestNote } from '../services/NoteService'
import EditLabelComponent from './EditLabelComponent'
import { Redirect } from 'react-router-dom'
import LatestComponent from './LatestComponent';
class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteData: [],
            labelData: [],
            noteType: false,
            menuName: 'Fundoo',
            noNotes: 'Your notes appear here',
            openLabel: false,
            labelEditor: false,
            gridview: true,
            viewCss: 'Display-note-card'
        }
        this.handleGetLabel = this.handleGetLabel.bind(this)
    }

    async componentDidMount() {
        // if (!this.state.noteType) {
        await this.handleGetNotes();
        // } 
        this.handleGetLabel()
        // await this.getNotes()
    }

    async handleGetNotes() {
        this.setState({ noteData: [], menuName: 'Fundoo', noteType: false, noNotes: 'Your notes appear here' })

        await getAllNote()
            .then((response) => {
                console.log('get all note data=====>', response.data.data)
                this.setState({ noteData: response.data.data, lastPage: response.data.totalpages })
                console.log('get all note data in state=====>', this.state.noteData)
            })
            .catch((error) => {
                console.log('get all note error =====>', error)
            })
    }

     handleLatest = () => {
        this.setState({ noteData: [], menuName: 'Latest', noteType: false, noNotes: 'Your latest notes appear here' })

         getLatestNote()
            .then((response) => {
                console.log('get latest note data=====>', response.data.data.readData)
                this.setState({ noteData: response.data.data.readData })
                console.log('get latest note data in state=====>', this.state.noteData)
            })
            .catch((error) => {
                console.log('get all note error =====>', error)
            })
    }

    async handleGetLabel() {
        this.setState({ labelData: [] })
        await getAllLabel()
            .then((response) => {
                console.log('get all labels==>', response)
                this.setState({ labelData: response.data.data })
            })
            .catch((error) => {
                console.log('error in label', error);
            })
    }

    archiveNotes = () => {
        this.setState({ noteData: [], noNotes: 'Your archive notes appear here', noteType: true, menuName: 'Archive' })
        getArchive()
            .then((archiveData) => {
                console.log('archive data', archiveData.data.data)
                this.setState({ noteData: archiveData.data.data })

            }).catch((error) => {
                console.log('add label', error)
            })
    }

    searchNotes = (searchKey) => {
        console.log("in dashboard", searchKey);
        if (searchKey === '') {
            this.handleGetNotes()
        }
        else {
            this.setState({ noteData: [], noNotes: 'Note not available' })
            let searchData = { searchKey: searchKey }
            getSearchNote(searchData)
                .then((response) => {
                    console.log('get all note data=====>', response.data.data)
                    this.setState({ noteData: response.data.data })
                    console.log('get all note data in state=====>', { noNotes: 'Your archive notes appear here' })
                })
                .catch((error) => {
                    console.log('get all note error =====>', error)
                })
        }
    }

    trashNotes = () => {
        this.setState({ noteData: [], noNotes: 'Your bin notes appear here', noteType: true, menuName: 'Bin' })
        getTrash()
            .then((trashData) => {
                console.log('trash data', trashData.data.data)
                this.setState({ noteData: trashData.data.data })
            }).catch((error) => {
                console.log('add label', error)
            })
    }

    reminderNotes = () => {
        this.setState({ noteData: [], noNotes: 'Your reminder notes appear here', noteType: true, menuName: 'Reminder' })
        getReminder()
            .then((reminderRes) => {
                console.log("reminder response", reminderRes.data.data);
                this.setState({ noteData: reminderRes.data.data })

            }).catch((error) => {
                console.log('reminder notes', error)
            })
    }

    getNotes = () => {
        this.setState({ noteType: false })
        this.handleGetLabel()
        this.handleGetNotes();
    }

    getNote = () =>{
        this.handleGetNotes()
    }
    getLabels = () => {
        this.handleGetLabel()
    }

    handleEditLabel = () => {
        this.setState({ labelEditor: true, openLabel: true })
        console.log("label editor", this.state.openLabel);
    }

    handleLabelClose = () => {
        this.setState({ labelEditor: false, openLabel: false })
    }

    gridView = () => {
        this.setState({ gridview: !this.state.gridview })
        if (this.state.gridview) {
            console.log(' grid', this.state.gridview);
            this.setState({ viewCss: "Display-note-card-list" })
        }
        else {
            console.log('list', this.state.gridview);
            this.setState({ viewCss: "Display-note-card" })
        }
    }

    render() {
        let dashboard = null
        if (localStorage.getItem('token1') !== null) {
            dashboard = (
                <div>
                    <AppBarComponent
                        menuName={this.state.menuName}
                        labelData={this.state.labelData}
                        handleGetNotes={this.getNotes}
                        handleEditLabel={this.handleEditLabel}
                        archiveNotes={this.archiveNotes}
                        trashNotes={this.trashNotes}
                        gridView={this.gridView}
                        searchNotes={this.searchNotes}
                        reminderNotes={this.reminderNotes}
                        props={this.props.props} />

                    {!this.state.noteType ?
                        <CreateNoteComponent
                            handleGetNotes={this.getNotes}
                            labelData={this.state.labelData}
                            getLabels={this.getLabels} />
                        :
                        <div className="null-div"></div>
                    }

                    {this.state.labelEditor ?
                        <EditLabelComponent
                            handleGetLabel={this.getLabels}
                            openLabel={this.state.openLabel}
                            labelData={this.state.labelData}
                            handleLabelClose={this.handleLabelClose}
                        >
                        </EditLabelComponent>
                        :
                        null
                    }
                    {!this.state.noteType ?
                        <div className="latest-div">
                            <LatestComponent 
                           getNote = {this.getNote}
                           handleLatest = {this.handleLatest}/>
                        </div>
                        :
                        <div className="null-div"></div>
                    }

                    <DisplayGrid
                        noNotes={this.state.noNotes}
                        noteData={this.state.noteData}
                        labelData={this.state.labelData}
                        Display={this.state.gridview}
                        getLabels={this.getLabels}
                        getNotes={this.getNotes}
                        viewCss={this.state.viewCss} />
                </div>
            )
        } else {
            dashboard = (this.props.props.history.push('/')
            )
        }
        return (
            <div>
                {dashboard}
            </div>
        );
    }
}

export default DashboardComponent;