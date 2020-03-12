import React from 'react'
import './styles/NavBar.scss'

class NavBar extends React.Component {
  render() {
    return (
      <nav className='navbar'>
        <ul className=''>
          <div>
            <li><a  className="primary" href="#">LOGO</a></li>
            <li><span>|</span></li>
            <li><a href="#">ADOPCIONES</a></li>
          </div>
          <div>
            <li><a className="primary" ref="#">ADOPTA AHORA</a></li>
            <li><span>|</span></li>
            <li><a href="#">INGRESAR</a></li>
          </div>
        </ul>
      </nav>
    )
  }
}

export default NavBar
