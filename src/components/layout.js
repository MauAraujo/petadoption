import React, {Fragment} from 'react'
import Header from './NavBar'
import Footer from './footer'

export default function Layout(props) {
  return (
    <Fragment>
      <Header />
      <section className='pt-5 my-3 '>{props.children}</section>
      <Footer/>
    </Fragment>
  )
}
