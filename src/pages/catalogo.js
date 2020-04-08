import React, { Fragment } from 'react'
import './styles/catalogo.scss'
//components
import SubHeader from '../components/subHeader'

let dummy = 'https://i.pinimg.com/originals/22/d2/aa/22d2aa3cf43c1e6a72d18887be3846c2.jpg'

export default function Catalogo() {

  let card = () => {
    return (
      <div className='col-12 col-md-2 mb-5'>
        <div className='img-container'>
          <img className='contain' src={dummy} alt={dummy} />
        </div>
        <div className='title-container'>
          <h6 className='subtitle-pet text-center'>Nombre</h6>
        </div>
      </div>
    )
  }

  return (
    <Fragment>
      <SubHeader />
      <section className='bg-yellow'>
        <div className='container-fluid'>
          <div className='row py-4'>
            <div className='col-12 col-md-2'>aside</div>
            {/* // area de catalogo */}
            <div className='col-12 col-md-8'>
              <h2 className='subtitle'>Mascotas</h2>
              <div className='row catalogo'>
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export function Select() {
  return (<Fragment>
    <div className="container">
      <div className="row">
        <div className="col-12">
          Raza
        </div>
        <div className="col-12">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown button
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Fragment>)
}
