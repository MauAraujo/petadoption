import React from 'react'
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import './styles/NavBar.scss'
import { Navbar, Container, Nav, Image, Row, Col } from 'react-bootstrap'
import logo from '../assets/images/cat.svg'


export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" >
      <Container>
        <Navbar.Brand fluid>

          <NavLink className='navbar-brand d-none d-sm-block' to='/'>
            Logotipo
            {/* <Image className="logo"  src={logo}></Image> */}
            {/* 
              <Row>
                <Col sm={6} lg={2}>
                  
                </Col>
                <Col >
                Logotipo
                </Col>
              </Row> */}


            {/* <img className='img-fluid logo' src={logo} alt='' /> */}
          </NavLink>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="header" />
        <Navbar.Collapse id="header">
          <Nav className='mr-auto'>
            <Nav.Item >
              <span>|</span>
            </Nav.Item>
            <Nav.Item className='nav-item-capital'>
              <NavLink exact activeClassName='active' to='/catalogo'>
                Adopciones
              </NavLink>
            </Nav.Item>
          </Nav>
          <Nav className='ml-auto'>
            <Nav.Item className='nav-item-capital'>
              <NavLink exact activeClassName='active' to='/catalogo'>
                Adopta ahora
              </NavLink>
            </Nav.Item>
            <Nav.Item >
              <span>|</span>
            </Nav.Item>
            <Nav.Item >
              <NavLink exact activeClassName='active' to='/'>
                Ingresar
              </NavLink>
            </Nav.Item>
            <Nav.Item >
              <NavLink exact activeClassName='active' to='/'>
                <FontAwesomeIcon icon={faBars} />
              </NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        {/* <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button> */}


      </Container>

    </Navbar>
    // <nav className='navbar navbar-expand-lg navbar-light fixed-top'>

    // </nav>
  )
}
