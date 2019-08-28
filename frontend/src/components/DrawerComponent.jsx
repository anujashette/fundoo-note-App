import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Archive from '@material-ui/icons/ArchiveOutlined';
import Notification from '@material-ui/icons/NotificationsNoneOutlined'
import EditOutline from '@material-ui/icons/EditOutlined'
import Trash from '@material-ui/icons/DeleteOutlined'
import '../Css/component.scss';
import Bulb from '../assets/bulb.svg';
import { createMuiTheme, MuiThemeProvider, Drawer } from '@material-ui/core'

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
        }
    }

    render() {
        const sideList = (

            <div className="Menu-label">
                <List>
                    <ListItem className="List-item">
                        <ListItemIcon>
                            <img src={Bulb} alt="dfgf" />
                        </ListItemIcon>
                        <ListItemText primary="Notes" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon> <Notification /></ListItemIcon>
                        <ListItemText primary="Reminders" />
                    </ListItem>

                <Divider />
                <div className="Label-margin">
                    <label className="List-item-text">LABELS</label>
                </div>

                {/* Call to function to display labls as per created */}
                <ListItem>
                    <ListItemIcon><EditOutline /></ListItemIcon>
                    <ListItemText primary="Edit Labels" />
                </ListItem>
                <Divider />
                    <ListItem>
                        <ListItemIcon> <Archive /> </ListItemIcon>
                        <ListItemText primary="Archive" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon> <Trash /></ListItemIcon>
                        <ListItemText primary="Trash" />
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
                    // onClose={this.toggleDrawer('left', false)}
                    // onOpen={this.toggleDrawer('left', true)}
                    variant="persistent"
                    anchor="left"
                    >
                        <div
                            tabIndex={0}
                        // role="button"
                        // onClick={this.toggleDrawer('left', false)}
                        // onKeyDown={this.toggleDrawer('left', false)}
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
