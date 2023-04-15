import React from "react";
import { Link } from "react-router-dom";
import TrossoBildOvan from "./TrossoBildOvan.jpg";
import kna2 from "./kna2.jpg";
import Flygfoto from "./trossöFlygfoto.jpg";

function App() {
  return (
    <div className="App bg-white dark:bg-gray-900 font-poppins">
      <header className="grid h-[calc(100vh-48px)] p-24 main-header place-items-center">
        <img
          id="header-img"
          src={Flygfoto}
          alt="Bakgrundsbild på Karlskrona"
          className=""
        />
        <div className="header-content">
          <h1 className="text-center text-7xl">Trossö 2122</h1>
          <h2 className="text-center text-2xl my-3">Trossö om 100 år</h2>
        </div>
        <div class="scroll-downs">
          <div class="mousey">
            <div class="scroller"></div>
          </div>
        </div>
      </header>
      <main className="main-start grid bg-white dark:bg-gray-900 text-black dark:text-white justify-center">
        <section className="styr-staden container h-screen flex lg:flex-row sm:flex-col sm:justify-end ">
          <div className="styr-staden-text">
            <h3 className="font-semibold text-4xl">Styr staden</h3>
            <p>Styr vår interaktiva modell av staden</p>
            <Link to={"/karta"} className="btn btn-secondary">
              Gå till kartan
            </Link>
          </div>
          <img
            src={TrossoBildOvan}
            alt="Bild på Trossö från ovan"
            className="sm:w-12/12 w-4/12 object-contain"
          />
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
