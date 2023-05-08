import React from "react";
import { Link } from "react-router-dom";

function Nav() {

  return (
    
    <nav className="nav grid bg-secondary h-12 content-center grid-cols-2 font-sans text-white">
      <h1 className="mx-4 justify-self-start text-lg font-semibold">
        Trossö 2122
      </h1>
      <ul className="flex mx-4 justify-self-end list-none gap-3">
        <li>
        <Link to="/" id="home" className="hover:underline">
          <i className="material-icons"> home </i>
        </Link>
        </li>
        <li>
        <Link to="/dash" id="dash" className="hover:underline">
          <i className="material-icons"> grid_view </i>
        </Link>
        </li>
        <li>
        <Link to="/karta" id="map" className="hover:underline">
          <i className="material-icons"> map </i>
        </Link>
        </li>
        <li>
        <Link to="/kontakt" id="contact" className="hover:underline">
          <i className="material-icons"> contact_support </i>
        </Link>
        </li>
        <li>
        <Link to="/info" id="info" className="hover:underline">
          <i className="material-icons"> info </i>
        </Link>
        </li>
      </ul>
      
    </nav>
  );
}

export default Nav;
