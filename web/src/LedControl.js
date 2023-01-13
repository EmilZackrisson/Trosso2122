import { w3cwebsocket as W3CWebSocket } from "websocket";
import React, { useState } from "react";
// import leds from "./Leds";

const client = new W3CWebSocket("ws://127.0.0.1:8000", "echo-protocol");

function LedControl() {

}

export default LedControl;