import React from "react";
import { useEffect } from "react";

function Nav(props) {
  //   if (props) {
  //     console.log(props);
  //     if (props.activePage) {
  //       document.getElementById(props.activePage).classList.add("text-underline");
  //     }
  //   }

  useEffect(() => {
    if (document.readyState === "complete") {
      document.getElementById(props.activePage).classList.add("font-bold");
      console.log(props.activePage);
    }
  }, []);

  return (
    <nav className="grid bg-accent rounded h-12 content-center grid-cols-2 font-sans">
      <h1 className="mx-4 justify-self-start text-lg font-semibold">
        Trossö 2122
      </h1>
      <li className="flex mx-4 justify-self-end list-none text-white gap-3 ">
        <a href="/" id="home" className="hover:underline">
          Hem
        </a>
        <a href="/dash" id="dash" className="hover:underline">
          Kontrollpanel
        </a>
        <a href="/karta" id="map" className="hover:underline">
          Karta
        </a>
      </li>
    </nav>
  );
}

export default Nav;
