import React, { Fragment } from 'react'
//components
import Hero from '../components/Hero'
import ActionCard from '../components/ActionCard'
import DetailCard from '../components/DetailCard'
import DetailHero from '../components/DetailHero'

export default function Detail() {
  return (
    <Fragment>
      <div className='container my-4'>
        <Hero/>
      </div>
        <div className="container my-3">
          <div className="row">
            <div className="col">
              <DetailCard className="col"/>
            </div>
            <div className="col">
              <ActionCard className="col"/>
            </div>
          </div>
        </div>
    </Fragment>
  )
}
