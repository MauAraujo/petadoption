import React from 'react';
import './styles/discoverd.scss';

const articleLocation = 'http://147.182.175.166/articulos';

const plarge = 'http://147.182.175.166:9000/pet-adoption/static/puppy1300w.webp'
const pmedium = 'http://147.182.175.166:9000/pet-adoption/static/puppy650w.webp'
const psmall = 'http://147.182.175.166:9000/pet-adoption/static/puppy325w.webp'
const pxsmall = 'http://147.182.175.166:9000/pet-adoption/static/puppy162w.webp'

const clarge = 'http://147.182.175.166:9000/pet-adoption/static/cat1300w.webp'
const cmedium = 'http://147.182.175.166:9000/pet-adoption/static/cat650w.webp'
const csmall = 'http://147.182.175.166:9000/pet-adoption/static/cat325w.webp'
const cxsmall = 'http://147.182.175.166:9000/pet-adoption/static/cat162w.webp'

export default function DiscoverCard(props) {
  return (
    <div className="discover-container row row-cols-1 row-cols-md-2 g-4">
      <div className="col card-container">
        <div className="card h-100">
          <img
            src={pmedium}
            srcSet={`${pxsmall} 162w, ${psmall} 325w, ${pmedium} 650w, ${plarge} 1300w`}
            className="card-img-top"
            alt="Retrato de cachorros en el pasto">
          </img>
          <div className="card-body">
            <h2 className="card-title">Cuidado de perros</h2>
            <a href={articleLocation + "?menu%5Banimal%5D=perro&page=1"} className="button">Aprende mas</a>
          </div>
        </div>
      </div>
      <div className="col card-container">
        <div className="card h-100">
          <img
            src={cmedium}
            srcSet={`${cxsmall} 162w, ${csmall} 325w, ${cmedium} 650w, ${clarge} 1300w`}
            className="card-img-top"
            alt="Retrato de un gato">
          </img>
          <div className="card-body">
            <h2 className="card-title">Cuidado de gatos</h2>
            <a href={articleLocation + "?menu%5Banimal%5D=gato&page=1"} className="button">Aprende mas</a>
          </div>
        </div>
      </div>
      {/* <div className="col card-container">
            <div className="card h-100">
              <img src={parrot} className="card-img-top" alt="..."></img>
              <div className="card-body">
                <h5 className="card-title">Cuidado de aves</h5>
                <a href="#" className="button">Aprende mas</a>
              </div>
            </div>
          </div>
          <div className="col card-container">
            <div className="card h-100">
              <img src={turtle} className="card-img-top" alt="..."></img>
              <div className="card-body">
                <h5 className="card-title txt">Cuidado de otras mascotas</h5>
                <a href="#" className="button">Aprende mas</a>
              </div>
            </div>
          </div> */}
    </div>
  )
}
