import React, { Component } from 'react';
import AppBarComponent from '../components/AppBarComponent';

class AppBarPage extends Component {
    render() {
        return (
            <div>
                <AppBarComponent props ={this.props}/>
            </div>
        );
    }
}

export default AppBarPage;