import React from "react";
import { Link } from "react-router-dom";

function Nav() {

  return (
    <nav className="nav grid bg-accent rounded h-12 content-center grid-cols-2 font-sans text-white">
      <h1 className="mx-4 justify-self-start text-lg font-semibold">
        Trossö 2122
      </h1>
      <li className="flex mx-4 justify-self-end list-none gap-3 ">
        <Link to="/" id="home" className="hover:underline">
          <i className="material-icons"> home </i>
        </Link>
        <Link to="/dash" id="dash" className="hover:underline">
          <i className="material-icons"> grid_view </i>
        </Link>
        <Link to="/karta" id="map" className="hover:underline">
          <i className="material-icons"> map </i>
        </Link>
      </li>
    </nav>
  );
}

export default Nav;
