import React from 'react'

export default function Steps(props) {

  let step = () => {
    return (
      <div className='col-12 col-md-4 px-5 py-5'>
        <span>Icono</span>
        <h3 className='subtitle-pet'>Step</h3>
        <p className='txt'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    )
  }

  return (
    <div className='row align-items-center py-4 text-center'>
      {step()}
      {step()}
      {step()}
    </div>
  )
}
