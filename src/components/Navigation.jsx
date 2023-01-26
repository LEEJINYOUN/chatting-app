import "./css/Navigation.css";
import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BiUser } from "react-icons/bi";

export default function Navigation() {
  return (
    <nav className="navContainer">
      <ul className="navUl">
        <li>
          <Link to="/" className="navHome">
            <AiFillHome className="navIcon" />
          </Link>
        </li>
        <li>
          <Link to="/profile" className="navProfile">
            <BiUser className="navIcon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
