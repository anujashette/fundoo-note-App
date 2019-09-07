import React, { Component } from 'react';
import Archive from '@material-ui/icons/ArchiveOutlined';
import Unarchive from '@material-ui/icons/UnarchiveOutlined';
import { Tooltip, IconButton } from '@material-ui/core';
import { updateArchive } from '../services/NoteService'

class ArchiveComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: this.props.display,
            archive: props.archive
        }
    }

    handleArchive = () => {
        let archiveData = { noteId: this.props.id }
        updateArchive(archiveData)
            .then(async (response) => {
                console.log('archive note', response)
                this.props.changeDisplay()
                // await this.props.handleGetNotes()
            })
            .catch((error) => {
                console.log('archive error', error)
            })
    }

    render() {
        return (
            <div>
                {!this.state.archive ?
                    <Tooltip title="Archive">
                        <IconButton onClick={this.handleArchive}><Archive style={{ width: "17px" }} /></IconButton>
                    </Tooltip>
                    :
                    <Tooltip title="Unarchive">
                        <IconButton onClick={this.handleArchive}><Unarchive style={{ width: "17px" }} /></IconButton>
                    </Tooltip>
                }

            </div>
        );
    }
}

export default ArchiveComponent;