import React, { Component } from 'react';
import ColorIcon from '@material-ui/icons/ColorLensOutlined';
import { Tooltip, IconButton, MenuItem, Menu, Grid, Avatar, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { height } from '@material-ui/system';
import { updateColor } from '../services/NoteService';

    const theme = createMuiTheme({
        overrides: {
            MuiMenu: {
                paper: {
                    "height": "auto",
                    "width": "139px",
                    "borderRadius":"24px"
                }
            }
        }
    })
    
class ColorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            colorArray: [
                '#F8F4F4',
                '#F38A8A',
                '#F3B28A',
                '#F3EB8A',
                '#BAF38A',
                '#8AF3E1',
                '#8AAAF3',
                '#F4C3F8',
                '#900C3F',
                '#AB959E',
                '#C3D5F8',
                '#D6F8BD',
            ],
            selected: '',
            isHover: false
        }
    }

    handleColor = (event) => {
        // alert('sdfsdfsd')
        this.setState({ anchorEl: event.currentTarget })
    }

    changeColor = (color) => {
        this.setState({ selected: color })
        this.props.selectColor(color)
        console.log('color in color comp', this.state.selected)
        
        // this.props.getANote()

    }

    handleClose = () => {
        this.setState({ anchorEl: null });
        if (this.props.createNote) {

        }
        else {
            let colorData = {
                noteId: this.props.id,
                notecolor: this.state.selected
            }
            updateColor(colorData)
                .then((response) => {
                    console.log('color response', response);
                    this.props.getANote()
                })
                .catch((error) => {
                    console.log('color error', error);
                })
        }
    };

    render() {
        const color = this.state.colorArray.map((key, index) => {
            return (
                <Avatar style={{
                    margin: "1px",
                    backgroundColor: key,
                    borderStyle: "solid",
                    borderColor: "#BFBFBF",
                    borderWidth: "1px",
                    height: "28px",
                    width: "28px"
                }}
                    key={index}
                    onClick={() => this.changeColor(key)}
                ></Avatar>
            )
        })
        return (
            <div>
                <Tooltip title="Change color">
                    <IconButton
                        aria-owns={this.state.anchorEl ? 'color-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleColor}
                    >
                        <ColorIcon style={{  height: "15px",width:" 15px"}} />
                    </IconButton>
                </Tooltip>
                <MuiThemeProvider theme={theme}>
                <Menu
                    id="color-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    style={{ width: "100%" }}
                >
                    <Grid style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start",padding:"5px" }}>
                        {color}
                    </Grid>
                </Menu>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default ColorComponent;