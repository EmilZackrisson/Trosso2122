import React from "react";
import { Link } from "react-router-dom";
import TrossoBildOvan from "./TrossoBildOvan.jpg";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App bg-white dark:bg-gray-900 font-poppins">
      <header className="bg-accent grid h-50 p-24">
        <h1 className="text-center text-4xl">Trossö 2122</h1>
        <h3 className="text-center text-xl my-3">Trossö om 100 år</h3>
      </header>
      <main className="grid h-50 bg-white dark:bg-gray-900 text-black dark:text-white justify-center">
        <section className="styr-staden container">
          <div className="styr-staden-text">
            <h2 className="font-semibold text-4xl">Styr staden</h2>
            <p>Styr modellen via kartan</p>
            <Link to={"/karta"} className="btn-primary">
              Gå till kartan
            </Link>
          </div>
          <div className="md:flex justify-center">
            <img
              src={TrossoBildOvan}
              alt="Bild på Trossö från ovan"
              className="h-96 object-contain"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
