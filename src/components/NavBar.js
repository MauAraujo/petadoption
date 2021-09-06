import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/NavBar.scss";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import logo from "../assets/images/cat.svg";

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" className="header">
      <Container>
        <Navbar.Brand>
          <NavLink className="navbar-brand d-none d-sm-block" to="/">
            <Image className="logo" src={logo} alt={"Logotipo de la página"}></Image>
            <span className="brand-name">Pet Adoption</span>
          </NavLink>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="header" />
        <Navbar.Collapse id="header">
          <Nav className="mr-auto">
            <Nav.Item>
              <span>|</span>
            </Nav.Item>
            <Nav.Item className="nav-item-capital">
              <NavLink exact activeClassName="active" to="/articulos">
                Artículos
              </NavLink>
            </Nav.Item>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Item className="nav-item-capital">
              <NavLink exact activeClassName="active" to="/catalogo">
                Adopta ahora
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <span>|</span>
            </Nav.Item>
            <Nav.Item>
              <NavLink exact activeClassName="active" to="/login">
                Ingresar
              </NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
