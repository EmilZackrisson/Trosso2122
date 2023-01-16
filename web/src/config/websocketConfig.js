import { w3cwebsocket as W3CWebSocket } from "websocket";
import Config from "./Config";
const client = new W3CWebSocket(
    "ws://" + Config.serverIp + ":8000",
    "echo-protocol"
);

export default client;