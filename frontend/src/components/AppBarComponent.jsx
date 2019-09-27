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
import Grid from '../assets/grid.svg'
import List from '../assets/list.svg'
import Cancel from '@material-ui/icons/Close'
import ChartComponent from './chartComponent';


let dsasa='ssds';


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
            lastPage:1,
            searchKey:"",
            chartstate:false
        };
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
        console.log("grid state",this.state.gridview);
        
        this.setState({
            gridview: !this.state.gridview,
        });
        this.props.gridView(this.state.gridview)
    }

    handleChange = (event) =>{
        let searchKey = event.target.value
        this.setState({searchKey:searchKey})
        this.props.searchNotes(this.state.searchKey)

    }
    handleSearch = () =>{
        console.log("handle change",this.state.searchKey)
        this.props.searchNotes(this.state.searchKey)
    }

    render() {

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
                        <label className="Bar-label">{this.props.menuName}</label>
                        <div className="Search-bar">
                            <Tooltip title="Search">
                                <IconButton onClick={this.handleSearch}><Search /></IconButton>
                            </Tooltip>
                            <InputBase placeholder="Search" onChange={this.handleChange} onKeyPress={this.handleSearch} value={this.state.searchKey} className="Search"></InputBase>
                            <IconButton onClick={this.handleClear}><Cancel /></IconButton>
                        </div>
                        <div className="symbols">
                            <Tooltip title="Refresh">
                                <IconButton><RefreshOutlined /></IconButton>
                            </Tooltip>

                            <IconButton onClick={this.handleGrid}>
                                 {this.state.gridview ?
                                <Tooltip title="List view">
                                    <img src={List} alt="Grid" style={{ height: "22px", color: "#9e9d9d" }} />
                                </Tooltip>
                                :
                                <Tooltip title="Grid view">
                                    <img src={Grid} alt="List" style={{ height: "22px", color: "#9e9d9d" }} />
                                </Tooltip>}
                            </IconButton>
                            <ChartComponent/>
                           
                        </div>
                        <div className="Drop-box">
                            <DropDownComponent
                                props={this.props.props} />
                        </div>
                    </Toolbar>
                </AppBar>

                <DrawerComponent left={this.state.left} 
                labelData = {this.props.labelData}
                handleGetNotes={this.props.handleGetNotes}
                handleEditLabel={this.props.handleEditLabel}
                archiveNotes={this.props.archiveNotes}
                trashNotes={this.props.trashNotes}
                reminderNotes={this.props.reminderNotes}
                />


            </div>
        );
    }
}

export default AppBarComponent;