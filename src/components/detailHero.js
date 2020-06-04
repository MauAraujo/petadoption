import React from "react";
import "./styles/detail-hero.scss";
import { Spin, Space, Carousel } from "antd";

let dummy =
  "https://i.pinimg.com/originals/22/d2/aa/22d2aa3cf43c1e6a72d18887be3846c2.jpg";
export default function DetailHero(props) {

    const onChange = () => {
        console.log('Change')
    }

  return (
    <div className="hero-container">
      {!props?.pet?.name ? (
        <Space size="large">
          <Spin size="large" />
        </Space>
      ) : (
        <div className="row">
            <div className="col-12 col-md-5">
                <Carousel afterChange={onChange}>
                    {
                        props.pet?.images.map(elem => <div key={props.pet?.images.indexOf(elem)}><img src={elem}></img></div>)
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
            <h4 className="section">Bueno con</h4>
            <p className="txt">
              {props.pet?.goodWith || ""}
            </p>
            <h4 className="section">Prefiere</h4>
            <p className="txt">
            {props.pet?.preferences || ""}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
