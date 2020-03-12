import React, { Fragment } from 'react'
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import './styles/footer.scss'

export default function Footer(props) {
  return (
    <Fragment>
      <div className='footer-container'>
        <div className='container py-4'>
          <div className='row no-gutters'>
            <div className='col-12 col-md-3'>
              <div className='row'>
                <div className='col-12'>
                  <h2 className='title'>Logo</h2>
                </div>
                <div className='col-12'>
                  <p className='txt'>
                    Avenida San Claudio,
                    <br />
                    Blvrd 14 Sur, Cdad. Universitaria,
                    <br /> 72592 Puebla, Pue.
                  </p>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-3'>
              <h2 className='subtitle'>Fundacion</h2>
              <div className='row'>
                <div className='col-6'>Acerca</div>
                <div className='col-6'>Sponsors</div>
                <div className='col-6'>Blog</div>
                <div className='col-6'>Mercancia</div>
                <div className='col-6'>FAQ</div>
                <div className='col-6'>Descargas</div>
                <div className='col-6'>Contact</div>
              </div>
            </div>

            <div className='col-12 col-md-4 offset-md-2'>
              <h2 className='subtitle'>Mantenos informados</h2>
              <p className='txt'>
                ¿Quieres actualizaciones y noticias en tu correo?
              </p>
              <form>
                <div class='form-row'>
                  <div class='form-group col-md-6'>
                    <input
                      type='text'
                      class='form-control input-outline'
                      id='name'
                      placeholder='Nombre'
                    />
                  </div>
                  <div class='form-group col-md-6'>
                    <input
                      type='mail'
                      class='form-control input-outline'
                      id='mail'
                      placeholder='Correo electronico'
                    />
                  </div>
                </div>
                <button type='submit' class='btn button'>
                  Aceptar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='legal-container'>
        <div className='container'>
          <nav className='navbar navbar-expand-lg'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <span>© Derechos reservados | 2020</span>
              </li>
            </ul>
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <NavLink exact activeClassName='active' to='/'>
                  Terminos y condiciones
                </NavLink>
              </li>
              <li className='nav-item'>
                <span>·</span>
              </li>
              <li className='nav-item'>
                <NavLink exact activeClassName='active' to='/'>
                  Avisos de privacidad
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Fragment>
  )
}
