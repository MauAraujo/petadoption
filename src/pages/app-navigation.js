import React, { Component, Fragment } from 'react'
import { Switch, Route } from "react-router-dom"
//Layout
import Layout from '../components/layout'
// Pages
import Homepage from './homepage'
import Detail from './detail'
import Catalogo from './catalogo'
import Dashboard from './dashboard'

// Errors

export default class AppNavigation extends Component {
  render() {
    return (
      <Fragment>
        {/* <Legal/> */}
        <Layout>
          <Switch>
            <Route path='/' exact component={Homepage} />
            <Route path='/about' exact component={Homepage} />
            <Route path='/detail' exact component={Detail} />
            <Route path='/catalogo' exact component={Catalogo} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route component={Homepage} />
          </Switch>
        </Layout>
      </Fragment>
    )
  }
}
