import React, {Fragment} from 'react'
import Header from './NavBar'

export default function Layout(props) {
  return (
    <Fragment>
      <Header />
      {props.children}
    </Fragment>
  )
}
