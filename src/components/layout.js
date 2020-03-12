import React, {Fragment} from 'react'
import Header from './NavBar'

export default function Layout(props) {
  return (
    <Fragment>
      <Header />
      <section className='pt-5'>{props.children}</section>
    </Fragment>
  )
}
