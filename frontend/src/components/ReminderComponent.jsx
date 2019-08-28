import React, { Component } from 'react';
import ReminderIcon from '@material-ui/icons/AddAlertOutlined';
import { Tooltip, IconButton } from '@material-ui/core';
class ReminderComponent extends Component {
    render() {
        return (
            <div>
                <Tooltip title="Remind me">
                        <IconButton><ReminderIcon style={{ width: "17px" }} /></IconButton>
                </Tooltip>
            </div>
        );
    }
}

export default ReminderComponent;