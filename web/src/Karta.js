import React, { useState } from "react";
import { Link } from "react-router-dom";
import leds from "./Leds";
import sadCat from "./sadCat.jpg";

function Karta() {
     const [serialStatus, setSerialStatus] = useState("Serial: 🔴");
     const [allLed, setAllLeds] = useState([]);
     const [selArea, setSelArea] = useState({
          name: "Välj ett område",
          info: "Klicka på ett område på kartan för att se mer information",
     });

     // Serial
     const filters = [{ usbVendorId: 6790, usbProductId: 29987 }];
     var lineBuffer = "";

     function findZoneId(zone) {
          console.log("findZoneId", zone);
          let zoneId = leds.filter((led) => led.name === zone)[0].id;
          console.log("zoneid", zoneId);
          return zoneId;
     }

     async function serial() {
          const port = await navigator.serial.requestPort({ filters });
          await port.open({ baudRate: 115200 });
          setSerialStatus("Serial: 🟢");
          console.log("Serial connected");
          const serialButton = document.getElementById("serialBtn");
          serialButton.classList.add("hidden");

          const reader = port.readable.getReader();

          let value = "";

          window.addEventListener("click", (event) => {
               console.log(event);
               const zoneName = event.target.parentElement.id;
               const zoneId = findZoneId(zoneName);
               const zoneClasses = event.target.parentElement.className.animVal;

               if (zoneClasses.includes("clicked")) {
                    value = "setZone," + zoneId + ",1";
               } else {
                    value = "setZone," + zoneId + ",0";
               }

               if (zoneId === "") {
                    value = "setZone,13,0";
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

     function getZoneInfo(zoneName) {
          let zone = leds.filter((led) => led.name === zoneName)[0];
          console.log("🚀 ~ file: Karta.js:88 ~ getZoneInfo ~ zone:", zone);

          return zone;
     }

     function zoneClick(data) {
          let clickedArea = document.getElementById(
               data.target.parentElement.id
          );
          console.log("Klickad area:", data.target.parentElement.id);

          // Clicked outside of map
          if (!clickedArea) {
               console.log("clickedArea is null");
               Array.from(document.querySelectorAll(".clicked")).forEach((el) =>
                    el.classList.remove("clicked")
               );

               setSelArea({
                    name: "Välj ett område",
                    info: "Klicka på ett område på kartan för att se mer information",
               });

               return;
          }

          // If clicked area is already clicked, remove clicked class and hide bubble
          if (clickedArea.classList.contains("clicked")) {
               clickedArea.classList.remove("clicked");
               return;
          }

          // If clicked area is not clicked, remove clicked class from all areas and add clicked class to clicked area
          if (clickedArea.id !== "root") {
               Array.from(document.querySelectorAll(".clicked")).forEach(
                    function (el) {
                         el.classList.remove("clicked");
                    }
               );

               clickedArea.classList.add("clicked");
               const zoneInfo = getZoneInfo(clickedArea.id);
               setSelArea(zoneInfo);
          } else if (clickedArea.id === "root") {
               Array.from(document.querySelectorAll(".clicked")).forEach(
                    function (el) {
                         el.classList.remove("clicked");
                    }
               );
          }
     }

     // If mobile, show sad cat
     if (/Android|iPhone/i.test(navigator.userAgent)) {
          return (
               <div className="karta justify-center">
                    <img src={sadCat} alt="Ledsen katt" />
                    <h1 className="text-white text-2xl">
                         Kartan fungerar tyvärr inte på mobil. Använd en dator
                         istället.
                    </h1>
               </div>
          );
     } else {
          return (
               <div className="karta-page">
                    <aside className="karta-aside">
                         <h1 className="text-xl font-semibold">
                              {selArea.name}
                         </h1>
                         <p>{selArea.info}</p>
                         {selArea.picture && (
                              <img
                                   src={selArea.picture}
                                   alt={selArea.name}
                                   className="w-10/12"
                              />
                         )}
                         <div className="karta-aside-buttons flex flex-col">
                              {selArea.hasPage && (
                                   <Link
                                        to={"/omrade/" + selArea.name}
                                        className="btn-primary mt-5"
                                   >
                                        Läs mer
                                   </Link>
                              )}

                              <button
                                   className="btn-primary mt-5"
                                   id="serialBtn"
                                   onClick={serial}
                              >
                                   Anslut seriell
                              </button>
                         </div>
                    </aside>
                    <section className="karta-section">
                         <svg
                              id="Lager_1"
                              data-name="Lager 1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 768.04 855.74"
                              className="kartaSvg"
                              height="90%"
                              preserveAspectRatio="xMidYMax slice"
                              onClick={(data) => zoneClick(data)}
                         >
                              <g id="Lokstallarna">
                                   <path d="m397.92,69.88c13.98-8.89,58.95-93.21,87.09-63.6-79.76,48.54-26.6,206.93-64.19,182.5" />
                              </g>
                              <g
                                   id="Bostäder_och_Butiker"
                                   data-name="Bostäder och Butiker"
                              >
                                   <path d="m495.72,182.78l-4.9,114.5s40.4,9.5,40.4,9.5c-.77-20.07,2.47-74.12,2.6-94.5,2.72-34.01-4.81-31.83-38.1-29.5Z" />
                              </g>
                              <g id="Skeppsbrokajen">
                                   <path d="m689.22,281.38c-37.53-80.11-65.11-159.48-144.4-143.29-7.53,7.39-48.03-27-13.4-18.71,37.02-9.49,31.09-7.12,66.9,1.61,2.75,1.66,36.45-2.45,34,1.49,66.02,89.21,84.1,140.93,134.01,231.1,9.03,20.12-20.15,54.92-28.01,65,5.24-43.55-22.18-88.37-49.1-137.2Z" />
                              </g>
                              <g id="Hotell">
                                   <path d="m543.72,143.08c30.03,2.4,48.19-11.95,48,39.7,13.65-1.39,15.04,41.65,13.6,54.8-88.08,2.67-55.69-41.9-61.6-94.5Z" />
                              </g>
                              <g id="Park">
                                   <path d="m446.62,199.38c61.79-8.74,23.55-81.83,58.2-183,0,0-17-9.1-17-9.1-34.08,11.58-43.37,113.21-39.69,152.31-.01,0-13.61-6.81-7.61,10.59,1.53,10.68-5.54,19.14,6.1,29.2Z" />
                              </g>
                              <g id="Simhall">
                                   <path d="m602.72,273.08c2.02-36.37-10.72-34.13-44.41-35.4-18.3-6.75-17.2,13.12-13.2,23.1,13.6,6.67,45.18,15.1,57.6,12.3Z" />
                              </g>
                              <g
                                   id="Palanderska_gården"
                                   data-name="Palanderska gården"
                              >
                                   <path d="m591.72,153.28c28.83,5.95,86.12,97.26,85.01,110.7-5.16,8.54-34.47-2.36-34.01-1.89,6.8,1.1-28,2.3-27.6.8,5.24-31.6-.97-75.44-23.4-109.6Z" />
                                   <path d="m593.22,153.68c-4.41-3.45-1.22,38.42,15.9,34.8" />
                                   <path d="m602.82,187.48c22.25,15.6,1.28,8.22-.1-5.6,2.8-4.77,31.79,3,24.4,14.1-22.51,6.45-8.86,61.43-15.61,57.3-2.99,0-8.49-55.5-.79-57.5,6.34,1.66,7.6,3.25,8.9,13.8,22.7,29.89,2.19,3.09-23.7-30.4" />
                                   <path d="m614.82,261.38c-8.22-14.7-4.6-33.56-4.6-51.8,7.16-16,12.97-1.12,8.8,19.7" />
                              </g>
                              <g
                                   id="Bostäder_och_Butiker-2"
                                   data-name="Bostäder och Butiker-2"
                              >
                                   <path d="m620.62,409.78l.4,37,97.5,6.8s6.8-31,.4-42" />
                              </g>
                              <g id="Skolor">
                                   <polygon points="543.92 273.68 619.52 297.88 618.72 323.98 542.72 307.68 543.92 273.68" />
                                   <path d="m543.92,273.68s74.1,25.3,74.1,25.3c2.76-3.3,1.22-21.37,3.9-20.2,43.16-1.48,171.2,100.88-3.1,45.1" />
                                   <path d="m713.92,338.28c-24.11-65.75-40.3-62.93-92.1-59.5" />
                                   <polygon points="512.42 529.18 606.82 532.88 608.42 554.78 509.82 551.68 512.42 529.18" />
                                   <path d="m420.72,284.18l-16.2-3.1c8.07-43.75,20.87-22.36,16.2,3.1Z" />
                              </g>
                              <g id="Bostäder">
                                   <path d="m724.92,402.98c-.4,3-103.6-4.2-103.9-6s0-60.8,0-60.8c0,0,103.2,18.5,103.2,18.5,0-.1,3.7,24.8.7,48.3Z" />
                              </g>
                              <g id="Bostäder-2">
                                   <path d="m622.62,602.98c-1.24-70.93-24.16-82.15,68.79-67.3,5.84-3.89,3.47,66.53-29.1,57,0,0-3.7,12.5-8.3,13" />
                              </g>
                              <g
                                   id="Sparre_Lantmäteriet_Kulturområde"
                                   data-name="Sparre Lantmäteriet Kulturområde"
                              >
                                   <path d="m720.42,464.58c-107.75-2.39-101.73-17.19-100.9,59.3,0,0,83.9,4.5,83.9,4.5,0,0,11.3-5.7,12.5-45" />
                              </g>
                              <g
                                   id="Bostäder_och_Butiker-3"
                                   data-name="Bostäder och Butiker-3"
                              >
                                   <path d="m603.22,333.88c26.54,58.2-48.96,37.07-82.4,38-36.09-23.14-33.83-17.77-32.3-62.4" />
                              </g>
                              <g id="Butiker">
                                   <path d="m520.82,384.98c-18.59-21.16-32.47-9.74-48.4-24.99,0,0-39.1,1.59-39.1,1.59,0,0-1,12.5-1,12.5,13.93,56.17-37.82,62.52,78.69,52.4,48.61-1.4,30.9,19.54,60.41,18.1,9.99-20.41-11.74-38.65,32.9-30.7,3.25-38.66-6.18-35.43-83.5-28.9Z" />
                              </g>
                              <g
                                   id="Bostäder_och_butiker"
                                   data-name="Bostäder och butiker"
                              >
                                   <path d="m575.62,446.98l26.1,2.1c-1.27-20.89,15.7-43.47-24.5-33.4" />
                              </g>
                              <g id="Bostäder-3">
                                   <path d="m514.62,518.48h91.8c.38-62.66,5.43-54.26-55.8-55.8" />
                              </g>
                              <g id="Bostäder-4">
                                   <polygon points="504.12 567.78 608.42 571.48 607.82 607.98 503.62 600.08 504.12 567.78" />
                              </g>
                              <g id="Bostäder-5">
                                   <path d="m267.42,553.18l172.1,12.5c32.69,110.08-104.37,54.29-162.21,63.61,0,0-10.99,2.59-7.79-20.91" />
                              </g>
                              <g id="Strandgården">
                                   <path d="m332.52,201.28c-1.25,9.61,47.89,2.51,75.1-.5,1.26-104.18-11.88-215.35-75.1.5Z" />
                              </g>
                              <g id="Möllebacken">
                                   <path d="m377.42,367.88s.1,0,0,0c3.14-.26-2.56-3.28-4.1-2.8,1.42.72,2.89,1.68,4.1,2.8Z" />
                                   <path d="m415.42,223.18c-81.85-32.34-135.39,22.15-62.82,140.2,14.1-13.68,31.68-6.29,39.31,3.21,0,0,3.7-114.21,26.7-116.31,0,0-3.2-27.1-3.2-27.1Z" />
                              </g>
                              <g id="Butiker-2">
                                   <path d="m422.22,460.38c-3.73-63.43,14.48-185.63-19.79-175.2-.01,0-2.61,18.2-8.91,88.1,0,0-18.2-30.8-40.7-4.2,0,0,3.7,10.4,67.8,88.1" />
                              </g>
                              <g id="Stortorget">
                                   <path d="m501.02,515.18c17.06-11.88,36.9-52.98,34.41-69.4,1.97-6.41-66.86-11.05-76.71-9.9-28.48-1.29-28.21,6.85-22.4,33.4,0,0-11,14.1,4.7,25,0,0,6.3,23.5,9.4,22.9s40.1,6.3,50.6-2Z" />
                              </g>
                              <g id="Hoglandspark">
                                   <polygon points="434.22 253.38 479.62 254.98 479.62 345.68 436.32 345.18 434.22 253.38" />
                              </g>
                              <g id="Amiralitetsparken">
                                   <path d="m444.62,642.88c-12.01,7.8,27.54,25.06,30.8,3.1,15.62-43.05,19.57-76.79,23-115.7-16.2-7.3-44.3-2.1-44.3-2.1l-11.1,115.8" />
                              </g>
                              <g id="Museum">
                                   <path d="m339.32,386.38c16.11,4.17,44.31,10.59,8.79,48-6.29,6.8-27.09-17.2-27.09-17.2,0,0,3.7-29.3,18.3-30.8Z" />
                              </g>
                              <g id="Butiker-3">
                                   <path d="m417.02,478.08c68.14,99.9-23.02,65.85-51.6,60.5-18.62-18.84,13.46-87.58-13-101.7,22.12-35.1,17.11-59,52.2,19.8" />
                              </g>
                              <g
                                   id="Bostäder_och_Butiker-4"
                                   data-name="Bostäder och Butiker-4"
                              >
                                   <path d="m275.22,537.58c13.6,6.8,75.1,4.7,77.2-.5-.49-20.74,9.7-80.44-13.1-85.5-5.7-25-123-30.2-123-30.2,0,0-6.8,37.5-2.6,44.3" />
                              </g>
                              <g id="Brinova">
                                   <path d="m149.52,445.38c14.7-5.6,47.4,6.8,47.4,6.8,24-102.2,13-88.6,13-88.6l-52.7-7.8s-11,80.3-8.3,86.5" />
                              </g>
                              <g id="Fisktorget">
                                   <path d="m258.02,374.38c8.3,10.4,27.1,21.9,54.2,17.7,0,0-11.5,16.2-24,15.6-95.9-4-62-9.4-70.4-5.7s-2.6-37.5-2.6-37.5c12.33.74,31.19,5,42.8,9.9Z" />
                              </g>
                              <g id="Varv_och_Marinbas">
                                   <path d="m682.42,628.68c-30.21-1.52-170.41-17.58-190.9-15.1-4.34,2.53-12.23,52.95-34,46.6-23.93-6.1-12.39-15.05-20.6-17.8,0,0-62,1.6-121.5-3.1-5.83,26.22-11.63,84.44,27,83.2,84.97,6.68,217.42,34.14,311.4,9.11.71-8.91-12.01-54.98,22.89-72.51.27-5.32,16.28-27.01,5.71-30.4Zm-374.6,5.3c-73.64,9.86-30.04-60.17-51.1-104.3,6.4-.32-59.51-97.48-103.6-78.79-16.19,11.49-30.37,26.76-52.6,24.59-32.99-.09-59.99-18.25-84.7-36.1-22.06,13.45,28.47,103.66-7.9,88.1-18.05,8.76-3.12,52.37,23.39,53.99,28.11-3.49,36.11,17.68,38.6,43.81,9.31,32.62,24.32-34.44,38-14.7,5.4,24.5,7.9,13.7,7.9,13.7l17.8-65.9c92.73.54,41.8,33.04,48.8,87.5,16.8,5.5,8.9,19.5,26.7,20,16.1.4,15.3,5.9,14.8,7.4-.79,10.68-5.98,149.55,5,173,9.9,20.3,33.9,2.4,40.2-2.8,8.19-1.63,14.56,3.51,32.3-12.2,35.76-26.77-11.7-38.81,24-73.4,1.84-3.09,113.46-5.6,116.1-6.7,5.64-.89,4.84-12.6,2.8-16-97.8-77.6-131.9-101.4-136.5-101.2Zm-173.9-73.8l61.5,17.7,2.1-13.5c-3.13,3.82-119.49-34.59-63.6-4.2Z" />
                              </g>
                              <g id="Bröjkholmen">
                                   <path d="m143.92,430.68c-2.27-8.07,8.07-46.75.7-40.4-.46,1.57.56-5.34.1-4.9,4.75,5.08,11.21-24.15,8.9-38.71-12.54-30.68-84.73-41.24-113.14-38.5,5.34,17.63,20.77,57.9-1.25,81.37-6.15,14.85-10.04,35.16-21.57,43.19-1.37,1.38-.31,3.59,1.57,3.61,7.21,2.93,10.69,4.03,15.33,11.2,5.74,6.23,16.71,4.14,20.85,11.28,26.59,17.9,103.94,18,88.51-28.15Z" />
                              </g>
                         </svg>
                    </section>
               </div>
          );
     }
}

export default Karta;
