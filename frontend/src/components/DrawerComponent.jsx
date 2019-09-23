import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Archive from '@material-ui/icons/ArchiveOutlined';
import Notification from '@material-ui/icons/NotificationsNoneOutlined'
import EditOutline from '@material-ui/icons/EditOutlined'
import LabelIcon from '@material-ui/icons/LabelOutlined'
import Trash from '@material-ui/icons/DeleteOutlined'
import '../Css/component.scss';
import '../Css/displayNote.scss';
import Bulb from '../assets/bulb.svg';
import { createMuiTheme, MuiThemeProvider, Drawer, Icon } from '@material-ui/core'
import { Checkbox , FormControlLabel} from '@material-ui/core';
import {updateNoteLabel} from '../services/NoteService'
import { Chip } from '@material-ui/core';

const theme = createMuiTheme({
    overrides: {
        MuiBackdrop: {
            root: {
                "top": "0",
                "left": "0",
                "right": "0",
                "bottom": "0",
                "z-index": "-1",
                "touch-action": "auto",
                "background-color": "rgba(0, 0, 0, 0.5)",
            }
        },
        MuiDrawer: {
            paper: {
                "top": "66px",
                "flex": "1 0 auto",
                "height": "100%",
                "display": "flex",
                "outline": "0",
                "z-index": "1200",
                "overflow-y": "auto",
                "flex-direction": "column",
                "-webkit-overflow-scrolling": "touch"
            }
        }
    }
})

class DrawerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
           onClickCss: "",
           labelArray: this.props.labelData

        }
    }

    handleNotes = () =>{
        this.setState({})
        this.props.handleGetNotes()
    }
 
    handleReminder = () =>{
        this.props.reminderNotes()
    }

    handleEditLabel = () =>{
        this.props.handleEditLabel()
    }

    handleArchive = () =>{
        this.props.archiveNotes()
    }

    handleTrash = () =>{
        console.log('trash Notes::::::::::',this.props);
        
        this.props.trashNotes()
    }

    handleChangeL = selectId => (e) => {
        this.setState({ [selectId]: e.target.checked })

        let data = {
            noteId:this.props.noteId,
            labelId:selectId
        }
       let noteLabel = updateNoteLabel(data);
       console.log('add label on note  ',noteLabel);
    }
    handleChangeL = selectId => (e) => {
    }

    render() {
        console.log('in edit label',this.state.labelArray)

        if (this.props.labelData) {
            var labels = this.props.labelData.map((key, index) => {
                if(!key.isDeleted){
                return (  <ListItem 
                    key={index}
                // onClick={this.handleEditLabel} 
                // className={this.state.onClickCss}
                 style={{cursor: "pointer"}}>
                <ListItemIcon><LabelIcon /></ListItemIcon>
                <ListItemText primary={key.label} />
            </ListItem>
                  )}
                  else 
                    return null
            })
              }
        const sideList = (

            <div className="Menu-label">
                <List>
                    <ListItem onClick={this.handleNotes} className="item-div" style={{  cursor: "pointer"}}>
                        <ListItemIcon>
                            <img src={Bulb} alt="dfgf" />
                        </ListItemIcon>
                        <ListItemText primary="Notes" />
                    </ListItem>
                    <ListItem onClick={this.handleReminder} className="item-div" style={{cursor: "pointer"}}>
                        <ListItemIcon> <Notification /></ListItemIcon>
                        <ListItemText primary="Reminders" />
                    </ListItem>

                <Divider />

                <div className="Label-margin">
                    <label className="List-item-text">LABELS</label>
                </div>

                {/* Call to function to display labls as per created */}
                    {labels}

                <ListItem onClick={this.handleEditLabel} className="item-div" style={{cursor: "pointer"}}>
                    <ListItemIcon><EditOutline /></ListItemIcon>
                    <ListItemText primary="Edit Labels" />
                </ListItem>
                <Divider />
                    <ListItem onClick={this.handleArchive} className="item-div" style={{cursor: "pointer"}}>
                        <ListItemIcon > <Archive /> </ListItemIcon>
                        <ListItemText primary="Archive" />
                    </ListItem>
                    <ListItem onClick={this.handleTrash} className="item-div" style={{cursor: "pointer",margin: "0px 0px 70px 0px"}}>
                        <ListItemIcon> <Trash /></ListItemIcon>
                        <ListItemText primary="Bin" />
                    </ListItem>
                </List>
            </div>
        );

        return (
            <div className="Drawer-main">
                {/* <IconButton onClick={this.toggleDrawer('left', true)}><Menu /></IconButton> */}
                <MuiThemeProvider theme={theme}>

                    <Drawer
                        open={this.props.left}
                        variant="persistent"
                        anchor="left"
                    >
                        <div
                            tabIndex={0}
                            style={{outline:"none"}}
                        >
                            {sideList}
                        </div>
                    </Drawer>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default DrawerComponent