import React from 'react'
//components
import Hero from '../components/Hero'
import SearchBar from '../components/search-bar'
import Available from '../components/available'

export default function Homepage() {
  return (
    <div className='container my-4'>
      <Hero/>
      <SearchBar/>
      <Available/>
    </div>
  )
}
