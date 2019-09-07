import React, { Component } from 'react';
import AppBarComponent from './AppBarComponent';
import CreateNoteComponent from './CreateNoteComponent';
import DisplayGrid from './DisplayGrid';
import { getAllNote, getAllLabel, getArchive, getTrash, getSearchNote } from '../services/NoteService'
import EditLabelComponent from './EditLabelComponent'
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
            gridview:true,
            viewCss:'Display-note-card'
        }
        this.handleGetLabel = this.handleGetLabel.bind(this)
    }

    componentDidMount() {
        if (!this.state.noteType) {
            this.handleGetNotes();
        } else {

        }
        this.handleGetLabel()

    }

    async handleGetNotes() {
        this.setState({ noteData: [],menuName: 'Fundoo' ,noNotes: 'Your archive notes appear here'})

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

    searchNotes = (searchKey) =>{
        console.log("in dashboard",searchKey);
        this.setState({ noteData: []})

        let searchData = {searchKey:searchKey}
         getSearchNote(searchData)
            .then((response) => {
                console.log('get all note data=====>', response.data.data)
                this.setState({ noteData: response.data.data})
                console.log('get all note data in state=====>',{noNotes: 'Your archive notes appear here'})
            })
            .catch((error) => {
                console.log('get all note error =====>', error)
            })
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

    getNotes = () => {
        this.setState({ noteType: false })
        this.handleGetLabel()
        this.handleGetNotes(); 
    }

    getLabels = () =>{
        this.handleGetLabel()
    }

    handleEditLabel = () =>{
        this.setState({labelEditor:true , openLabel:true})
    }

    handleLabelClose =() =>{
        this.setState({labelEditor:false  ,openLabel:false})
        // this.handleGetLabel()
    }

    gridView = () =>{
        this.setState({gridview:!this.state.gridview})
        if(this.state.gridview){
            console.log(' grid',this.state.gridview);
            this.setState({viewCss: "Display-note-card-list"}) }
        else{
            console.log('list',this.state.gridview);
            this.setState({viewCss: "Display-note-card"})}  
    }
    
    render() {

        return (
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
                    props={this.props.props} />
                {!this.state.noteType ?
                    // {createNote}
                    <CreateNoteComponent handleGetNotes={this.getNotes} />
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

                <DisplayGrid
                    noNotes={this.state.noNotes}
                    noteData={this.state.noteData}
                    labelData={this.state.labelData}
                    Display={this.state.gridview}
                    handleGetNotes={this.handleGetNotes}
                    handleGetLabel={this.handleGetLabel}
                    viewCss={this.state.viewCss} />
            </div>
        );
    }
}

export default DashboardComponent;