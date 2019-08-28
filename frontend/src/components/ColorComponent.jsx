import React, { Component } from 'react';
import ColorIcon from '@material-ui/icons/ColorLensOutlined';
import { Tooltip, IconButton } from '@material-ui/core';

class ColorComponent extends Component {
    render() {
        return (
            <div>
                <Tooltip title="Change color">
                    <IconButton><ColorIcon style={{ width: "17px" }} /></IconButton>
                </Tooltip>
            </div>
        );
    }
}

export default ColorComponent;