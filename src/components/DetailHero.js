import React from "react";
import "./styles/detail-hero.scss";
import { Spin, Space } from "antd";
import Carousel from "react-bootstrap/Carousel";
import { updatePublication } from "../services/publications.service";

export default function DetailHero(props) {
  const thumborURL = process.env.REACT_APP_THUMBOR_URL;
  const { pet } = props;
  if (pet?.ID) {
    updatePublication(pet.ID, { ...pet, views: ++pet.views || 1 });
  }
  return (
    <div className="hero-container-detail">
      {!pet.name ? (
        <Space size="large">
          <Spin size="large" />
        </Space>
      ) : (
        <div className="row">
          <div className="col-12 col-md-6">
            <Carousel>
              {pet.images?.map((elem) => (
                <Carousel.Item key={pet.images.indexOf(elem)}>
                  <img
                    className="d-block w-100"
                    src={`${thumborURL}/unsafe/fit-in/x560/center/middle/smart/filters:format(webp)/${encodeURIComponent(
                      elem
                    )}`}
                    alt={pet.images.indexOf(elem)}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <div className="col-12 col-md-6 px-3 py-3 py-md-5 px-md-5">
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
            <p className="txt">{props.pet?.description || "Sin descripción"}</p>
            {props.pet.goodWith ? (
              <div>
                <h4 className="section">Cualidades</h4>
                <p className="txt">{props.pet?.goodWith || ""}</p>
              </div>
            ) : (
              <div></div>
            )}
            {props.pet.preferences ? (
              <div>
                <h4 className="section">Preferencias y Tratos Especiales</h4>
                <p className="txt">{props.pet?.preferences || ""}</p>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
