import React from 'react'
import './styles/available.scss'

let dummy = 'https://i.pinimg.com/originals/22/d2/aa/22d2aa3cf43c1e6a72d18887be3846c2.jpg'


export default function Available(props) {

  let petCard = () => {
    return (
      <div className='col-2 col-md'>
        <div className='img-container'>
          <img className='contain' src={dummy} alt={dummy} />
        </div>
        <h4 className='subtitle-pet py-3'>Nombre</h4>
      </div>
    )
  }

  return (
    <div className='available-container'>
      <h2 className='subtitle'>Mascotas disponibles</h2>
      <div className='row mt-5 pb-3'>
        {petCard()}
        {petCard()}
        {petCard()}
        {petCard()}
        {petCard()}
      </div>
    </div>
  )
}
