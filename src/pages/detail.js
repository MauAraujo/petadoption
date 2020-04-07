import React, { Fragment } from 'react'
//components
import ActionCard from '../components/actionCard'
import DetailCard from '../components/detailCard'
import DetailHero from '../components/detailHero'

export default function Detail() {
  return (
    <Fragment>
      <div className='container my-4'>
        <DetailHero/>
      </div>
        <div className="container my-3">
          <div className="row">
            <div className="col">
              <DetailCard className="col"/>
            </div>
            <div id="action-card-container" className="col">
              <ActionCard className="col"/>
            </div>
          </div>
        </div>
    </Fragment>
  )
}
