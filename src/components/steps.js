import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import doggie from "../assets/images/open-doodles/png/DoogieDoodle.png";
import resting from "../assets/images/open-doodles/png/LayingDoodle.png";
import playing from "../assets/images/open-doodles/png/DogJumpDoodle.png";

export default function Steps(props) {

  let step = (img, title, text) => {
    return (
      <div className='col-12 col-md-4 px-5 py-5'>
        <div>
          <img src={img}/>
        </div>
        <h3 className='subtitle-pet'>{title}</h3>
        <p className='txt'>
          {text}
        </p>
      </div>
    )
  }

  return (
    <div className='row align-items-center py-4 text-center'>
      {step(
        resting,
        "Agenda tu cita",
        "Comunicate con nosotros para tu primera visita a una de nuestras fundaciones."
      )}
      {step(
        playing,
        "Conoce a tu mascota",
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
