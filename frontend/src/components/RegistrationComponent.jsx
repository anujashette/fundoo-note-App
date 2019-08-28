import React, { Component } from 'react';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import { register } from '../services/UserService';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../App.css'

class RegistrationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                email: '',
                firstname: '',
                lastname: '',
                password: '',
            },
            snackbaropen: false,
            snackbarmsg: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    snackBarClose = () => {
        this.setState({ snackbaropen: false })
    }
    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('form data in submit', this.state.formData)

        if (!this.state.formData.email) {
            console.log('email should not be empty')
            this.setState({ snackbaropen: true, snackbarmsg: 'Email should not be empty' })
        }
        else if (!this.state.formData.firstname) {
            console.log('firstname should not be empty')
            this.setState({ snackbaropen: true, snackbarmsg: 'Firstname should not be empty' })
        }
        else if (!this.state.formData.lastname) {
            console.log('lastname should not be empty')
            this.setState({ snackbaropen: true, snackbarmsg: 'Lastname should not be empty' })
        }
        else if (!this.state.formData.password) {
            console.log('Password should not be empty')
            this.setState({ snackbaropen: true, snackbarmsg: 'Password should not be empty' })
        }
        else if (this.state.formData.password.length < 6) {
            this.setState({ snackbaropen: true, snackbarmsg: 'password too short. At least 6 characters' })
        }
        else {
            let userInput = {
                email: this.state.formData.email,
                firstname: this.state.formData.firstname,
                lastname: this.state.formData.lastname,
                password: this.state.formData.password
            }

            // event.target.reset();
            // this.setState({
            //     firstname: '',
            //     lastname: ''
            // })
            var formData = Object.assign({}, this.state.formData);
            Object.keys(formData).map((key, index) => {
                formData[key] = '';
                return ''
            });

            this.setState({ formData })

            register(userInput)
                .then((response) => {
                    console.log('register', response.data)
                    this.setState({ snackbaropen: true, snackbarmsg: response.data.message })
                    this.setState({
                        firstname: '',
                        lastname: ''
                    })
                    var formData = Object.assign({}, this.state.formData);
                    Object.keys(formData).map((key, index) => {
                        formData[key] = '';
                        return ''
                    });
                }).catch((errorMessages) => {
                    console.log('error', errorMessages)
                    this.setState({ snackbaropen: true, snackbarmsg: 'User already exist' })
                })
        }
    }

    handleLogin = () => {
        console.log('in handle Login')
        this.props.props.history.push('/')
    }

    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.state.snackbaropen}
                    autoHideDuration={4000}
                    onClose={this.snackBarClose}

                    message={<span id="message-id">{this.state.snackbarmsg}</span>}
                ></Snackbar>

                <Card id="cardid" >
                    <CardContent>
                        <Typography variant="h5">
                            {/* FundooNotes */}
                            <span className="font-color">F</span>
                            <span className="font-color">u</span>
                            <span className="font-color">n</span>
                            <span className="font-color">d</span>
                            <span className="font-color">o</span>
                            <span className="font-color">o</span>
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Create your Fundoo Account
                        </Typography>

                        <br />

                        <ValidatorForm
                            autoComplete="off"
                            ref="form"
                            onSubmit={this.handleSubmit}
                        >
                            <div className="NameText">
                                <TextField
                                    required
                                    label="First name"
                                    onChange={this.handleChange}
                                    name="firstname"
                                    value={this.state.formData.firstname}
                                    className="FName"
                                />

                                <TextField
                                    required
                                    label="Last name"
                                    onChange={this.handleChange}
                                    name="lastname"
                                    value={this.state.formData.lastname}
                                    className="FName"
                                />
                            </div>

                            <br />
                            <TextValidator
                                label="Email"
                                onChange={this.handleChange}
                                name="email"
                                value={this.state.formData.email}
                                className="Email"
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                            />

                            <br />
                            <br />

                            <TextValidator
                                label="Password"
                                onChange={this.handleChange}
                                name="password"
                                type='password'
                                value={this.state.formData.password}
                                validators={['required']}
                                className="Password"
                                errorMessages={['this field is required']}
                            />
                            <br />
                            {/* <label className="label-font">Use 6 or more characters with letters, numbers & symbols</label> */}
                            <br />

                            <div className="Button">
                                <button
                                    className="login-button-letter"
                                    onClick={this.handleLogin}>
                                    Sign in instead
                                </button>
                                <button
                                    onClick={this.handleSubmit}
                                    type="submit"
                                    className="button-letter">
                                    Signup
                                </button>
                            </div>
                        </ValidatorForm>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default RegistrationComponent;