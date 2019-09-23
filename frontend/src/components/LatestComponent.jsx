import React, { Component } from 'react';
import { Button, createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
    overrides:{
        MuiButton:{
            root:{
                "text-transform": "initial"
            }
        }
    }
})

class LatestComponent extends Component {
 
    constructor(props){
        super(props)
        this.state={

        }
    }
    handleLatest = () =>{
        this.props.handleLatest()
    }

    handleOther = () =>{
        this.props.getNote()
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Button onClick={this.handleLatest}>Latest</Button>|<Button onClick={this.handleOther}>Other</Button>
            </MuiThemeProvider>
        );
    }
}

export default LatestComponent;