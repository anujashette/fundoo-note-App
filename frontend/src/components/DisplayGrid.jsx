import React from 'react';
import Grid from '@material-ui/core/Grid';
import DisplayNote from './DisplayNote';
import { Paper } from '@material-ui/core';

class DisplayGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spacing: '15',
    }
  }

  render() {
    if (this.props.noteData) {
      var notes = this.props.noteData.map((key, index) => {
        console.log('key  ',key)
        return <DisplayNote listView={this.props.listView} noteData={key} key={index} />
      })
    }
    else {
      return <p style={{margin:"200px",color:"#434343",fontSize:"20px"}}>Your notes appear here</p>
    }

    return (
      <div className="allnotes-div">
        {this.props.DisplayGrid ? 
        <Grid className="mainnotes-grid">
          {notes}
        </Grid>
        :  
        <Grid className="mainnotes-list" style={{
          display: "flow-root",
          justifyContent: "stretch"}}
          >
            {notes}
          </Grid>} 
      </div>
    );
  }
}

export default DisplayGrid;