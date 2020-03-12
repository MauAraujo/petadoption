import React from 'react'
import './styles/discoverd.scss'

let dummy = 'https://i.pinimg.com/originals/22/d2/aa/22d2aa3cf43c1e6a72d18887be3846c2.jpg'

export default function DiscoverCard(props) {
  return (
    <div className='row discover-container my-5'>
      <div className='col-12 col-md-6'>
        <div className='img-container'>
          <img className='contain' src={dummy} alt={dummy} />
          <div className='gradient'></div>
        </div>
        <div className='text-container text-center'>
          <h4 className='title'>Perro</h4>
          <div className='btn button'>Conoce su historia.</div>
        </div>
      </div>
    </div>
  )
}
