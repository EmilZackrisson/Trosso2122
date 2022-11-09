import { w3cwebsocket as W3CWebSocket } from "websocket";
import React, { useState, useEffect } from "react";
import "./Dash.css";
import { render } from "react-dom";

const client = new W3CWebSocket("ws://127.0.0.1:8000", "echo-protocol");

// ✅🟥

function Dash() {
	const [serialStatus, setSerialStatus] = useState("Serial: 🟥");
	const [websocketStatus, setWebsocketStatus] = useState("Websocket: 🟥");
	const [allLeds, setAllLeds] = useState([
		{
			id: 13,
			state: false,
			name: "Test",
		},
		{
			id: 12,
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
		console.log("message.data:", message.data);
		if (message.data == "Serial Ansluten!") {
			setSerialStatus("Serial: ✅");
		}
		if (message.data.includes("Inte Ansluten")) {
			setSerialStatus("Serial: 🟥");
		}

		try {
			const jsonMessage = JSON.parse(message.data);

			if (jsonMessage.data.includes("is")) {
				// Arduino Sent LED state

				const data = jsonMessage.data;
				const dataArr = data.split(" ");

				const newState = allLeds;
				const index = allLeds.findIndex((led) => led.id == dataArr[0]);
				newState[index].state = Boolean(parseInt(dataArr[2]));

				setAllLeds(newState);

				console.log(allLeds);
			}
		} catch (error) {}
	};

	function controlLed(led) {
		// console.log(led);
		// console.log(
		// 	JSON.stringify({
		// 		type: "lightControl",
		// 		ledId: led.id,
		// 		toState: !led.state,
		// 	})
		// );

		client.send(
			JSON.stringify({
				type: "lightControl",
				ledId: led.id,
				toState: !led.state,
			})
		);
	}

	useEffect(() => {
		console.log("LED CHANGED", allLeds);
	}, [allLeds]);

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
					// if (led.state == true) var state = "PÅ";
					// else var state = "AV";

					return (
						<div className="led" key={led.id}>
							<p>{led.id}</p>
							<p>{led.name}</p>
							<p>{String(led.state)}</p>

							<button
								className="ledButton"
								onClick={(e) => {
									controlLed(led);
								}}>
								{String(!led.state)}
							</button>
						</div>
					);
				})}
			</section>
		</div>
	);
}

export default Dash;
