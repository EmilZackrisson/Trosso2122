import { w3cwebsocket as W3CWebSocket } from "websocket";
import React, { useState } from "react";
import "./Dash.css";

const client = new W3CWebSocket("ws://127.0.0.1:8000", "echo-protocol");

// ✅🟥

function Dash() {
	const [serialStatus, setSerialStatus] = useState("Serial: 🟥");
	const [websocketStatus, setWebsocketStatus] = useState("Websocket: 🟥");

	client.onopen = () => {
		console.log("WebSocket Client Connected");
		setWebsocketStatus("Websocket: ✅");
	};
	client.onclose = function () {
		console.log("echo-protocol Client Closed");
		setWebsocketStatus("Websocket: 🟥");
	};
	client.onerror = function () {
		console.log("Connection Error");
		setWebsocketStatus("Websocket: 🟥 Error");
	};

	return (
		<div className="div">
			<header>
				<h2>Kontrollpanel</h2>
				<section className="connectivityStatus">
					<p onClick={(e) => client.send({ type: "getAllLights" })}>
						{serialStatus}
					</p>

					<p>{websocketStatus}</p>
				</section>
				<nav>
					<a href="/">Hem</a>
					<a href="/Dash" id="navSelected">
						Kontrollpanel
					</a>
				</nav>
			</header>

			<section className="bigSection">
				<h1>Kontrollpanel</h1>
				<p>Här kan du styra hela Trossö</p>
			</section>
		</div>
	);
}

export default Dash;
