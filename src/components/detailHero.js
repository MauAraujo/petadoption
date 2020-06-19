import React from "react";
import "./styles/detail-hero.scss";
import { Spin, Space } from "antd";
import Carousel from "react-bootstrap/Carousel";
import { updatePublication } from "../services/publications.service";

export default function DetailHero(props) {
  const { pet } = props;

  if (pet?.publicationID) {
    updatePublication(pet.publicationID, { ...pet, views: ++pet.views || 1 });
  }
  return (
    <div className="hero-container">
      {!pet.name ? (
        <Space size="large">
          <Spin size="large" />
        </Space>
      ) : (
        <div className="row">
          <div className="col-12 col-md-5">
            <Carousel>
              {pet.images?.map((elem) => (
                <Carousel.Item key={pet.images.indexOf(elem)}>
                  <img
                    className="d-block w-100"
                    src={elem}
                    alt={pet.images.indexOf(elem)}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="col-12 col-md-7 px-3 py-3 py-md-5 px-md-5">
            <div className="header">
              <h1 className="title">{pet.name}</h1>
              <h3 className="subtitle">{`${pet.breed || "Raza desconocida"} · ${
                pet.location || "Lugar desconocido"
              }`}</h3>
            </div>
            <h4 className="section">Mis datos</h4>

            <ul>
              <li>
                <strong>Edad:</strong>{" "}
                {`${pet.age} ${pet.age === 1 ? "Año" : "Años"}`}
              </li>
              <li>
                <strong>Colores:</strong>{" "}
                {pet.colors.map((color, index) => {
                  return index === pet.colors.length - 1 ? color : `${color}, `;
                })}
              </li>
              <li>
                <strong>Genero:</strong> {pet.gender}
              </li>

              <li>
                <strong>Tamaño:</strong> {pet.petSize}
              </li>
              <li>
                <strong>Lugar:</strong> {pet.location}
              </li>
            </ul>

            <h4 className="section">Acerca de</h4>
            <p className="txt">{pet.description || "Sin descripción"}</p>
            <h4 className="section">Bueno con</h4>
            <p className="txt">{pet.goodWith || ""}</p>
            <h4 className="section">Prefiere</h4>
            <p className="txt">{pet.preferences || ""}</p>
          </div>
        </div>
      )}
    </div>
  );
}
