import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from '../Login/Login';
import Recovery from '../Recovery/Recovery';
import ResetPassword from '../ResetPassword/ResetPassword';
import Register from '../Register/Register';
import Home from '../Home/Home';
import Poll from '../Poll/Poll';
import Success from '../Success/Success';
import CheckEmail from '../CheckEmail/CheckEmail';
import auth from '../../utils/auth';

class App extends Component {
  render() {
    return <main className="App">
      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <Route path="/login" render={() => auth.isUserLoggedIn ? <Redirect to="/home" /> : <Login />} />
      <Route path="/register" render={() => auth.isUserLoggedIn ? <Redirect to="/home" /> : <Register />} />
      <Route path="/recovery" render={() => auth.isUserLoggedIn ? <Redirect to="/home" /> : <Recovery />} />
      <Route path="/resetPassword/:token" render={() => <ResetPassword />} />
      <Route path="/checkEmail" render={() => <CheckEmail />} />
      <Route path="/home" render={() => auth.isUserLoggedIn ? <Home /> : <Redirect to="/login" />} />
      <Route path="/poll" render={() => auth.isUserLoggedIn ? <Poll /> : <Redirect to="/login" />} />
      <Route path="/success" render={() => <Success />} />
    </main>
  }
}

export default App;
