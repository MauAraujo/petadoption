import React, { Component, Fragment } from 'react'
import { Switch, Route } from "react-router-dom"
//Layout
import Layout from '../components/layout'
// Pages
import Homepage from './homepage'

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
            <Route component={Homepage} />
          </Switch>
        </Layout>
      </Fragment>
    )
  }
}
