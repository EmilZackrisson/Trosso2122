import { w3cwebsocket as W3CWebSocket } from "websocket";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./Dash.css";

const client = new W3CWebSocket("ws://127.0.0.1:8000", "echo-protocol");

// ✅🟥

function Dash() {
	const [serialStatus, setSerialStatus] = useState("Serial: 🟥");
	const [websocketStatus, setWebsocketStatus] = useState("Websocket: 🟥");
	const [allLed, setAllLeds] = useState([]);

	client.onopen = () => {
		// console.log("WebSocket Client Connected");
		setWebsocketStatus("Websocket: ✅");
	};
	client.onclose = function () {
		console.log("echo-protocol Client Closed");
		setWebsocketStatus("Websocket: 🟥");
		setSerialStatus("Serial: 🟥");
	};
	client.onerror = function () {
		console.log("Connection Error");
		setWebsocketStatus("Websocket: 🟥 Error");
		setSerialStatus("Serial: 🟥");
	};
	client.onmessage = (message) => {
		// console.log("message.data:", message.data);
		if (message.data.includes("Websocket is up and running")) {
			setWebsocketStatus("Websocket: ✅");
		}
		if (message.data.includes("Serial Ansluten!")) {
			setSerialStatus("Serial: ✅");
			return;
		} else if (message.data.includes("Serial ej ansluten")) {
			setSerialStatus("Serial: 🟥");
			return;
		}
		if (message.data.includes("Server")) {
			try {
				const serverJson = JSON.parse(message.data);
				serverJson.splice(0, 1);
				setAllLeds([...serverJson]);
			} catch (error) {
				console.log(error);
			}
			// console.log("allLedTest", allLed);
		}
	};

	function controlLed(led) {
		client.send(
			JSON.stringify({
				type: "lightControl",
				ledId: led.id,
				toState: !led.state,
			})
		);
	}

	function checkStatus() {
		// client.send(JSON.stringify({ type: "checkStatus" }));
		// console.log(client.readyState);
		if (client.readyState !== W3CWebSocket.OPEN) {
			console.log("CHECK STATUS", websocketStatus);
			setSerialStatus("Serial: 🟥");
			setAllLeds([]);
			setInterval(function () {
				// refresh page
				window.location.reload();
			}, 5000);
		}
	}
	setInterval(checkStatus, 5000);

	var emptyListMessageTitle;
	var emptyListMessage;
	var emptylistClass;

	if (allLed.length === 0) {
		emptyListMessageTitle = "Anslut till servern";
		emptyListMessage = "Listan med lampor är tom";
		emptylistClass = "empty-list";
	}
	if (serialStatus.includes("🟥")) {
		emptyListMessageTitle = "Anslut servern till Arduino";
		emptyListMessage = "Serial inte ansluten";
	}
	if (websocketStatus.includes("🟥")) {
		emptyListMessageTitle = "Anslut till servern";
		emptyListMessage = "Inte ansluten till servern med Websocket";
		emptylistClass = "empty-list";
	} else {
		emptylistClass = "not-visible";
	}

	return (
		<div className="Dash">
			<header className="dash-header">
				<h2>Trossö 2122</h2>
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
				<div className={emptylistClass}>
					<h1>{emptyListMessageTitle}</h1>
					<p>{emptyListMessage}</p>
				</div>

				{allLed.map((led) => {
					var classes = " led ";
					var disabled = false;
					var state;
					var toState;

					if (led.state) {
						state = "PÅ";
						toState = "SLÅ AV";
						classes = classes + "ledOn";
					} else {
						state = "AV";
						toState = "SLÅ PÅ";
					}
					if (serialStatus.includes("🟥")) {
						disabled = true;
					} else if (led.disabled === true) {
						disabled = true;
					}

					return (
						<div className={classes} key={led.id}>
							<p>Namn: {led.name}</p>
							<p>Tillstånd: {state}</p>
							<p>Pin: {led.id}</p>
							<p>{led.info}</p>

							<button
								className="ledButton"
								onClick={(e) => {
									if (!led.disabled) {
										controlLed(led);
									}
								}}
								disabled={disabled}>
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
