import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1>Trossö 2122</h1>
				<a
					className="App-link"
					href="/dash"
					// target="_blank"
					rel="noopener noreferrer">
					Kontrollpanel
				</a>
			</header>
		</div>
	);
}

export default App;
