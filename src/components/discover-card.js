import React from 'react'
import './styles/discoverd.scss'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

let dummy = 'https://i.pinimg.com/originals/22/d2/aa/22d2aa3cf43c1e6a72d18887be3846c2.jpg'

export default function DiscoverCard(props) {
    // let card = () => {
    //     return(
    //     <Col md={2} className="mb-5 publication-card">
    //       <Link>
    //         <div class="card">
    //           <img src={dummy} class="card-img-top" alt=""></img>
    //           <div class="card-body">
    //             <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //           </div>
    //         </div>
    //       </Link>
    //     </Col>
    //     )
    // }
  return (
      <div className="row justify-content-center discover-container my-5">
        <div className="row mt-5 pb-3">

          <Col md={3} className="mb-5 publication-card">
          <Link>
            <div class="card">
              <img src={dummy} class="card-img-top" alt=""></img>
              <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
            </div>
          </Link>
          </Col>

          <Col md={3} className="mb-5 publication-card">
            <Link>
              <div class="card">
                <img src={dummy} class="card-img-top" alt=""></img>
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
            </Link>
          </Col>

          <Col md={3} className="mb-5 publication-card">
            <Link>
              <div class="card">
                <img src={dummy} class="card-img-top" alt=""></img>
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
            </Link>
          </Col>

          </div>
        </div>
  )
}
