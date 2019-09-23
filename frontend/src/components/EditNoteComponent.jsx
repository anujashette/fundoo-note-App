import React, { Component } from 'react';
import { Dialog, Card, CardContent, InputBase, createMuiTheme, MuiThemeProvider, Chip } from '@material-ui/core';
import ReminderComponent from './ReminderComponent';
import ColorComponent from './ColorComponent';
import ArchiveComponent from './ArchiveComponent';
import MoreComponent from './MoreComponent';
import { updateTitle, updateDescription, deleteNoteLabel, deleteRemind } from '../services/NoteService'
import '../Css/displayNote.scss'
import Cancel from '@material-ui/icons/Close'
import Reminder from '@material-ui/icons/WatchLaterOutlined'

const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      paperWidthSm: {
        "max-width": " 635px",
        "height": "auto",
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

  handleDelete = data => () => {
    let labelData = {
      noteId: this.state.id,
      labelId: data._id
    }
    console.log('data in dis note label', data._id);

    let deletedLabel = deleteNoteLabel(labelData)
    console.log("deleted label  ", deletedLabel)
    this.props.getNotes()
  };

  deleteReminder = data => () => {
    let Data = {
      noteId: this.state.id
    }
    console.log('data in dis note label', data._id);
    let deletedreminder = deleteRemind(Data)
    console.log("deleted label  ", deletedreminder)
    this.props.getNotes()
  }

  render() {
    const displayLabel = this.state.data.notelabel.map((key, index) => {
      if (this.state.data.notelabel) {
        return (
          <Chip
            key={index}
            label={key.label}
            onDelete={this.handleDelete(key)}
            style={{
              height: "20px", minWidth: "100px"
            }}
          />
        )
      }
    })

    const displayReminder = this.state.data.reminder.map((key, index) => {
      if (this.state.data.reminder.length > 0 && this.state.data.reminder[0] !== '') {
        let date = this.state.data.reminder
        date = Date.parse(date)
        date = new Date(date)
        return (
          <Chip
            icon={<Reminder style={{ width: "18px", height: "18px" }} />}
            key={index}
            label={date.toLocaleString()}
            onDelete={this.deleteReminder(key)}
            deleteIcon={<Cancel style={{ width: "18px", height: "18px" }} />}
            style={{
              height: "20px", minWidth: "100px"
            }}
          />
        )
      }
    })

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Dialog
            open={this.state.open}
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
                  <div className="label-div" >
                    {displayLabel}
                  </div>
                  <div className="label-div" >
                    {displayReminder}
                  </div>
                  <div className="Icon-div-edit">

                    <ReminderComponent id={this.state.id} getNotes={this.props.getNotes} />
                    <ColorComponent selectColor={this.selectColor} id={this.state.id} />
                    <ArchiveComponent parentState={this.state} handleGetNotes={this.props.handleGetNotes} />
                    <MoreComponent
                      changeDisplay={this.props.changeDisplay}
                      noteState={this.state}
                      getNotes={this.props.getNotes}
                      labels={this.props.labels}
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