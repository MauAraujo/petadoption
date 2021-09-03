import React from 'react';
import './styles/discoverd.scss';
import dog from "../assets/images/puppy-portrait.webp";
import cat from "../assets/images/cat-portrait.webp";
// import parrot from "../assets/images/parrot-landscape-portrait.webp";
// import turtle from "../assets/images/turtle-portrait.webp";

const articleLocation = 'http://localhost:3000/articulos';

export default function DiscoverCard(props) {
    return (
        <div className="discover-container row row-cols-1 row-cols-md-2 g-4">
          <div className="col card-container">
            <div className="card h-100">
              <img src={dog} className="card-img-top" alt="..."></img>
              <div className="card-body">
                <h5 className="card-title">Cuidado de perros</h5>
                <a href={articleLocation + "?menu%5Banimal%5D=perro&page=1"} className="button">Aprende mas</a>
              </div>
            </div>
          </div>
          <div className="col card-container">
            <div className="card h-100">
              <img src={cat} className="card-img-top" alt="..."></img>
              <div className="card-body">
                <h5 className="card-title">Cuidado de gatos</h5>
                <a href="#" className="button">Aprende mas</a>
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
