import React, { Component } from 'react';
import DrawerComponent from '../components/DrawerComponent'
class DrawerPage extends Component {
    render() {
        return (
            <div>
                <DrawerComponent props = {this.props}/>
            </div>
        );
    }
}
export default DrawerPage;