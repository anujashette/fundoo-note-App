import React, { Component } from 'react';
import { Dialog, Card, CardContent, InputBase, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import ReminderComponent from './ReminderComponent';
import ColorComponent from './ColorComponent';
import ArchiveComponent from './ArchiveComponent';
import MoreComponent from './MoreComponent';
import { updateTitle, updateDescription } from '../services/NoteService'
const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      paperWidthSm: {
        "max-width": " 635px",
        "border-radius": "10px"
      }
    }
  }
})

class EditNoteComponent extends Component {

  constructor(props) {
    super(props);
    this.state = props.parentState
  }

  handleChange = (e) => {
    const { data } = this.state;
    data[e.target.name] = e.target.value;
    this.setState({ data });
  }

  componentWillUnmount() {
    console.log('id in updated', this.state.id);

    let titleData = { noteId: this.state.id, title: this.state.data.title }
    let descData = { noteId: this.state.id, description: this.state.data.description }
    if (this.state.data.title) {
      updateTitle(titleData)
        .then((response) => {
          console.log("updated data", response);
          // this.props.handleGetNotes()
        })
        .catch((error) => {
          console.log('error in updation', error);

        })
    }

    if (this.state.data.description) {
      updateDescription(descData)
        .then((response) => {
          console.log("updated data", response);
        })
        .catch((error) => {
          console.log('error in updation', error);
        })
    }
  }

  selectColor = (selectedColor) => {
    const { data } = this.state
    data['color'] = selectedColor
    this.setState({ data })
    console.log('color applied', selectedColor);

  }

  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Dialog
            open={this.props.open}
            onClose={this.props.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <Card id="edit-note-card-large" style={{ background: this.state.data.color }}>
              <CardContent style={{
                padding: "0px"
              }} >
                <div className="Note-bar-large" style={{ background: this.state.data.color }}>
                  <InputBase
                    placeholder="Title"
                    value={this.state.data.title}
                    name="title"
                    onChange={e => this.handleChange(e)}
                    className="Take-a-note-large1"
                    type="text"
                    style={{ color: "#282c34" }}>
                  </InputBase>

                  <br />

                  <InputBase
                    multiline
                    placeholder="Take a note..."
                    value={this.state.data.description}
                    name="description"
                    onChange={e => this.handleChange(e)}
                    autoFocus
                    className="Take-a-note-large2"
                    type="text"
                    style={{ color: "#434343", fontSize: "15px" }}
                  >
                  </InputBase>
                  <div className="Icon-div">

                    <ReminderComponent />
                    <ColorComponent selectColor={this.selectColor} />
                    <ArchiveComponent parentState={this.state} handleGetNotes={this.props.handleGetNotes} />
                    <MoreComponent

                    />

                    <button className="close-button" style={{ background: this.state.data.color }}
                      onClick={this.props.handleClose}
                    >Close</button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Dialog>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default EditNoteComponent;