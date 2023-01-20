import React from "react";
import "./styles/discoverd.scss";
import ResizeImage from "../lib/resize";

const articleLocation = `${process.env.BASE_URL}/articulos`;

export default function DiscoverCard(props) {
  return (
    <div className="discover-container row row-cols-1 row-cols-md-2 g-4">
      <div className="col card-container">
        <div className="card h-100">
          <img
            src={ResizeImage(650, "webp", "puppy.png")}
            srcSet={`${ResizeImage(
              162,
              "webp",
              "puppy.png"
            )} 162w, ${ResizeImage(
              325,
              "webp",
              "puppy.png"
            )} 325w, ${ResizeImage(
              650,
              "webp",
              "puppy.png"
            )} 650w, ${ResizeImage(1300, "webp", "puppy.png")} 1300w`}
            className="card-img-top"
            alt="Retrato de cachorros en el pasto"
          ></img>
          <div className="card-body">
            <h2 className="card-title">Cuidado de perros</h2>
            <a
              href={articleLocation + "?menu%5Banimal%5D=perro&page=1"}
              className="button"
            >
              Aprende mas
            </a>
          </div>
        </div>
      </div>
      <div className="col card-container">
        <div className="card h-100">
          <img
            src={ResizeImage(650, "webp", "cat.png")}
            srcSet={`${ResizeImage(162, "webp", "cat.png")} 162w, ${ResizeImage(
              325,
              "webp",
              "cat.png"
            )} 325w, ${ResizeImage(650, "webp", "cat.png")} 650w, ${ResizeImage(
              1300,
              "webp",
              "cat.png"
            )} 1300w`}
            className="card-img-top"
            alt="Retrato de un gato"
          ></img>
          <div className="card-body">
            <h2 className="card-title">Cuidado de gatos</h2>
            <a
              href={articleLocation + "?menu%5Banimal%5D=gato&page=1"}
              className="button"
            >
              Aprende mas
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
