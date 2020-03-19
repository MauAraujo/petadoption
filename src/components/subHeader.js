import React, { Fragment } from 'react'
import "./styles/NavBar.scss"
import './styles/sub-header.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarAlt, faHeart, faUser } from "@fortawesome/free-regular-svg-icons"
import { faPaw } from '@fortawesome/free-solid-svg-icons'

let mascota = "Gatos"
export default function SubHeader() {
    return (
        <Fragment>
            <div className="container-fluid sub-header">
                <div className="row pt-4 pb-2">
                    <div className="col-12 col-md-1">
                        <FontAwesomeIcon icon={faPaw} size='2x' />
                        <span className='ml-2'>{mascota}</span>
                    </div>
                    <div className="col-12 col-md-3 offset-md-8">
                        <div className="input-group">
                            <input type="text" className="form-control search input-outline" placeholder="Ingrese código postal" aria-label="Ingrese código postal" aria-describedby="Código postal" />
                            <div className="input-group-append">
                                <button className="btn btn-outline search " type="button" id="button-addon2">Buscar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
