import React from 'react';
import "./styles/steps.scss";

const jumplarge = 'http://147.182.175.166:9000/pet-adoption/static/DogJumpDoodle1200w.webp'
const jumpmedium = 'http://147.182.175.166:9000/pet-adoption/static/DogJumpDoodle600w.webp'
const jumpsmall = 'http://147.182.175.166:9000/pet-adoption/static/DogJumpDoodle300w.webp'
const jumpxsmall = 'http://147.182.175.166:9000/pet-adoption/static/DogJumpDoodle150w.webp'

const doogielarge = 'http://147.182.175.166:9000/pet-adoption/static/DoogieDoodle1200w.webp'
const doogiemedium = 'http://147.182.175.166:9000/pet-adoption/static/DoogieDoodle600w.webp'
const doogiesmall = 'http://147.182.175.166:9000/pet-adoption/static/DoogieDoodle300w.webp'
const doogiexsmall = 'http://147.182.175.166:9000/pet-adoption/static/DoogieDoodle150w.webp'

const layinglarge = 'http://147.182.175.166:9000/pet-adoption/static/LayingDoodle1200w.webp'
const layingmedium = 'http://147.182.175.166:9000/pet-adoption/static/LayingDoodle600w.webp'
const layingsmall = 'http://147.182.175.166:9000/pet-adoption/static/LayingDoodle300w.webp'
const layingxsmall = 'http://147.182.175.166:9000/pet-adoption/static/LayingDoodle150w.webp'

export default function Steps(props) {
  return (
    <div className='steps-inner row align-items-center py-4 text-center'>
      <div className='col-12 col-md-4 py-5'>
        <img
          className="img-pet"
          src={jumpmedium}
          srcSet={`${jumpxsmall} 150w, ${jumpsmall} 300w, ${jumpmedium} 600w, ${jumplarge} 1200w`}
          alt={"Dibujo de un perro y su dueño saltando"}
        />
        <h3 className='subtitle-pet'>Agenda</h3>
        <p className='txt-pet'>
          Asiste a tu primera visita a una de nuestras fundaciones.
        </p>
      </div>
      <div className='col-12 col-md-4 py-5'>
        <img
          className="img-pet"
          src={doogiemedium}
          srcSet={`${doogiexsmall} 150w, ${doogiesmall} 300w, ${doogiemedium} 600w, ${doogielarge} 1200w`}
          alt={"Dibujo de un perro y su dueño acariciándolo"}
        />
        <h3 className='subtitle-pet'>Conoce</h3>
        <p className='txt-pet'>
          Conecta con tu mascota dentro y fuera de la fundacion.
        </p>
      </div>
      <div className='col-12 col-md-4 py-5'>
        <img
          className="img-pet"
          src={layingmedium}
          srcSet={`${layingxsmall} 150w, ${layingsmall} 300w, ${layingmedium} 600w, ${layinglarge} 1200w`}
          alt={"Dibujo de una persona acostada"}
        />
        <h3 className='subtitle-pet'>Aprende</h3>
        <p className='txt-pet'>
          Lee nuestros articulos y aprende como cuidar mejor de tu mascota.
        </p>
      </div>
    </div>
  )
}
