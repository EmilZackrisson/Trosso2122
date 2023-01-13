import client from "./config/websocketConfig";
import React, { useState } from "react";
import Config from "./Config";
import leds from "./Leds";
import { useEffect } from "react";
import LedCard from "./components/LedCard";
import Footer from "./components/Footer";

function Dash() {
  const [serialStatus, setSerialStatus] = useState("Serial: 🟥");
  const [websocketStatus, setWebsocketStatus] = useState("Websocket: 🟥");
  const [allLed, setAllLeds] = useState([]);

  useEffect(() => {
    if (Config.demo) {
      // leds.splice(0,1);
      console.log(leds);
      setAllLeds([...leds]);

      setSerialStatus("Serial: 🟨(DEMO)");
      setWebsocketStatus("Websocket: 🟨(DEMO)");
    }
  }, []);

  if (!Config.demo) {
    console.log("Running in production mode");
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
      console.log("message.data:", message.data);
      if (message.data.includes("Websocket is up and running")) {
        console.log("Websocket is up and running");
        setWebsocketStatus("Websocket: ✅");
      }
      if (message.data.includes('serial":"Serial Ansluten!"')) {
        console.log("Serial ansluten!");
        setSerialStatus("Serial: ✅");
        return;
      } else if (message.data.includes("Serial ej ansluten")) {
        console.log("Serial ej ansluten");
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
    function checkStatus() {
      // client.send(JSON.stringify({ type: "checkStatus" }));
      // console.log(client.readyState);
      if (client.readyState !== client.W3CWebSocket.OPEN) {
        console.log("CHECK STATUS", websocketStatus);
        setSerialStatus("Serial: 🟥");
        setAllLeds([]);
        setInterval(function () {
          // refresh page
          window.location.reload();
        }, 5000);
      }
    }
    // setInterval(checkStatus, 5000);
  }

  function controlLed(led) {
    console.log(led);
    if (Config.demo) {
      let tempArray = [...allLed];
      let index = tempArray.findIndex(
        (ledFromArray) => ledFromArray.id === led.id
      );
      tempArray[index].state = !tempArray[index].state;
      setAllLeds([...tempArray]);
    } else {
      client.send(
        JSON.stringify({
          type: "lightControl",
          ledId: led.id,
          toState: !led.state,
        })
      );
    }
  }

  var emptyListMessageTitle;
  var emptyListMessage;
  var emptylistClass;

  if (Config.demo) {
    emptylistClass = "hidden";
  } else {
    if (allLed.length === 0) {
      emptyListMessageTitle = "Anslut till servern";
      emptyListMessage = "Listan med lampor är tom";
      emptylistClass = "hidden";
    }
    if (serialStatus.includes("🟥")) {
      emptyListMessageTitle = "Anslut servern till Arduino";
      emptyListMessage = "Serial inte ansluten";
    }
    if (websocketStatus.includes("🟥")) {
      emptyListMessageTitle = "Anslut till servern";
      emptyListMessage = "Inte ansluten till servern med Websocket";
      emptylistClass = "hidden";
    } else {
      emptylistClass = "hidden";
    }
  }

  return (
    <>
      <div className="Dash text-white">
        <section className="grid h-50 p-24 text-center bg-accent text-white">
          <h1 className="text-4xl">Kontrollpanel</h1>
          <p>Här kan du styra hela Trossö</p>
        </section>
        <section className="grid grid-flow-row md:grid-cols-3 gap-3 p-5 ">
          <div className={emptylistClass}>
            <h1>{emptyListMessageTitle}</h1>
            <p>{emptyListMessage}</p>
          </div>

          {allLed.map((led) => {
            return (
              <LedCard
                key={led.id}
                led={led}
                serialStatus={serialStatus}
                Config={Config}
                controlLed={controlLed}
              />
            );
          })}
        </section>
      </div>
      <Footer serialStatus={serialStatus} websocketStatus={websocketStatus} />
    </>
  );
}

export default Dash;
