import React, { Component } from 'react';
import DashboardComponent from '../components/DashboardComponent'

class DashboardPage extends Component {
    render() {
        return (
            <div>
                <DashboardComponent props = {this.props}/>
            </div>
        );
    }
}

export default DashboardPage;