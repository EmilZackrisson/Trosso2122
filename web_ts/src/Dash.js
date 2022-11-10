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
			id: 13,
			state: false,
			name: "Built In",
		},
		{
			id: 2,
			state: false,
			name: "Grön",
		},
		{
			id: 3,
			state: false,
			name: "Orange",
		},
		{
			id: 4,
			state: false,
			name: "Test 4",
		},
		{
			id: 5,
			state: false,
			name: "Test 5",
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
		if (message.data === "Serial Ansluten!") {
			setSerialStatus("Serial: ✅");
			return;
		}
		if (message.data.includes("Inte Ansluten")) {
			setSerialStatus("Serial: 🟥");
			return;
		}

		try {
			const jsonMessage = JSON.parse(message.data);

			if (jsonMessage.data.includes("is")) {
				// Arduino Sent LED state

				const data = jsonMessage.data;
				const dataArr = data.split(" ");

				let newState = allLeds;
				const index = allLeds.findIndex((led) => led.id === Number(dataArr[0]));
				// console.log(dataArr);
				if(dataArr[2] === "1"){
					var boolState = true;
				}
				else if(dataArr[2] === "0"){
					var boolState = false;
				}
				else{
					console.log("error with new state", dataArr)
				}
				newState[index].state = boolState;

				setAllLeds(newState);

				console.log(allLeds);
			}
		} catch (error) {
			console.log(error)
		}
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
		<div className="Dash">
			<header className="dash-header">
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
				<nav className="dash-nav">
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

					var classes = "led "

					if(led.state){ 
						var state = "PÅ"
						var toState = "SLÅ AV"
						classes = classes + "ledOn"
					}
					else{
						var state = "AV"
						var toState = "SLÅ PÅ"
					}

					return (
						<div className={classes} key={led.id}>
							<p>Namn: {led.name}</p>
							<p>Tillstånd: {state}</p>
							<p>Pin: {led.id}</p>
							

							<button
								className="ledButton"
								onClick={(e) => {
									controlLed(led);
								}}>
								{toState}
							</button>
						</div>
					);
				})}
			</section>
		</div>
	);
}

export default Dash;
