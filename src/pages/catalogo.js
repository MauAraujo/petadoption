import React, { Fragment } from 'react'
//components
import Hero from '../components/Hero'
import SearchBar from '../components/search-bar'
import Available from '../components/available'
import Steps from '../components/steps'
import SubHeader from '../components/subHeader'

export default function Catalogo() {
  return (
    <Fragment>
      <SubHeader />
      <div className='container my-4'>
        <Select />

      </div>
      <section className='bg-white'>
        <div className="container my-3">
          {/* <Steps /> */}
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
