import { w3cwebsocket as W3CWebSocket } from "websocket";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dash.css";

const client = new W3CWebSocket("ws://127.0.0.1:8000", "echo-protocol");

// ✅🟥

function Dash() {
	const [serialStatus, setSerialStatus] = useState("Serial: 🟥");
	const [websocketStatus, setWebsocketStatus] = useState("Websocket: 🟥");
	const [allLed, setAllLeds] = useState([]);

	const navigate = useNavigate();

	var cookie = document.cookie;
	// if (!cookie.includes("loggedIn=true;")) {
	// 	navigate("/Login");
	// }

	client.onopen = () => {
		console.log("WebSocket Client Connected");
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
		console.log("message.data:", message.data);
		if (message.data === "Serial Ansluten!") {
			setSerialStatus("Serial: ✅");
			return;
		}
		if (message.data.includes("Inte Ansluten")) {
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
			console.log("allLedTest", allLed);
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

	if (allLed.length === 0) {
		var emptyListMessageTitle = "Anslut till servern";
		var emptyListMessage = "Listan med lampor är tom";
		var emptylistClass = "empty-list";
	}
	if (serialStatus.includes("🟥")) {
		var emptyListMessageTitle = "Anslut servern till Arduino";
		var emptyListMessage = "Serial inte ansluten";
	}
	if (websocketStatus.includes("🟥")) {
		var emptyListMessageTitle = "Anslut till servern";
		var emptyListMessage = "Inte ansluten till servern med Websocket";
	} else {
		var emptylistClass = "not-visible";
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

					if (led.state) {
						var state = "PÅ";
						var toState = "SLÅ AV";
						classes = classes + "ledOn";
					} else {
						var state = "AV";
						var toState = "SLÅ PÅ";
					}
					if(serialStatus.includes("🟥")){
						led.disabled = true;
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
									controlLed(led);
								}}
								disabled={led.disabled}>
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
