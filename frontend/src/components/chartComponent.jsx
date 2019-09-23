import React, { Component } from 'react';
import { Dialog, Tooltip, IconButton, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import PieChart from '@material-ui/icons/PieChart'
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    PieSeries,
    Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { Avatar } from '@material-ui/core';
import { getNoteCount } from '../services/NoteService';

class chartComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chartState: false,
            data: [
                { noteType: 'Notes', area: 1 },
                { noteType: 'Reminder', area: 0 },
                { noteType: 'Archive', area: 0 },
                { noteType: 'Bin', area: 0 }]
        }
    }

    handleClose = () => {
        this.setState({ chartState: false })
    }

    handleChart = () => {
        getNoteCount()
        .then((response)=>{
            console.log("count",response.data);
            let data= [
                { noteType: 'Notes', area:  response.data.noteCount},
                { noteType: 'Reminder', area: response.data.reminderCount },
                { noteType: 'Archive', area: response.data.archiveCount },
                { noteType: 'Bin', area:  response.data.trashCount }
            ]
            this.setState({data : data })
        }).catch((error)=>{
            console.log("count error",error);
            
        })
        this.setState({ chartState: true })
    }
    render() {
        return (
            <div>
                <Tooltip title="Pie chart">
                    <IconButton onClick={this.handleChart}>
                        <PieChart />
                    </IconButton>
                </Tooltip>
                {/* <MuiThemeProvider theme={theme}> */}
                <Dialog
                    open={this.state.chartState}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <div style={{ display: "flex" }} >
                        <Chart
                            data={this.state.data}
                            style={{ height: "300px", width: "300px", marginLeft: " 20px", display: "flex" }}
                        >
                            <Title
                                text="Pie chart"
                            />
                            <PieSeries
                                valueField="area"
                                argumentField="noteType"
                            />
                            <Animation />
                        </Chart>

                        <div className="chart-div">
                            <div style={{ display: "flex" }}>
                                <span > <Avatar style={{ background: "#2E9AFE", width: "15px", height: "15px", marginBottom: "300%" }}></Avatar></span>
                                <span style={{ marginLeft: "10%" }}>{this.state.data[0].noteType}</span>
                            </div>
                            <div style={{ display: "flex" }}>
                                <span > <Avatar style={{ background: "#FE642E", width: "15px", height: "15px", marginBottom: "300%" }}></Avatar></span>
                                <span style={{ marginLeft: "10%" }}>{this.state.data[1].noteType}</span>
                            </div>
                            <div style={{ display: "flex" }}>
                                <span> <Avatar style={{ background: "#5FB404", width: "15px", height: "15px", marginBottom: "300%" }}></Avatar></span>
                                <span style={{ marginLeft: "10%" }}>{this.state.data[2].noteType}</span>
                            </div>
                            <div style={{ display: "flex" }}>
                                <span> <Avatar style={{ background: "#FACC2E", width: "15px", height: "15px", marginBottom: "300%" }}></Avatar></span>
                                <span style={{ marginLeft: "10%" }}>{this.state.data[3].noteType}</span>
                            </div>
                        </div>
                    </div>
                </Dialog>
                {/* </MuiThemeProvider> */}
            </div>
        );
    }
}

export default chartComponent;