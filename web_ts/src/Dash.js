import { w3cwebsocket as W3CWebSocket } from "websocket";
import React, { useState, useEffect } from "react";
import "./Dash.css";

const client = new W3CWebSocket("ws://127.0.0.1:8000", "echo-protocol");

// ✅🟥

function Dash() {
	const [serialStatus, setSerialStatus] = useState("Serial: 🟥");
	const [websocketStatus, setWebsocketStatus] = useState("Websocket: 🟥");
	const [allLeds, setAllLeds] = useState([
		{
			id: "test",
			state: false,
			name: "Test",
		},
		{
			id: "test2",
			state: true,
			name: "Test 2",
		},
	]);

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
	client.onmessage = (message) => {
		console.log(message.data);
		if (message.data == "Serial Ansluten!") {
			setSerialStatus("Serial Ansluten!");
		}
		if (message.data.includes("Inte Ansluten")) {
			setSerialStatus("Serial: 🟥");
		}
	};

	return (
		<div className="div">
			<header>
				<h2>Kontrollpanel</h2>
				<section className="connectivityStatus">
					<p
						onClick={(e) =>
							client.send(JSON.stringify({ type: "checkSerial" }))
						}>
						{serialStatus}
					</p>

					<p
						onClick={(e) =>
							client.send(
								JSON.stringify({ type: "getAllLights" })
							)
						}>
						{websocketStatus}
					</p>
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
			<section className="ledList">
				{allLeds.map((led) => {
					return (
						<div className="led">
							<p>{led.id}</p>
							<p>{led.name}</p>
							<p>{String(led.state)}</p>
						</div>
					);
				})}
			</section>
		</div>
	);
}

export default Dash;
