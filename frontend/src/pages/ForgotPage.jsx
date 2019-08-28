import React, { Component } from 'react';
import ForgotComponent from '../components/ForgotComponent';


class ForgotPage extends Component {
    render() {
        return (
            <div>
                <ForgotComponent props = {this.props}/>
            </div>
        );
    }
}

export default ForgotPage;