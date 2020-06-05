import React from "react";
import "./styles/detail-hero.scss";
import { Spin, Space } from "antd";
import Carousel from 'react-bootstrap/Carousel';

export default function DetailHero(props) {
  return (
    <div className="hero-container">
      {!props?.pet?.name ? (
        <Space size="large">
          <Spin size="large" />
        </Space>
      ) : (
        <div className="row">
            <div className="col-12 col-md-5">
                <Carousel>
                    {
                        props?.pet?.images?.map(elem =>
                            <Carousel.Item key={props?.pet?.images.indexOf(elem)}>
                                <img
                                    className="d-block w-100"
                                    src={elem}
                                    alt={props?.pet?.images.indexOf(elem)}
                                />
                            </Carousel.Item>
                        )
                    }
                </Carousel>
            </div>
          <div className="col-12 col-md-7 px-3 py-3 py-md-5 px-md-5">
            <div className="header">
              <h1 className="title">{props.pet?.name}</h1>
              <h3 className="subtitle">{`${props.pet?.breed || "Raza desconocida"} · ${
                props.pet?.location || "Lugar desconocido"
              }`}</h3>
            </div>
            <h4 className="section">Acerca de</h4>
            <p className="txt">
              {props.pet?.description || "Sin descripción"}
            </p>
              {
                  props.pet.goodWith ?
                      <div>
                          <h4 className="section">Cualidades</h4>
                          <p className="txt">
                              {props.pet?.goodWith || ""}
                          </p>
                      </div>
                      :
                  <div></div>
              }
              {
                  props.pet.preferences ?
                      <div>
                          <h4 className="section">Preferencias y Tratos Especiales</h4>
                          <p className="txt">
                              {props.pet?.preferences || ""}
                          </p>
                      </div>
                      :
                      <div></div>
              }
          </div>
        </div>
      )}
    </div>
  );
}
