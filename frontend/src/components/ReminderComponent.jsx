import React, { Component } from 'react';
import ReminderIcon from '@material-ui/icons/AddAlertOutlined';
import { Tooltip, IconButton, Menu, MenuItem, createMuiTheme, MuiThemeProvider, Divider } from '@material-ui/core';
import { updateReminder } from '../services/NoteService'
import { askForPermissioToReceiveNotifications } from '../Middleware/push-notification';

const theme = createMuiTheme({
    overrides: {
        MuiMenu: {
            paper: {
                "height": "200px",
                "width": "10%"
            }
        },
        MuiBackdrop: {
            root: {
                "position": "absolute",
                "touch-action": "none",

                "background-color": "rgba(0, 0, 0, 0.0)",
                "-webkit-tap-highlight-color": "transparent"
            }
        }
    }
})

class ReminderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: false
        }
    }

    handleMore = (event) => {
        this.setState({ openMore: true, anchorEl: event.currentTarget })
    }

    handleClose = () => {
        this.setState({ anchorEl: false })
    }

    handleToday = async () => {
        const today = new Date()
        today.setHours(1, 22, 0)
        if(this.props.reminderType){
            this.props.createReminder(today)
        }else if(!this.props.reminderType){
            let date = { reminder: today, noteId: this.props.id }
            let response = await updateReminder(date)
            console.log("reminder response   ", response);
            this.setState({ anchorEl: false })
            this.props.getNotes()
        }
        askForPermissioToReceiveNotifications()
    }

    handleTomorrow = () => {
        // const tomorrow = new Date()
        // tomorrow.setDate(tomorrow.getDate() + 1)
        // tomorrow.setHours(8, 0, 0)
        // let date = { reminder: tomorrow, noteId: this.props.id }
        // let response = updateReminder(date)
        // console.log("reminder response   ", response);
        // this.setState({ anchorEl: false })
        // this.props.getNotes()
        // askForPermissioToReceiveNotifications()
    }

    handleWeek = () => {
        // const nextWeek = new Date()
        // // nextWeek.setDate(nextWeek.getDate() + (1 + 7 - nextWeek.getDay()) % 7);
        // nextWeek.setDate(nextWeek.getDate() + (7 - nextWeek.getDay()) % 7 + 1);
        // nextWeek.setHours(8, 0, 0)
        // console.log("next week date", nextWeek);
        // let date = { reminder: nextWeek, noteId: this.props.id }
        // let response = updateReminder(date)
        // console.log("reminder response   ", response);
        // this.setState({ anchorEl: false })
        // this.props.getNotes()
        // askForPermissioToReceiveNotifications()
    }

    render() {
        return (
            <div>
                <Tooltip title="Remind me"
                >
                    <IconButton
                        aria-owns={this.state.anchorEl ? 'remind-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMore}
                    ><ReminderIcon style={{  height: "15px",width:" 15px"}}/></IconButton>
                </Tooltip>
                <MuiThemeProvider theme={theme}>
                    <Menu
                        id="remind-menu"
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                        style={{
                            width: "180%", height: "1120px"
                        }}
                    >   <label value="" style={{ paddingLeft: "15px", paddingBottom: "15px" }}>Reminder</label>
                        <Divider style={{ marginTop: "10px" }} />
                        <MenuItem value="" onClick={this.handleToday}>Today <span style={{ marginLeft: "7.2rem" }}>20:00</span></MenuItem>
                        <MenuItem value="" onClick={this.handleTomorrow}>Tomorrow<span style={{ marginLeft: "5.50rem" }}>8:00</span></MenuItem>
                        <MenuItem value="" onClick={this.handleWeek}>Monday<span style={{ marginLeft: "6.3rem" }}>8:00</span></MenuItem>
                    </Menu>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default ReminderComponent;