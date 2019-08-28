import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Menu from '@material-ui/icons/Menu';
import funlogo from '../assets/keep.png';
import { IconButton, InputBase } from '@material-ui/core';
import Search from '@material-ui/icons/Search'
import DropDownComponent from './DropDownComponent';
import DrawerComponent from './DrawerComponent';
import RefreshOutlined from '@material-ui/icons/RefreshOutlined'
import Cross from '@material-ui/icons/CancelRounded'
import Tooltip from '@material-ui/core/Tooltip';
// import Grid from '@material-ui/icons/GridOnOutlined'
import { getAllNote } from '../services/NoteService'
import CreateNoteComponent from './CreateNoteComponent';
import DisplayGrid from './DisplayGrid';
import Grid from '../assets/grid.svg'
import List from '../assets/list.svg'

class AppBarComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: true,
            anchorEl: null,
            left: false,
            gridview: true,
            noteData: [],
            firstPage:1,
            lastPage:1
        };
    }

    componentDidMount() {
        this.handleGetNotes()
    }

    handleGetNotes = () => {
        getAllNote()
            .then((response) => {
                console.log('get all note data=====>', response.data.data)
                this.setState({ noteData: response.data.data, lastPage:response.data.totalpages})
                console.log('get all note data in state=====>', this.state.noteData)
            })
            .catch((error) => {
                console.log('get all note error =====>', error)
            })
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    toggleDrawer = () => {
        this.setState({
            left: !this.state.left,
        });
    };

    handleGrid = () => {
        this.setState({
            gridview: !this.state.gridview,
        });
    }

    render() {
        // const this.anchorEl = Boolean(this.anchorEl);

        return (
            <div>
                <AppBar position="fixed" elevation={0}>

                    <Toolbar className="Toolbar">
                        <Tooltip title="Main menu">
                            <IconButton onClick={this.toggleDrawer}>
                                <Menu />
                            </IconButton>
                        </Tooltip>
                        <img src={funlogo} alt="fun-logo" />
                        <label className="Bar-label">Fundoo</label>
                        <div className="Search-bar">
                            <Tooltip title="Search">
                                <IconButton><Search /></IconButton>
                            </Tooltip>
                            <InputBase placeholder="Search" className="Search"></InputBase>
                            <IconButton onClick={this.handleClear}><Cross /></IconButton>
                        </div>
                        <div className="symbols">
                            <Tooltip title="Refresh">
                                <IconButton><RefreshOutlined /></IconButton>
                            </Tooltip>

                            <IconButton onClick={this.handleGrid}> {this.state.gridview ?
                                <Tooltip title="Grid view">
                                    <img src={Grid} style={{ height: "22px", color: "#9e9d9d" }} />
                                </Tooltip>
                                :
                                <Tooltip title="List view">
                                    <img src={List} style={{ height: "22px", color: "#9e9d9d" }} />
                                </Tooltip>}
                            </IconButton>

                        </div>
                        <div className="Drop-box">
                            <DropDownComponent
                                props={this.props.props} />
                        </div>
                    </Toolbar>
                </AppBar>

                <DrawerComponent left={this.state.left} />
                <CreateNoteComponent handleGetNotes={this.handleGetNotes} />
                <DisplayGrid noteData={this.state.noteData} DisplayGrid={this.state.gridview} />
                {/* <div>
                    <button className="button-next-prev">Previous</button>
                    <button className="button-next-prev">Next</button>
                </div> */}
            </div>
        );
    }
}

export default AppBarComponent;