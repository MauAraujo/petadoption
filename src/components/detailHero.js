import React from "react";
import "./styles/detail-hero.scss";

let dummy =
  "https://i.pinimg.com/originals/22/d2/aa/22d2aa3cf43c1e6a72d18887be3846c2.jpg";
export default function DetailHero(props) {
  return (
    <div className="hero-container">
      <div className="row">
        <div className="col-12 col-md-5">
          <img className="contain" src={dummy} alt={dummy} />
        </div>
        <div className="col-12 col-md-7 px-3 py-3 py-md-5 px-md-5">
          <div className="header">
            <h1 className="title">Aquiles</h1>
            <h3 className="subtitle">Husky · Cholula</h3>
          </div>
          <h4 className="section">Acerca de</h4>
          <p className="txt">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque metus dui, porta a enim ut, commodo commodo nulla. Cras
            condimentum a felis ut posuere.
          </p>
          <h4 className="section">Bueno con</h4>
          <p className="txt">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque metus dui, porta a enim ut, commodo commodo nulla. Cras
            condimentum a felis ut posuere.
          </p>
          <h4 className="section">Prefiere</h4>
          <p className="txt">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque metus dui, porta a enim ut, commodo commodo nulla. Cras
            condimentum a felis ut posuere.
          </p>
        </div>
      </div>
    </div>
  );
}
