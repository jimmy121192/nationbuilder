import React from "react";
import {
  NavLink,
  Link
} from "react-router-dom";
import "./Header.css";
import imgSrc from "../img/nationbuilder.svg";
function Header(){

    return (
      <nav className="header">
        <Link to="/">
          <img className="nb-logo" src={imgSrc} alt="logo" />
        </Link>
        <ul className="top-menu">
          <li>
            <NavLink to="/events/">EVENTS</NavLink>
          </li>
          <li>
            <NavLink to="/people/">PEOPLE</NavLink>
          </li>
        </ul>
      </nav>
    );
  }

export default Header;
