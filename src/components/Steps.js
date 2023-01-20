import React from "react";
import "./styles/steps.scss";
import ResizeImage from "../lib/resize";

export default function Steps(props) {
  return (
    <div className="steps-inner row align-items-center py-4 text-center">
      <div className="col-12 col-md-4 py-5">
        <img
          className="img-pet"
          src={ResizeImage(650, "webp", "DogJumpDoodle.png")}
          srcSet={`${ResizeImage(
            162,
            "webp",
            "DogJumpDoodle.png"
          )} 162w, ${ResizeImage(
            325,
            "webp",
            "DogJumpDoodle.png"
          )} 325w, ${ResizeImage(
            650,
            "webp",
            "DogJumpDoodle.png"
          )} 650w, ${ResizeImage(1300, "webp", "DogJumpDoodle.png")} 1300w`}
          alt={"Dibujo de un perro y su dueño saltando"}
        />
        <h3 className="subtitle-pet">Agenda</h3>
        <p className="txt-pet">
          Asiste a tu primera visita a una de nuestras fundaciones.
        </p>
      </div>
      <div className="col-12 col-md-4 py-5">
        <img
          className="img-pet"
          src={ResizeImage(650, "webp", "DoggieDoodle.png")}
          srcSet={`${ResizeImage(
            162,
            "webp",
            "DoggieDoodle.png"
          )} 162w, ${ResizeImage(
            325,
            "webp",
            "DoggieDoodle.png"
          )} 325w, ${ResizeImage(
            650,
            "webp",
            "DoggieDoodle.png"
          )} 650w, ${ResizeImage(1300, "webp", "DoggieDoodle.png")} 1300w`}
          alt={"Dibujo de un perro y su dueño acariciándolo"}
        />
        <h3 className="subtitle-pet">Conoce</h3>
        <p className="txt-pet">
          Conecta con tu mascota dentro y fuera de la fundacion.
        </p>
      </div>
      <div className="col-12 col-md-4 py-5">
        <img
          className="img-pet"
          src={ResizeImage(650, "webp", "LayingDoodle.png")}
          srcSet={`${ResizeImage(
            162,
            "webp",
            "LayingDoodle.png"
          )} 162w, ${ResizeImage(
            325,
            "webp",
            "LayingDoodle.png"
          )} 325w, ${ResizeImage(
            650,
            "webp",
            "LayingDoodle.png"
          )} 650w, ${ResizeImage(1300, "webp", "LayingDoodle.png")} 1300w`}
          alt={"Dibujo de una persona acostada"}
        />
        <h3 className="subtitle-pet">Aprende</h3>
        <p className="txt-pet">
          Lee nuestros articulos y aprende como cuidar mejor de tu mascota.
        </p>
      </div>
    </div>
  );
}
