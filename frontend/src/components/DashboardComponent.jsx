import React, { Component } from 'react';
import AppBarComponent from './AppBarComponent';
import CreateNoteComponent from './CreateNoteComponent';
import DisplayGrid from './DisplayGrid';
import { getAllNote } from '../services/NoteService'

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteData: []
        }
    }

    // componentDidMount() {
    //     getAllNote()
    //         .then((response) => {
    //             console.log('get all note data=====>', response.data.data)
    //             this.setState({ noteData: response.data.data })
    //             console.log('get all note data in state=====>', this.state.noteData)
    //         })
    //         .catch((error) => {
    //             console.log('get all note error =====>', error)
    //         })
    // }
    
    render() {
        return (
            <div>
                {/* <div className="create-dispaly-note-div"> */}
                <AppBarComponent props={this.props.props}/>
                    {/* <CreateNoteComponent />
                    <div className="allnotes-div">
                        <DisplayGrid noteData={this.state.noteData} />
                    </div> */}
                {/* </div> */}
            </div>
        );
    }
}

export default DashboardComponent;