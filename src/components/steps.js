import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import doggie from "../assets/images/open-doodles/png/DoogieDoodle.png";
import resting from "../assets/images/open-doodles/png/LayingDoodle.png";
import playing from "../assets/images/open-doodles/png/DogJumpDoodle.png"
;import "./styles/steps.scss";

export default function Steps(props) {

  let step = (img, title, text) => {
    return (
      <div className='col-12 col-md-4 py-5'>
          <img className="img-pet" src={img}/>
        <h3 className='subtitle-pet'>{title}</h3>
        <p className='txt-pet'>
          {text}
        </p>
      </div>
    )
  }

  return (
    <div className='steps-inner row align-items-center py-4 text-center'>
      {step(
        resting,
        "Agenda",
        "Asiste a tu primera visita a una de nuestras fundaciones."
      )}
      {step(
        playing,
        "Conoce",
        "Conecta con tu mascota dentro y fuera de la fundacion."
      )}
      {step(
        doggie,
        "Aprende",
        "Lee nuestros articulos y aprende como cuidar mejor de tu mascota."
      )}
    </div>
  )
}
