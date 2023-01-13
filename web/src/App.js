import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App  text-white">
      <header className="bg-accent grid h-50 p-24">
        <h1 className="text-center text-4xl">Trossö 2122</h1>
        <h3 className="text-center text-xl my-3">Trossö om 100 år</h3>
      </header>
      <main className="grid h-50 p-24 bg-white text-black">
        <section className="container grid gap-3">
          <h2 className="font-extrabold text-4xl">Styr staden</h2>
          <p>Styr modellen via kartan</p>
          <Link to={"/karta"} className="btn btn-primary">Gå till kartan</Link>
        </section>
      </main>
    </div>
  );
}

export default App;
