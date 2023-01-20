import React from "react";
import "./styles/hero.scss";
import { Link } from "react-router-dom";
import ResizeImage from "../lib/resize";

export default function Hero() {
  return (
    <div className="hero-container hero">
      <div className="row no-gutters">
        <div className="col-12 col-md-5">
          <img
            className="contain"
            src={ResizeImage(650, "webp", "pets.png")}
            srcSet={`${ResizeImage(
              162,
              "webp",
              "pets.png"
            )} 162w, ${ResizeImage(
              325,
              "webp",
              "pets.png"
            )} 325w, ${ResizeImage(
              650,
              "webp",
              "pets.png"
            )} 650w, ${ResizeImage(1300, "webp", "pets.png")} 1300w`}
            alt={"Mascotas sentadas juntas"}
          />
        </div>
        <div className="col-12 col-md-7 px-3 py-3 py-md-5 px-md-5">
          <h1 className="title">Encuentra la mascota ideal</h1>
          <div className="subtitle-container">
            <p className="txt">
              Encuentra a tu mejor amigo en alguna de nuestras fundaciones con
              años de experiencia en el rescate de animales.
            </p>
            <div className="row no-gutters mt-5">
              <div className="col-12 col-md-6">
                <Link to={"/catalogo/"}>
                  <div className="btn button-aux">Explora</div>
                </Link>
              </div>
              <div className="col-12 col-md-6">
                <Link to={"/articulos/"}>
                  <div className="btn button-aux">Aprende</div>
                </Link>
              </div>
            </div>
            <div className="row no-gutters mt-5" style={{ maxWidth: 360 }}>
              <Link to={"/dieta/"}>
                <div className="btn button-aux">Obtener una dieta</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
