import React, { Component } from 'react';
import RegistrationComponent from '../components/RegistrationComponent';

class RegistrationPage extends Component {
    render() {
        return (
            <div>
                <RegistrationComponent props = {this.props}/>
            </div>
        );
    }
}

export default RegistrationPage;