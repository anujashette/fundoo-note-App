import React from 'react';
import DisplayNote from './DisplayNote';
import { Grid } from '@material-ui/core';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap
} from "react-grid-dnd";

class DisplayGrid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gridCss : "mainnotes-grid",
      items : this.props.noteData,
      setItems :[]
    }
  }

  // target id will only be set if dragging from one dropzone to another.
  onChange = (sourceId, sourceIndex, targetIndex, targetId) => {
     console.log("inexes",sourceIndex,targetIndex);
     this.setState({items:this.props.noteData})

    const nextState = swap(this.props.noteData, sourceIndex, targetIndex);
    // this.state.setItems(nextState);
    console.log("next state",nextState);
    
    this.setState({setState:nextState})
  }

  render() {
    console.log("safasfasdfsa",this.state.noteData);

    if (this.props.noteData) {

      var notes =this.props.noteData.map((key, index) => {
        return          (
        // <GridItem key={index}>
        <DisplayNote 
        // handleGetNotes={this.props.handleGetNotes}
        viewCss={this.props.viewCss}
        labelData={this.props.labelData}
        Display={this.props.Display}
        getLabels={this.props.getLabels}
        getNotes = {this.props.getNotes}
        noteData={key}  key={index}/>
        // </GridItem >
)
      })
    }
    else {
      return <p style={{margin:"200px",color:"#434343",fontSize:"20px"}}>{this.props.noNotes}</p>
    }

    return (
      <div className="allnotes-div">

        {this.props.Display ? 
        <div className= "mainnotes-grid"
        // className="mainnotes-list"
        >
          {notes}
        </div>
         :
        <div className="mainnotes-list"
         style={{
          display: "flow-root",
          justifyContent: "stretch"}}
          >
            {notes}
          </div>
          } 
        

      </div>

      
      // <GridContextProvider onChange={this.onChange} >
      // <GridDropZone
      //   id="items"
      //   boxesPerRow={3}
      //   rowHeight={200}
      //   style={{ height: "100%" , display:"flex" , justifyContent:"flex-start",flexWrap:"wrap"}}
      // >
      //     {notes}
      // </GridDropZone>
      // </GridContextProvider>  
    );
  }
}

export default DisplayGrid;