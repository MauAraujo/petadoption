import React from "react";
import "./styles/action-card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function ActionCard(props) {
  return (
    <div className="action-card">
      <div className="card">
        <div id="action" className="card-body">
          <button type="button" className="btn btn-primary rounded-pill">
            ¡Adóptame!
          </button>
          <button type="button" className="btn btn-primary rounded-pill">
            Donativo
          </button>
          <div className="social-banner">
            <FontAwesomeIcon className="social" icon={faFacebookF} />
            <FontAwesomeIcon className="social" icon={faTwitter} />
            <FontAwesomeIcon className="social" icon={faInstagram} />
          </div>
        </div>
      </div>
    </div>
  );
}
