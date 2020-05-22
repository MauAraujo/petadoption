import React from "react";
import "./styles/available.scss";
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

let dummy =
  "https://i.pinimg.com/originals/22/d2/aa/22d2aa3cf43c1e6a72d18887be3846c2.jpg";

export default function Available(props) {
  console.log(props);

  let card = (publication, index) => {
    return (
      <Col md={2} className="mb-5 publication-card" key={publication.id || index} >
        <Link to={"/detail/"+(publication.id || index)}>
          <div className='img-container'>
            <img className='contain' src={dummy} alt={dummy} />
          </div>
          <div className='title-container'>
            <h6 className='subtitle-pet text-center'>{publication.name}</h6>
          </div>
        </Link>
      </Col>
    )
  }

  let petCard = (publication, index) => {
    return (
      <div className="col-12 col-md" key={publication.id || index}>
        <div className="img-container">
          <img className="contain" src={dummy} alt={dummy} />
        </div>
        <h4 className="subtitle-pet py-3">
          {publication.name || "Sin nombre"}
        </h4>
      </div>
    );
  };

  return (
    <div className="available-container">
      <h2 className="subtitle">Mascotas disponibles</h2>
      <div className="row mt-5 pb-3 available">
        
        {props.publications.map((publication, index) => {
          return card(publication, index);
        })}
        {/* {}
        {petCard()}
        {petCard()}
        {petCard()}
        {petCard()} */}
      </div>
    </div>
  );
}
