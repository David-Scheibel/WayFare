import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Switch} from "react-router-dom"
import React, { useState } from 'react';

import MainContainer from './containers/MainContainer'
import Login from './components/Login'
import Signup from './components/Signup'


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>

          <Route path='/' exact><Login /></Route>

          <Route path='/wayfarer'><MainContainer /></Route>

          <Route path='/signup' component={Signup}/>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
