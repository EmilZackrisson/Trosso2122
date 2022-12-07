import { w3cwebsocket as W3CWebSocket } from "websocket";
import React, { useState } from "react";
// import leds from "./Leds";

const client = new W3CWebSocket("ws://127.0.0.1:8000", "echo-protocol");

function LedControl() {
  const [allLed, setAllLeds] = useState([]);

  client.onopen = () => {
    console.log("WebSocket Client Connected");
    // setWebsocketStatus("Websocket: ✅");
  };

  client.onclose = function() {
    console.log("echo-protocol Client Closed");
  };

  client.onerror = function() {
    console.log("Connection Error");
  };

  client.onmessage = (message) => {
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
}

export default LedControl;