import React from "react";
import logo from "./logo.svg";
// import "./App.css";
import Nav from "./Nav";

function App() {
  return (
    <div className="App bg-main">
      {/* <nav>
				<h1>Trossö 2122</h1>
				<section className="nav-links">
					<a href="/" id="navSelected">
						Hem
					</a>
					<a href="/dash">Kontrollpanel</a>
				</section>
			</nav> */}
      <Nav activePage="home" />
      <header className="grid h-50">
        <h1>Trossö 2122</h1>
      </header>
    </div>
  );
}

export default App;
