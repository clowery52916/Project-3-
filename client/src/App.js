import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import User from './components/User'
import axios from 'axios'
import syledComponent from 'styled-components'
import NavBar from './components/NavBar'
import Movies from './components/Movies'

export default class App extends Component {
  render () {
    return (

      <Router>
        <div>
        <NavBar />
          <Switch>
            <Route exact path="/" component={User}/>
            <Route path ='/movies' component={Movies}/>
          </Switch>
        </div>
      </Router>
    )
  }
}