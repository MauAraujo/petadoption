import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faQuestionCircle,
  faHandPaper,
} from "@fortawesome/free-regular-svg-icons";

export default function Help() {
  let step = (icon, title, text) => {
    return (
      <div className="col-12 col-md-4 px-5 py-5">
        <div>
          <FontAwesomeIcon icon={icon} size="8x" />
        </div>
        <h3 className="subtitle-pet my-3">{title}</h3>
        <p className="txt">{text}</p>
      </div>
    );
  };

  return (
    <div className="row align-items-center py-4 text-center">
      {step(
        faFolder,
        "Agenda tu cita",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      )}
      {step(
        faQuestionCircle,
        "Conoce tu mascota",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      )}
      {step(
        faHandPaper,
        "Aprende",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      )}
    </div>
  );
}
