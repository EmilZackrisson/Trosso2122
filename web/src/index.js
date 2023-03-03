import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Dash from "./Dash";
import Kontakt from "./Kontakt";
import Karta from "./Karta";
import Info from "./Info";
import Nav from "./components/Nav";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="min-h-screen relative bg-white dark:bg-gray-900 font-poppins">
    <React.StrictMode>
      <BrowserRouter>
        <Nav />
        <div className="pb-5">
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route path="/dash" element={<Dash />} />
            <Route path="/karta" element={<Karta />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </React.StrictMode>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
