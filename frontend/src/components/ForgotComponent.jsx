import React, { Component } from 'react';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { forgot } from '../services/UserService'
import Snackbar from '@material-ui/core/Snackbar'
import Typography from '@material-ui/core/Typography';
import '../App.css'

class ForgotComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            snackbaropen: false,
            snackbarmsg: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleBack = this.handleBack.bind(this)
    }

    snackBarClose = () => {
        this.setState({ snackbaropen: false })
    }
    handleChange = event => {
        const email = event.target.value;
        this.setState({ email: email });
    }

    handleBack = () => {
        console.log('in handle register')
        this.props.props.history.push('/')
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // if (!this.state.email) {
        //     console.log('email should not be empty')
        //     this.setState({ snackbaropen: true, snackbarmsg: 'Email is requied' })
        // }
        // else{
        let userInput = {
            email: this.state.email
        }

        forgot(userInput)
            .then((response) => {
                console.log('forgot ', response.data)
                this.setState({ snackbaropen: true, snackbarmsg: response.data.message })
            }).catch((errorMessages) => {
                console.log('forgot error', errorMessages)
                this.setState({ snackbaropen: true, snackbarmsg: 'Account is not exist' })
            })
        // }
    }
    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    open={this.state.snackbaropen}
                    autoHideDuration={3000}
                    onClose={this.snackBarClose}

                    message={<span id="message-id">{this.state.snackbarmsg}</span>}
                ></Snackbar>

                <Card id="cardidlogin" >
                    <CardContent>
                        <Typography variant="h5">
                            <span className="font-color">F</span>
                            <span className="font-color">u</span>
                            <span className="font-color">n</span>
                            <span className="font-color">d</span>
                            <span className="font-color">o</span>
                            <span className="font-color">o</span>
                        </Typography>
                        <Typography variant="h6" component="h2">
                            Forgot Password
                        </Typography>
                        <br /><br />
                        <Typography className="Title">
                            Enter email id
                        </Typography>

                        <br />

                        <ValidatorForm
                            autoComplete="off"
                            ref="form"
                            onSubmit={this.handleSubmit}
                        >

                            <br />
                            <TextValidator
                                label="Email"
                                onChange={this.handleChange}
                                name="email"
                                value={this.state.email}
                                className="Emaillogin"
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                            />


                            <br />

                            <div className="LoginButton">
                                {/* <Button
                                    variant="contained"
                                    onClick={this.handleBack}
                                >
                                    Back
                            </Button>
                               
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                >
                                   Submit
                                </Button> */}
                                <button
                                    className="login-button-letter"
                                    onClick={this.handleBack}>
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="button-letter"
                                >
                                    Next
                                </button>
                            </div>
                        </ValidatorForm>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default ForgotComponent;