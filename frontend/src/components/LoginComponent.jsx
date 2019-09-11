import React, { Component } from 'react';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { login } from '../services/UserService'
import Snackbar from '@material-ui/core/Snackbar'
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom'
import '../App.css'

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                email: '',
                password: '',


            },
            snackbaropen: false,
            snackbarmsg: '',
            submitted: false,
            loggedIn: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleRegister = this.handleRegister.bind(this)

    }

    snackBarClose = () => {
        this.setState({ snackbaropen: false })
    }
    handleChange = event => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
        // console.log('form data',this.state.formData)
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('form data in submit', this.state.formData)

        if (!this.state.formData.email) {
            console.log('email should not be empty')
            this.setState({ snackbaropen: true, snackbarmsg: 'Email should not be empty' })
        }
        else if (this.state.formData.password.length < 6) {
            this.setState({ snackbaropen: true, snackbarmsg: 'password too short. At least 6 characters' })
        }
        else {
            let userInput = {
                email: this.state.formData.email,
                password: this.state.formData.password
            }
            console.log('form data in submit', userInput)

            // var formData = Object.assign({}, this.state.formData);
            // Object.keys(formData).map((key, index) => {
            //     formData[key] = '';
            //     return ''
            // });
            // this.setState({ formData })

            login(userInput)
                .then(async (response) => {
                    // if(response.data.data.email === this.state.formData.email  && response.data.data.password === this.state.formData.password ){
                    console.log('login', response.data.data)
                    localStorage.setItem('LoginToken', response.data.data.token)
                    localStorage.setItem('firstname', response.data.data.user.firstname)
                    localStorage.setItem('lastname', response.data.data.user.lastname)
                    localStorage.setItem('email', response.data.data.user.email)
                    localStorage.setItem('imageurl', response.data.data.user.imageurl)
                    localStorage.setItem('token1', true)

                    await this.setState({ snackbaropen: true, snackbarmsg: response.data.message, loggedIn: true })
                    console.log("in login", this.state.loggedIn);
                    //  this.renderRedirect()
                    // if(localStorage.getItem('token1') !== undefined)
                    // this.props.props.history.push('/dashboard')
                    // else
                    // this.props.props.history.push('/')
                    // }
                }).catch((errorMessages) => {
                    console.log('login error', errorMessages)
                    this.setState({ snackbaropen: true, snackbarmsg: 'Email is not verified OR Credentials are incorrect' })
                })
        }
    }
    renderRedirect = () => {
        console.log("in rediect", this.state.loggedIn);

        if (this.state.loggedIn) {
            return <Redirect to={{ pathname: '/dashboard' }} />
            // this.props.props.history.push('/dashboard')
        }
    }

    handleRegister = () => {
        console.log('in handle register')
        this.props.props.history.push('/registration')
    }

    handleForgetPassword = () => {
        this.props.props.history.push('/forgotpass')
    }

    localStorageClear = () =>{
        localStorage.clear()
    }

    render() {
        return (
            this.state.loggedIn ?
                (<Redirect
                    to={{
                        pathname: "/dashboard",
                        // state: { from: props.location }
                    }}
                />
                ) : (
                    <div>

                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={this.state.snackbaropen}
                            autoHideDuration={5000}
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
                                    Sign in
                        </Typography>

                                <br />
                                {this.localStorageClear}
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
                                        value={this.state.formData.email}
                                        className="Emaillogin"
                                        validators={['required', 'isEmail']}
                                        errorMessages={['this field is required', 'email is not valid']}
                                    />

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
                                    <div className="CreateAccount">
                                        <button
                                            className="login-button-letter"
                                            onClick={this.handleForgetPassword}
                                        >
                                            Forgot Password?
                                </button>
                                    </div>
                                    <br />

                                    <div className="LoginButton">
                                        <button
                                            className="login-button-letter"
                                            onClick={this.handleRegister}>
                                            Create account
                                </button>
                                        <button
                                            type="submit"
                                            className="button-letter"
                                        >
                                            Login
                                </button>
                                    </div>
                                </ValidatorForm>
                            </CardContent>
                        </Card>
                    </div>
                )
        );
    }
}

export default LoginComponent;