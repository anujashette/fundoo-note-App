import React, { Component } from 'react';
import ResetPasswordComponent from '../components/ResetPasswordComponent';

class ResetPasswordPage extends Component {
    render() {
        return (
            <div>
                <ResetPasswordComponent props = {this.props}/>
            </div>
        );
    }
}

export default ResetPasswordPage;