import React from 'react';
import './styles/discoverd.scss';
import dog from "../assets/images/puppy-portrait.jpg";
import cat from "../assets/images/cat-portrait.jpg";
import parrot from "../assets/images/parrot-landscape-portrait.jpg";
import turtle from "../assets/images/turtle-portrait.jpg";

let dummy = 'https://i.pinimg.com/originals/22/d2/aa/22d2aa3cf43c1e6a72d18887be3846c2.jpg'

export default function DiscoverCard(props) {
    return (
        <div className="discover-container row row-cols-1 row-cols-md-2 g-4">
          <div className="col card-container">
            <div className="card h-100">
              <img src={dog} className="card-img-top" alt="..."></img>
              <div className="card-body">
                <h5 className="card-title">Cuidado de perros</h5>
                <a href="#" className="button">Aprende mas</a>
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
          <div className="col card-container">
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
          </div>
        </div>
    )
}
