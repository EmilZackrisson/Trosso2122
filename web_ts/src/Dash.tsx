import "./Dash.css";

function Dash() {
	return (
		<div>
			<title>Kontrollpanel</title>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>

			<div className="dash">
				<header>
					<h1 id="dashHeader">Kontrollpanel - Trossö 2122</h1>
					<nav>
						<a href="/">Hem</a>
						<a href="/dash" id="active">
							Kontrollpanel
						</a>
					</nav>
				</header>
			</div>
		</div>
	);
}

export default Dash;
