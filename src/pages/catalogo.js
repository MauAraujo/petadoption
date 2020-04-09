import React, { Fragment } from 'react'
import './styles/catalogo.scss'
//components
import SubHeader from '../components/subHeader'
import { Col, Container, Row } from 'react-bootstrap'

let dummy = 'https://i.pinimg.com/originals/22/d2/aa/22d2aa3cf43c1e6a72d18887be3846c2.jpg'

export default function Catalogo() {

  let card = () => {
    return (
      <Col md={2}  className="mb-5">
        <div className='img-container'>
          <img className='contain' src={dummy} alt={dummy} />
        </div>
        <div className='title-container'>
          <h6 className='subtitle-pet text-center'>Nombre</h6>
        </div>
      </Col>
    )
  }

  return (
    <Fragment>
      <SubHeader />
      <section className='bg-yellow'>
        <Container fluid>
          <Row className="py-4">
            <Col md={2} >Aside</Col>
            <Col md={8} >
              <h2 className='subtitle'>Mascotas</h2>
              <Row className="catalogo">
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
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  )
}

// export function Select() {
//   return (<Fragment>
//     <div className="container">
//       <div className="row">
//         <div className="col-12">
//           Raza
//         </div>
//         <div className="col-12">
//           <div class="dropdown">
//             <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//               Dropdown button
//             </button>
//             <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//               <a class="dropdown-item" href="#">Action</a>
//               <a class="dropdown-item" href="#">Another action</a>
//               <a class="dropdown-item" href="#">Something else here</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </Fragment>)
// }
