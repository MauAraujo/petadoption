import React, { Fragment } from 'react'
import "./styles/NavBar.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarAlt, faHeart, faUser } from "@fortawesome/free-regular-svg-icons"
import { faPaw } from '@fortawesome/free-solid-svg-icons'

let mascota = "Gatos"
export default function SubHeader() {
    return (
        <Fragment>
            <div className="container-fluid sub-header my-1">
                <div className="row al">
                    <div className="col-6">
                        <FontAwesomeIcon icon={faPaw} size='2x' />
                        <h3>{mascota}</h3>
                    </div>
                    <div className="col-6">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control search" placeholder="Ingrese código postal" aria-label="Ingrese código postal" aria-describedby="Código postal" />
                            <div className="input-group-append">
                                <button className="btn btn-outline search " type="button" id="button-addon2">Button</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
