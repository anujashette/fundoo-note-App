import React, { Component } from 'react';
import Archive from '@material-ui/icons/ArchiveOutlined';
import { Tooltip, IconButton } from '@material-ui/core';

class ArchiveComponent extends Component {
    render() {
        return (
            <div>
                <Tooltip title="Archive">
                    <IconButton onClick={this.handleArchive}><Archive style={{ width: "17px" }} /></IconButton>
                </Tooltip>
            </div>
        );
    }
}

export default ArchiveComponent;