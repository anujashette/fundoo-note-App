import React, { Component } from 'react';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Snackbar from '@material-ui/core/Snackbar'
import { reset } from '../services/UserService'
import Typography from '@material-ui/core/Typography';
import '../App.css'
class ResetPasswordComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            snackbaropen: false,
            snackbarmsg: '',
            submitted: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    snackBarClose = () => {
        this.setState({ snackbaropen: false })
    }
    handleChange = event => {
        const password = event.target.value;
        this.setState({ password: password });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.password.length < 6) {
            this.setState({ snackbaropen: true, snackbarmsg: 'password too short. At least 6 characters' })
        }
        else {
            let userInput = {
                password: this.state.password
            }
            const token = this.props.props.match.params.token;
            event.target.reset();
            reset(token, userInput)
                .then(response => {
                    // this.setState({ snackbaropen: true, snackbarmsg: response.data.message })
                    alert(response.data.message)
                    this.props.props.history.push('/')
                })
                .catch(error => {
                    this.setState({ snackbaropen: true, snackbarmsg: 'Password not reset' })
                    this.props.props.history.push('/')
                })
        }
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
                            Account recovery
                        </Typography>
                        <br /><br />
                        <Typography className="Title">
                            Enter new password to change
                        </Typography>

                        <br />

                        <ValidatorForm
                            autoComplete="off"
                            ref="form"
                            onSubmit={this.handleSubmit}
                        >

                            <br />
                            <TextValidator
                                label="Password"
                                onChange={this.handleChange}
                                name="password"
                                type="password"
                                value={this.state.password}
                                validators={["required"]}
                                className="Password"
                                errorMessages={["this field is required"]}
                            />

                            <br />

                            <div className="LoginButton">

                                {/* <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    disabled={this.state.submitted}
                                >
                                    {
                                        (this.state.submitted && 'Password changed successfully!')
                                        || (!this.state.submitted && 'Reset password')
                                    }
                                </Button> */}

                                <button
                                    type="submit"
                                    className="button-reset"
                                >
                                    Reset password
                                </button>
                            </div>
                        </ValidatorForm>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default ResetPasswordComponent;