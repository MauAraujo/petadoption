import React, { Fragment } from 'react'
//components
import Hero from '../components/Hero'
import SearchBar from '../components/search-bar'
import Available from '../components/available'
import Steps from '../components/steps'

export default function Homepage() {
  return (
    <Fragment>
      <div className='container my-4'>
        <Hero />
        <SearchBar />
        <Available />
      </div>
      <section className='bg-white'>
        <div className="container my-3">
          <Steps/>
        </div>
      </section>
    </Fragment>
  )
}
