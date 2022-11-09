const { SerialPort } = require("serialport");
const comPort = new SerialPort({ path: "COM9", baudRate: 9600 });
const { ReadlineParser } = require("@serialport/parser-readline"); // Library for decoding data from serial
const bodyParser = require("body-parser");
const cors = require("cors");
var WebSocketServer = require("websocket").server;
const http = require("http");

// var five = require("johnny-five"),
//   board = new five.Board({
//     port: "COM5",
//   });

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
const webSocketsServerPort = 8000;

var server = http.createServer(function (request, response) {
	console.log(new Date() + " Received request for " + request.url);
	response.writeHead(404);
	response.end();
});
server.listen(webSocketsServerPort, function () {
	console.log(new Date() + " Server is listening on port 8080");
});

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
	console.log(new Date() + " Connection accepted.");

	connection.on("message", function (message) {
		if (message.type === "utf8") {
			console.log("Received Websocket Message: " + message.utf8Data);

			try {
				const jsonMessage = JSON.parse(message.utf8Data);
				console.log("JSON: ", jsonMessage);

				if (jsonMessage.type === "lightControl") {
					changeLed(jsonMessage.ledId, jsonMessage.toState);
				}
				if (jsonMessage.type === "getAllLights") {
					connection.sendUTF("du frågade om alla lampor");
				}
				if (jsonMessage.type === "checkSerial") {
					connection.sendUTF(serialStatus);
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

	connection.sendUTF(serialStatus);

	parser.on("data", function (data) {
		console.log("From Arduino: ", data);
		let arduinoData = {
			type: "Arduino Data",
			data: data,
		};
		arduinoData = JSON.stringify(arduinoData);
		connection.sendUTF(arduinoData);
		if (data == "Enter data:") {
			serialStatus = "Serial Ansluten!";
			connection.sendUTF(serialStatus);
		}
	});

	connection.on("close", function (reasonCode, description) {
		console.log(
			new Date() + " Peer " + connection.remoteAddress + " disconnected."
		);
	});
});

var debug = true; // Doesn't send serial

var serialStatus = "Inte ansluten";

var leds = {
	builtIn: false,
};

// Read and print data
const parser = comPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));
// parser.on('data', console.log)

function changeLed(ledId, state) {
	if (state == true) state = "1";
	if (state == false) state = "0";

	const message = "set," + ledId + "," + state;

	comPort.write(Buffer.from(message), function (err) {
		if (err) {
			console.log("Error on write: ", err.message);
			return err.message;
		}
		console.log("serial sent: ", message);
		return ledId + " " + state;
	});
}

// Open errors will be emitted as an error event
comPort.on("error", function (err) {
	console.log("Error: ", err.message);
	if (err.message.includes("File not found")) {
		serialStatus = "Inte Ansluten: File not found";
		console.log("SerialStatus: ", serialStatus);
	}
});

// app.get("/serialStatus", (req, res) => {
//   res.send(serialStatus);
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
