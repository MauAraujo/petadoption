import React from 'react'
import './styles/action-card.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

export default function ActionCard(props) {
  return (
    <div className="card">
      <div id="action" className="card-body">
        <button type="button" className="btn btn-primary rounded-pill">
          ¡Adóptame!
        </button>
        <button type="button" className="btn btn-primary rounded-pill">
          Donativo
        </button>
        <div className="row">
          <FontAwesomeIcon className="icon col-1" icon={faFacebookF} />
          <FontAwesomeIcon className="icon col-1" icon={faTwitter} />
          <FontAwesomeIcon className="icon col-1" icon={faInstagram} />
        </div>
      </div>
    </div>
  )
}
