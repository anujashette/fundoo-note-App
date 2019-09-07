import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider, Dialog, DialogContent, InputBase, Divider, Checkbox, FormControlLabel } from '@material-ui/core';
import { addLabel, updateNoteLabel } from '../services/NoteService';


const theme = createMuiTheme({
    overrides: {
        MuiBackdrop: {
            root: {
                "position": "relative",
                "touch-action": "none",
                "background-color": "rgba(0, 0, 0, 0.0)",
                "-webkit-tap-highlight-color": "transparent"
            }
        },
        MuiPaper: {
            rounded: {
                298: {
                    "border-radius": "10px"
                }
            }
        },
        MuiFormLabel: {
            root: {
                343: {
                    Mui: {
                        focused: {
                            "color": "black"
                        }
                    }
                }
            }
        }
    }
})

class LabelComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: '',
            checkedA: false,
            labelArray: props.labels,
            openLabel:props.openLabel
        }
    }

    handleChange = (e) => {
        let label = e.target.value
        this.setState({ label: label });
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

    handleLabel =()=> {
        console.log('label  ===>', this.state.label);
        let labelData = {
            label: this.state.label
        }
        let response = addLabel(labelData);
        console.log('response add label  ,', response);
        this.setState({ label: '' })
    }

    handleLabelClose =() =>{
        this.setState({openLabel:false})
        // this.props.changeDisplay()
        
    }
    
    render() {
        if (this.state.labelArray) {
        console.log(this.state.labelArray, "LABEL DATA  in label===================>")
        var labels = this.state.labelArray.map((key, index) => {
            if(!key.isDeleted){
            return ( <FormControlLabel
                key={index}

                control={
                  <Checkbox
                    checked={this.state.labelArray._id}
                    onChange={this.handleChangeL(key._id)}
                    value=""
                  />
                }
                label={key.label}
              />
              )}
              else 
                return null
        })
          }
          
        return (
            <div className="label-div">
                <MuiThemeProvider theme={theme}>
                    <Dialog
                        open={this.state.openLabel}
                        onClose={this.handleLabelClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogContent>Add label</DialogContent>

                        <InputBase
                            multiline
                            placeholder="Label"
                            value={this.state.label}
                            name="description"
                            onChange={e => this.handleChange(e)}
                            type="label"
                            style={{ color: "#434343", fontSize: "15px", padding: "5px" }}
                        ></InputBase>
                        <div className="labels-div">
                        {labels}
                        </div>
                        <Divider />
                        <button className="create-button" onClick={this.handleLabel}>+ Create</button>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default LabelComponent;