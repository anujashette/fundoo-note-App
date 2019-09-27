import React from 'react';
import './App.css';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ResetPasswordPage from './pages/ResetPasswordPage'
import ForgotPage from './pages/ForgotPage';
import DashboardPage from './pages/DashboardPage';

class App extends React.Component {
  render() {
    
    return (
      <div className="App">
        <BrowserRouter>
          <Route path="/" component={LoginPage} exact></Route>
          <Switch>
            <Route path="/registration/" component={RegistrationPage}></Route>
            <Route path="/forgotpass/" component={ForgotPage}></Route>
            <Route path="/resetpassword/:token" component={ResetPasswordPage}></Route>
            <Route path="/dashboard" component={ DashboardPage }></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;