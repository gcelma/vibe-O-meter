import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Home from '../Home/Home';
import Success from '../Success/Success';

class App extends Component {
  render() {
    return <main className="App">
      <Route exact path="/" render={() => <Redirect to="/landing" />} />
      <Route path="/landing" render={() => <Landing />} />
      <Route path="/login" render={() => <Login />} />
      <Route path="/register" render={() => <Register />} />
      <Route path="/home" render={() => <Home />} />
      <Route path="/success" render={() => <Success />} />
    </main>
  }
}

export default App;
