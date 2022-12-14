const { SerialPort } = require("serialport");
const comPort = new SerialPort({ path: "COM5", baudRate: 115200 });
const { ReadlineParser } = require("@serialport/parser-readline"); // Library for decoding data from serial
const bodyParser = require("body-parser");
const cors = require("cors");
var WebSocketServer = require("websocket").server;
const http = require("http");
const { connection } = require("websocket");
const { env } = require("process");

require("dotenv").config();

const webSocketsServerPort = 8000;

var server = http.createServer(function (request, response) {
	console.log(new Date() + " Received request for " + request.url);
	response.writeHead(404);
	response.end();
});
server.listen(webSocketsServerPort, function () {
	console.log(new Date() + " Server is listening on port 8080");
});

if (process.env.DEMO === "true") {
	console.log(
		"%cDEMO MODE",
		"color: red; font-size: 20px; font-weight: bold;"
	);
	var serialStatus = "Serial ansluten!";
} else {
	var serialStatus = "Serial ej ansluten";
}

wsServer = new WebSocketServer({
	httpServer: server,
	// You should not use autoAcceptConnections for production
	// applications, as it defeats all standard cross-origin protection
	// facilities built into the protocol and the browser.  You should
	// *always* verify the connection's origin and decide whether or not
	// to accept it.
	autoAcceptConnections: false,
});

function originIsAllowed(origin) {
	return true;
}

var ledStates;

try {
	ledStates = require("./leds.json");
} catch (err) {
	console.log("LOAD JSON FILE ERR", err);
}

wsServer.on("request", function (request) {
	if (!originIsAllowed(request.origin)) {
		// Make sure we only accept requests from an allowed origin
		request.reject();
		console.log(
			new Date() +
				" Connection from origin " +
				request.origin +
				" rejected."
		);
		return;
	}

	var connection = request.accept("echo-protocol", request.origin);
	function sendStatus() {
		let status = {
			serial: serialStatus,
			websocket: "Websocket is up and running",
		};
		connection.sendUTF(JSON.stringify(status));
	}
	sendStatus();
	connection.sendUTF(JSON.stringify(ledStates));

	console.log(new Date() + " Connection accepted.");

	connection.on("message", function (message) {
		// console.log("message", message);
		if (message.type === "utf8") {
			console.log("Received Websocket Message: " + message.utf8Data);

			try {
				const jsonMessage = JSON.parse(message.utf8Data);
				console.log("JSON: ", jsonMessage);

				if (jsonMessage.type === "lightControl" || jsonMessage.type === "zoneLightControl") {
					if (process.env.DEMO === "false") {
						if(jsonMessage.type === "lightControl"){
							changeLed(jsonMessage.ledId, jsonMessage.toState);
						}
						else if(jsonMessage.type === "zoneLightControl"){
							changeZoneLed(jsonMessage.ledId, jsonMessage.toState);
						}
						
						
					} else {
						changeDummyLed(jsonMessage.ledId, jsonMessage.toState);
					}
				}
				if (jsonMessage.type === "getAllLights") {
					// connection.sendUTF("du fr??gade om alla lampor");

					// Skicka korrekt data
					connection.sendUTF(JSON.stringify(ledStates));
				}
				if (jsonMessage.type === "checkSerial") {
					sendStatus();
				}
				if (jsonMessage.type === "checkStatus") {
					sendStatus();
				}
			} catch {
				connection.sendUTF("Error with JSON.parse");
			}

			// connection.sendUTF(message.utf8Data);
		} else if (message.type === "binary") {
			console.log(
				"Received Binary Message of " +
					message.binaryData.length +
					" bytes"
			);
			connection.sendBytes(message.binaryData);
		}
	});

	parser.on("data", function (data) {
		// console.log("From Arduino: ", data);
		let arduinoData = {
			type: "Arduino Data",
			data: data,
		};
		arduinoData = JSON.stringify(arduinoData);
		connection.sendUTF(arduinoData);
		if (data == "Enter data:") {
			serialStatus = "Serial Ansluten!";
			console.log("Serial Ansluten!");
			sendStatus();
		}
		if (data.includes("is")) {
			// console.log("contains is");
			stateFromArduino = data.split(" ");
			const index = ledStates.findIndex(
				(led) => led.id === Number(stateFromArduino[0])
			);
			const newState = Boolean(Number(stateFromArduino[2]));

			ledStates[index].state = newState;
			console.log(ledStates);
			connection.sendUTF(JSON.stringify(ledStates));
		}
	});

	connection.on("close", function (reasonCode, description) {
		console.log(
			new Date() + " Peer " + connection.remoteAddress + " disconnected."
		);
	});

	function send(data) {
		connection.sendUTF(data);
		console.log("Sent to client: ", data);
	}
	function changeDummyLed(ledId, state) {
		console.log("Demo mode, not sending serial");

		index = ledStates.findIndex((led) => led.id === Number(ledId));
		console.log(index);
		const newState = Boolean(Number(state));
		ledStates[index].state = newState;
		send(JSON.stringify(ledStates));

		return ledId + " " + state;
	}

	sendStatus();
});

// Read and print data
const parser = comPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));
// parser.on('data', console.log)

function changeLed(ledId, state) {

	if (state == true) state = "1";
	if (state == false) state = "0";

	const message = "set," + ledId + "," + state;
	console.log("CHANGE LED: ", message);

	comPort.write(Buffer.from(message), function (err) {
		if (err) {
			console.log("Error on write: ", err.message);
			return err.message;
		}
		console.log("serial sent: ", message);
		return ledId + " " + state;
	});
}

var prevoiusLedId = -1;

function changeZoneLed(ledId, state) {
	if (state == true) state = "1";
	if (state == false) state = "0";

	const message = "set," + ledId + "," + state;

	const resetLastLedPromise = new Promise(resetLastLed);

	console.log("Prevoius LED: ", prevoiusLedId);

	if(prevoiusLedId !== -1){
		resetLastLedPromise.then(function(){
			comPort.write(Buffer.from(message), function (err) {
				if (err) {
					console.log("Error on write: ", err.message);
					return err.message;
				}
				console.log("serial sent: ", message);
				prevoiusLedId = ledId;
				return ledId + " " + state;
			});
		});
	}

	console.log("ZONE CHANGE LED: ", message);

	// comPort.write(Buffer.from(message), function (err) {
	// 	if (err) {
	// 		console.log("Error on write: ", err.message);
	// 		return err.message;
	// 	}
	// 	console.log("serial sent: ", message);
	// 	return ledId + " " + state;
	// });

}

function resetLastLed(){
	const resetPrevious = "set," + prevoiusLedId + "," + "0";
	comPort.write(Buffer.from(resetPrevious), function (err) {
		if (err) {
			console.log("Error on write: ", err.message);
			return err.message;
		}
		console.log("Reset serial sent: ", resetPrevious);
		return prevoiusLedId + " " + 0;
	});
}


// Open errors will be emitted as an error event
comPort.on("error", function (err) {
	if (process.env.DEMO === "true") {
		serialStatus = "Serial Ansluten! DEMO MODE";
		return;
	}
	if (err.message.includes("File not found")) {
		serialStatus = "Inte Ansluten: File not found";
		console.log("SerialStatus: ", serialStatus);
	}
	console.log("Error: ", err.message);
});
