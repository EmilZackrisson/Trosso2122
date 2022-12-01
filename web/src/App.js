import logo from "./logo.svg";
import "./App.css";

function App() {
	return (
		<div className="App">
			<nav>
				<h1>Trossö 2122</h1>
				<section className="nav-links">
					<a href="/Trosso2122" id="navSelected">
						Hem
					</a>
					<a href="/Trosso2122/dash">Kontrollpanel</a>
				</section>
			</nav>
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1>Trossö 2122</h1>
				<a
					className="App-link"
					href="/Trosso2122/dash"
					rel="noopener noreferrer">
					Kontrollpanel
				</a>
			</header>
		</div>
	);
}

export default App;
