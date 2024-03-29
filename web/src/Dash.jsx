import React, { useState } from "react";
import leds from "./Leds";
import { useEffect } from "react";
import LedCard from "./components/LedCard";

function Dash() {
  const [serialStatus, setSerialStatus] = useState("Serial: 🔴");
  const [allLed, setAllLeds] = useState([]);

  // Serial
  const filters = [{ usbVendorId: 6790, usbProductId: 29987 }];
  var lineBuffer = "";

  useEffect(() => {
    console.log(leds);
    setAllLeds([...leds]);

    if ("serial" in navigator) {
      console.log("Serial is supported");
    }
  }, []);

  function controlLed(led) {
    console.log(led);
    let tempArray = [...allLed];
    let index = tempArray.findIndex(
      (ledFromArray) => ledFromArray.id === led.id
    );
    tempArray[index].state = !tempArray[index].state;
    setAllLeds([...tempArray]);
  }

  async function serial() {
    const port = await navigator.serial.requestPort({ filters });
    await port.open({ baudRate: 115200 });
    setSerialStatus("Serial: 🟢");
    console.log("Serial connected");

    const reader = port.readable.getReader();

    let value = "";

    window.addEventListener("click", (event) => {
      console.log(event);
      const buttonText = event.target.innerText;
      if (buttonText.includes("SLÅ AV")) {
        value = "set," + event.target.id + ",1";
      } else if (buttonText.includes("SLÅ PÅ")) {
        value = "set," + event.target.id + ",0";
      } else {
        console.log("Could not to state from button text");
        return;
      }

      console.log(value);
      if (port && port.writable) {
        // Convert the string to an ArrayBuffer.
        var enc = new TextEncoder();

        const bytes = new Uint8Array(enc.encode(value));

        const writer = port.writable.getWriter();

        writer.write(bytes);
        writer.releaseLock();
      }
    });

    // Listen to data coming from the serial device.
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        // Allow the serial port to be closed later.
        reader.releaseLock();
        break;
      }
      // value is a Uint8Array.
      if (value.length === 1) {
        lineBuffer += String.fromCharCode(value[0]);
      } else {
        lineBuffer += new TextDecoder().decode(value);
        let text = lineBuffer;
        lineBuffer = "";
        console.log("Uint8Array: ", value);
        console.log("TextDecoder: ", text);
      }
    }
  }

  return (
    <main>
      <div className="Dash text-white mb-5">
        <section className="dash-header grid p-24 text-center bg-secondary text-white justify-center">
          <h1 className="text-4xl">Kontrollpanel</h1>
          <p>Här kan du styra hela Trossö</p>
          <button onClick={serial} className="btn btn-primary serial-btn-dash">
            Anslut serial
          </button>
          <p>{serialStatus}</p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {allLed.map((led) => {
            return <LedCard key={led.id} led={led} controlLed={controlLed} />;
          })}
        </section>
      </div>
    </main>
  );
}

export default Dash;
