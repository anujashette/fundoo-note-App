import React, { Component } from 'react';
import MoreMenu from '@material-ui/icons/MoreVert';
import { Tooltip, IconButton } from '@material-ui/core';

class LabelComponent extends Component {
    render() {
        return (
            <div>
                <Tooltip title="More">
                    <IconButton><MoreMenu style={{ width: "17px" }} /></IconButton>
                </Tooltip>
            </div>
        );
    }
}

export default LabelComponent;