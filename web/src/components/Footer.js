import React from "react";

const Footer = (serialStatus, websocketStatus) => {
  return (
    <footer className="footer grid grid-flow-col grid-cols-3 bg-accent text-white h-10 rounded-lg absolute bottom-0 left-0 w-full text-center content-center">
      <p>{serialStatus.serialStatus}</p>
      <p className="col-">© Emil Zackrisson 2023</p>
      <p>{websocketStatus.websocketStatus}</p>
    </footer>
  );
};

export default Footer;
