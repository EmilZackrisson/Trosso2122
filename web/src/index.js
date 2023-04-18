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

// Områden
import Stortorget from "./områden/Stortorget";
import Hoglandspark from "./områden/Hoglandspark";
import Skeppsbrokajen from "./områden/Skeppsbrokajen";
import Skolor from "./områden/Skolor";
import Möllebacken from "./områden/Möllebacken";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
     <div className="min-h-screen relative bg-white dark:bg-gray-900 font-poppins">
          <React.StrictMode>
               <BrowserRouter>
                    <Nav />
                    <div className="pb-5">
                         {/* Antal sidor: 10 */}
                         <Routes>
                              <Route exact path="/" element={<App />} />
                              <Route path="/dash" element={<Dash />} />
                              <Route path="/karta" element={<Karta />} />
                              <Route path="/kontakt" element={<Kontakt />} />
                              <Route path="/info" element={<Info />} />
                              // Områden
                              <Route
                                   path="/omrade/Stortorget"
                                   element={<Stortorget />}
                              />
                              <Route
                                   path="/omrade/Hoglandspark"
                                   element={<Hoglandspark />}
                              />
                              <Route
                                   path="/omrade/Skeppsbrokajen"
                                   element={<Skeppsbrokajen />}
                              />
                              <Route
                                   path="/omrade/Skolor"
                                   element={<Skolor />}
                              />
                              <Route
                                   path="/omrade/Möllebacken"
                                   element={<Möllebacken />}
                              />
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
