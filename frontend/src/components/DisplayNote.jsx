import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import '../Css/displayNote.scss'
import { CardActions} from '@material-ui/core'
import ReminderComponent from './ReminderComponent';
import ColorComponent from './ColorComponent';
import ArchiveComponent from './ArchiveComponent';
import LabelComponent from './LabelComponent';
import EditNoteComponent from './EditNoteComponent';

class DisplayNote extends Component {
    constructor(props){
        super(props);
        this.state={
            title:props.noteData.title,
            description:props.noteData.description,
            id:props.noteData._id,
            editNote : false,
            open:false
        }
    }

    handleId = () =>{
        console.log("note Id ",this.state.id,this.state.description)
        this.setState({editNote : true , open:!this.state.openDialog})
    }

    render() {
        return (
            // <div>
            //     {!this.state.editNote ? 
                <Card id="Display-note-card" onClick={()=>this.handleId()}>
                    <div className="note-text-div">
                        <div className="title-div">
                    <CardContent style={{paddingLeft: "0px"}}>
                        {this.state.title}
                    </CardContent>
                    </div>
                    <div className="desc-div">
                    <CardContent style={{padding : "0.50px"}}>
                        {this.state.description}
                    </CardContent>
                    </div>
                    </div>
                    <div className="Icon-div">
                    <CardActions>
                        <ReminderComponent/>
                        <ColorComponent/>
                        <ArchiveComponent/>
                        <LabelComponent/>
                    </CardActions>
                    </div>
                </Card>
            //     :
            //     <EditNoteComponent open={this.state.dialogOpen}/>
            //         }
            // </div>
        );
    }
}

export default DisplayNote;