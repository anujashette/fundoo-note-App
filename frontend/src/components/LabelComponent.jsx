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
                "-webkit-tap-highlight-color": "transparent",
                "overflow-y": "unset"
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
            openLabel: props.openLabel
        }
    }

    handleChange = (e) => {
        let label = e.target.value
        this.setState({ label: label });
    }

    handleChangeL = (selectId, selectLabel) => (e) => {
        this.setState({ [selectId]: e.target.checked })
        if (this.props.NoteType && e.target.checked) {

            this.props.addLabel(selectId, selectLabel)
        }
        else if (this.props.NoteType && !e.target.checked) {
            this.props.deleteLabel(selectId, selectLabel)
        }
        else {
            let data = {
                noteId: this.props.noteId,
                labelId: selectId
            }
            let noteLabel = updateNoteLabel(data);
            console.log("===================================>>>>>>> ", noteLabel);

            this.props.getNotes()
        }
    }

    handleLabel = () => {
        console.log('label  ===>', this.state.label);
        let labelData = {
            label: this.state.label
        }
        addLabel(labelData)
            .then((addLabelRes) => {
                console.log('add label', addLabelRes)
                this.props.getLabels()
                console.log('response add label  ,', addLabelRes);
                this.setState({ label: '' })
            })
            .catch((error) => {
                console.log(error);

            })

    }

    render() {
        if (this.state.labelArray) {
            var labels = this.state.labelArray.map((key, index) => {
                if (!key.isDeleted) {
                    return (<FormControlLabel
                        key={index}
                        control={
                            <Checkbox
                                checked={this.state.labelArray._id}
                                onChange={this.handleChangeL(key._id, key.label)}
                                value=""
                            />
                        }
                        label={key.label}
                    />
                    )
                }
                else
                    return null
            })
        }

        return (
            <div className="label-div">
                <MuiThemeProvider theme={theme}>
                    <Dialog
                        open={this.state.openLabel}
                        onClose={this.props.handleLabelClose}
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