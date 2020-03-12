import React from 'react'
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import './styles/NavBar.scss'

export default function NavBar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-light fixed-top'>
      <div className='container'>
        <NavLink className='navbar-brand d-none d-sm-block' to='/'>
          Logotipo
          {/* <img className='img-fluid logo' src={logo} alt='' /> */}
        </NavLink>

        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <span>|</span>
            </li>
            <li className='nav-item-capital'>
              <NavLink exact activeClassName='active' to='/catalogo'>
                Adopciones
              </NavLink>
            </li>
          </ul>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item-capital'>
              <NavLink exact activeClassName='active' to='/catalogo'>
                Adopta ahora
              </NavLink>
            </li>
            <li className='nav-item'>
              <span>|</span>
            </li>
            <li className='nav-item'>
              <NavLink exact activeClassName='active' to='/'>
                Ingresar
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink exact activeClassName='active' to='/'>
                <FontAwesomeIcon icon={faBars} />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
