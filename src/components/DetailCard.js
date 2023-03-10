import React from "react";
import "./styles/detail-card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faAddressBook,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

export default function DetailCard(props) {
  let address =
    "Avenida San Claudio, Blvrd 14 Sur, Cdad. Universitaria, 72592 Puebla, Pue.";
  let mail = "cuenta@conmigo.com";
  let phone = "222-772-1171";
  let sched1 = "Lunes a Viernes 8am - 6pm";
  let sched2 = "Sábados y Domingos 8am - 4pm";

  return (
    <div className="card border-secondary">
      <div className="card-body">
        <h5 className="card-title text-center">Asociación Cuenta Conmigo</h5>
        <div className="row">
          <div className="address col-6">
            <div className="section-header">
              <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
              <strong>Dirección</strong>
            </div>
            <p>{address}</p>
          </div>
          <div className="contact col-6">
            <div className="section-header">
              <FontAwesomeIcon className="icon" icon={faAddressBook} />
              <strong>Contacto</strong>
            </div>
            <p>{mail}</p>
            <p>{phone}</p>
          </div>
        </div>
        <div className="dropdown-divider"></div>
        <div className="sched">
          <div className="section-header">
            <FontAwesomeIcon className="icon" icon={faClock} />
            <strong>Horarios</strong>
          </div>
          <p>{sched1}</p>
          <p>{sched2}</p>
        </div>
      </div>
    </div>
  );
}
