import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState, Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import MetaTags from "react-meta-tags";
import { w3cwebsocket as W3CWebSocket } from "websocket";
const axios = require("axios").default;

const client = new W3CWebSocket("ws://127.0.0.1:8000", 'echo-protocol');

function Dash() {
  const apiServer = "http://localhost:3001/";
  // var serialStatus = "Inte ansluten";

  const [serialStatus, setSerialStatus] = useState("Inte ansluten");
  const [websocketStatus, setWebsocketStatus] = useState("Inte ansluten")

  client.onopen = () => {
    console.log("WebSocket Client Connected");
    setWebsocketStatus("Ansluten")
  };

  client.onmessage = (message) => {
    
    if(message.data == "Serial Ansluten!"){
      setSerialStatus("Serial Ansluten!")
    }
    try{
      const jsonData = JSON.parse(message.data)
      if(jsonData.type == "Arduino Data"){
        const arduinoData = jsonData.data;
        // console.log("Arduino DATA: ", arduinoData)
        var arduinoDataArray = arduinoData.split(" ");

        if(arduinoDataArray[1] == "is"){
          console.log("Arduino DATA: ", arduinoData)


          // Change led state in useState array
          const newState = [...leds];
          const index = leds.findIndex(x => x.id === arduinoDataArray[0]);
          newState[index].state = arduinoDataArray[2];
          // console.log("New State: ",newState)
          setLeds(newState);


        }

      }
      
    }
    catch{
      console.log(message.data);
    }
  };

  client.onclose = function () {
    console.log("echo-protocol Client Closed");
    setWebsocketStatus("Inte ansluten")
  };

  client.onerror = function() {
    console.log('Connection Error');
};

  const [leds, setLeds] = useState([
    {
      id: "builtIn",
      name: "Inbyggd LED",
      state: "off",
    },
    {
      id: "test1",
      name: "Test LED 1",
      state: "off",
    },
  ]);



  function testWebsocket(message) {
    console.log("TEST WEBSOCKET CLICKED");
    client.send(
      JSON.stringify({
        message: message,
        type: "message",
      })
    );
  }

  function controlLed(whatLed, onOrOff) {
    client.send(
      JSON.stringify({
        ledId: whatLed.id,
        toState: onOrOff,
        type: "lightControl",
      })
    );

    // axios
    //   .post(apiServer + onOrOff, {
    //     ledId: whatLed,
    //   })
    //   .then(function (response) {
    //     console.log(response.data);
    //     console.log("LEDs status: ", leds);
    //     var tempArray = leds;
    //     const index = tempArray.find((id) => id.id == whatLed);
    //     console.log("tempArray index id", index);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  return (
    <>
      <MetaTags>
        <title>Kontrollpanel - Trossö 2122</title>
        <meta name="description" content="Styr en modell av Trossö" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </MetaTags>

      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Trossö 2122
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link " aria-current="page" href="/">
                  Hem
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/dash">
                  Kontrollpanel
                </a>
              </li>
              {/* <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li> */}
              {/* <li className="nav-item">
                  <a className="nav-link disabled">Disabled</a>
                </li> */}
            </ul>
          </div>
        </div>
        <p>{serialStatus}</p>
        <p>{websocketStatus}</p>
      </nav>

      <div className="container-fluid d-flex flex-column text-center">
        <h1 className="">Kontrollpanel</h1>
        <h5>Härifrån kan du styra hela Trossö</h5>

        <div className="border p-3 container-sm rounded">
          
      
          <button
            onClick={(e) => testWebsocket("HEJ FRÅN WEBSOCKET")}
            className={"btn btn-primary"}
          >
            Testa WebSocket
          </button>
        </div>

        <div>
          {leds.map((led) => {
            const name = led.name;
            const id = led.id;
            const state = led.state;


            return (
              <>
                <div className="border p-3 container-sm rounded">
                  <p>{led.name} - {state}</p>
                  <div className="d-flex justify-content-center gap-5">
                    <button
                      onClick={(e) => controlLed({ id }, "on")}
                      className={"btn btn-primary"}
                    >
                      Tänd
                    </button>
                    <button
                      onClick={(e) => controlLed({ id }, "off")}
                      className={"btn btn-primary"}
                    >
                      Släck
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa"
          crossOrigin="anonymous"
        ></script>
      </div>
    </>
  );
}

export default Dash;
