import React, { Component } from "react";
import logo from "../assets/image/logo.svg";
import { NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header id="header">
        <div className="center">
          <div id="logo">
            <img src={logo} className="app-logo" alt="logotipo" />
            <span id="brand">
              <strong>Blog</strong>Viajes
            </span>
          </div>

          <nav id="menu">
            <ul>
              <li>
                <NavLink to="/" activeClassName="active">
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" activeClassName="active">
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink to="/formulario" activeClassName="active">
                  Formulario
                </NavLink>
              </li>
              <li>
                <NavLink to="/peliculas" activeClassName="active">
                  Peliculas
                </NavLink>
              </li>
              <li>
                <NavLink to="/pruebas/Everto" activeClassName="active">
                  Pagina 2
                </NavLink>
              </li>
            </ul>
          </nav>
          {/*Limpiar flotados */}
          <div className="clearfix"></div>
        </div>
      </header>
    );
  }
}

export default Header;
