import React, { useState } from "react";
import client from "./config/websocketConfig";

// import "./Karta.css";
// import "./karta.svg";

function Karta() {
  const [allLed, setAllLeds] = useState([]);

  client.onmessage = (message) => {
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

  function turnOnZone(zone) {
    for (let index = 0; index < allLed.length; index++) {
      const element = allLed[index];
      console.log(index, element);
      if (element.name === zone) {
        client.send(
          JSON.stringify({
            type: "zoneLightControl",
            ledId: element.id,
            toState: true,
          })
        );
      }
    }
  }

  function zoneClick(data) {
    let clickedArea = document.getElementById(data.target.parentElement.id);
    console.log("Klickad area:", data.target.parentElement.id);
    
    if (clickedArea === null) {
      console.log("clickedArea is null");
      Array.from(document.querySelectorAll('.clicked')).forEach((el) => el.classList.remove('clicked'));
      return;
    }
    if (clickedArea.classList.contains("clicked")) {
      clickedArea.classList.remove("clicked");
      return;
    }

    if (clickedArea.id !== "root") {
      Array.from(document.querySelectorAll(".clicked")).forEach(function (el) {
        el.classList.remove("clicked");
      });
      clickedArea.classList.add("clicked");
      // console.log(allLed);
      turnOnZone(clickedArea.id);
      // client.send(JSON.stringify({ zone: clickedArea.id, state: true }));
    } else if (clickedArea.id === "root") {
      Array.from(document.querySelectorAll(".clicked")).forEach(function (el) {
        el.classList.remove("clicked");
      });
    }
  }

  return (
    <div className="karta flex justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="363.98 361.56 766.52 858.67"
        className="kartaSvg"
        onClick={(data) => zoneClick(data)}
      >
        <g id="Lokstallarna">
          <path
            className="cls-5"
            d="M760.3,432.6s61.52-74.56,67.78-70.91-2.61-5.21,19.29,7.3c0,0-46.4,38.06-47.97,91.76-1.56,53.7-1.56,95.94-1.56,95.94l-14.6-5.21"
          />
        </g>
        <g id="Bostäder_och_Butiker" data-name="Bostäder och Butiker">
          <path
            className="cls-3"
            d="M858.08,545.47l-4.91,114.52,40.44,9.45,1.13-71.43s3.4-15.12,1.51-23.06,1.89-12.47-1.51-28.72c0,0-36.66-3.4-36.66-.76Z"
          />
        </g>
        <g id="Hamnen">
          <path
            className="cls-4"
            d="M1051.59,644.11c-20.03-46.87-56.32-113.39-72.57-129.26-16.25-15.87-35.53-10.96-35.53-10.96-4.54-5.29-36.28-3.02-36.28-3.02-1.05,.13-14.22,1.55-22.13-8.13-3.88-4.75-4.7-9.98-4.91-12.47,3.62,1,8.23,1.87,13.61,1.89,12.13,.04,21.43-4.26,26.28-6.99,1.29-.57,3.25-1.24,5.65-1.23,3.29,.02,5.57,1.31,8.13,2.56,0,0,3.2,1.55,11.63,4.48,5.27,1.83,9.36,2.19,15.2,2.7,7.56,.66,15.13,.42,27.97,0,2.95-.1,7.94-.28,8.04,.42,.05,.34-1.05,.77-2,1.09,31.92,40.68,51.41,74.35,63.5,98.27,10.9,21.55,23.58,50.59,40.44,76.35,6.1,9.31,11.14,19.27,17.01,28.72,3.18,5.11,8.98,14.32,13.06,27.78,.75,2.46,1.22,4.38,1.31,4.72,4.44,18.28-22.34,51.83-29.28,60.28,.73-11.39,.54-28.31-4.91-47.62-1.71-6.06-4.53-14.45-19.48-43.65-6.01-11.75-14.3-27.47-24.74-45.92Z"
          />
        </g>
        <g id="Hotell">
          <path
            className="cls-7"
            d="M906.08,505.78s26.46-1.89,40.06,3.78,1.13,15.12,7.94,35.91c0,0,17.01,7.94,13.23,25.7l.38,29.1-43.09-4.16s-17.76-1.51-18.14-21.17c-.38-19.65-.38-69.17-.38-69.17Z"
          />
        </g>
        <g id="Park">
          <path
            className="cls-8"
            d="M808.95,562.1s11.34,2.65,16.25-3.02,12.47-9.45,12.47-9.45c0,0,1.51-7.56,.76-13.23s5.67-8.69,8.69-9.45-3.02-78.61,20.03-147.78l-17.01-9.07s-40.44,36.66-37.04,69.54l-2.65,82.77s-13.61-6.8-7.56,10.58l-.38,17.01s-.38,7.56,6.43,12.09Z"
          />
        </g>
        <g id="Simhall">
          <path
            className="cls-2"
            d="M965.08,635.79c-.2-1.17-.5-3-.94-5.77-.54-3.41-.64-6.53-.84-12.79-.11-3.37-.19-7.71-.14-12.8-9.55-1.24-17.37-1.99-22.88-2.46-5.59-.47-9.28-.68-19.65-1.51-5.73-.46-10.44-.86-13.61-1.13-1.04,4.88-1.4,9.03-1.51,12.09-.23,6.08-.37,9.53,1.89,12.09,1.95,2.21,4.52,2.71,7.56,3.4,12.35,2.82,.98,1.69,18.52,5.29,11.05,2.27,21.43,3.92,30.06,5.1,0,0,.15,.34,.37,.83,.19-.88,.58-1.7,1.18-2.36Z"
          />
        </g>
        <g id="Palanderska_gården" data-name="Palanderska gården">
          <path
            className="cls-2"
            d="M954.08,515.99l1.51,.38c3.3,.54,8.2,1.82,13,5.13,3.07,2.12,5.41,3.73,6.78,6.78,.71,1.58,.83,2.82,2.04,4.52,1.43,2.01,3.32,3.16,4.73,3.82,6.16,7.94,14.61,18.96,24.46,32.28,25.93,35.05,34.28,51.3,32.5,57.83-1.13,4.16-13.98,3.02-13.98,3.02,0,0-26.83-6.05-20.03-4.91,6.8,1.13-27.97,2.27-27.59,.76,.3-1.2,2.74-46.15-1.36-65.64-.35-1.65-.34-.54-4.69-8.82-7.83-14.9-13.66-27.12-17.39-35.15Z"
          />
          <path
            className="cls-2"
            d="M955.59,516.37l-1.51-.38s-1.45,28.36,11.1,34.18c1.79,.83,3.87,1.2,6.28,.97"
          />
          <path
            className="cls-2"
            d="M965.19,550.17c3.97,2.91,11.09,8.32,10.97,9.79,0,.09-.04,.12-.05,.13-.84,.57-13.16-11.92-11.07-15.49,2.34-4,24.09,1.02,25.5,9.38,.41,2.44-1,4.6-1.06,4.69-1.95,2.88-6.3,4.02-11.2,3.06-1.1,33.08-2.52,54.21-4.36,54.24-2.99,.04-8.46-55.55-.76-57.45,2.08-.51,6.09,2.64,7.56,6.05,0,0,.47,1.09,1.34,7.75,6.43,8.42,9.64,12.65,9.62,12.66-.04,.03-11.12-14.33-33.26-43.09"
          />
          <path
            className="cls-2"
            d="M977.14,624.08l-4.54-8.31-.38-27.97s-1.31-9,.29-15.51c.67-2.73,1.86-5.03,3.87-6.03,6.8-3.4,7.18,8.69,4.91,25.7"
          />
        </g>
        <g id="Bostäder_och_Butiker-2" data-name="Bostäder och Butiker">
          <path
            className="cls-2"
            d="M982.98,772.43l.38,37.04,97.51,6.8s6.8-30.99,.38-41.95"
          />
        </g>
        <g id="Skolor">
          <polygon
            className="cls-2"
            points="906.25 636.37 981.85 660.56 981.09 686.63 905.12 670.38 906.25 636.37"
          />
          <path
            className="cls-2"
            d="M906.25,636.37l74.08,25.32c1.89-2.65,2.65-20.03,2.65-20.03,0,0,.42-.07,1.22-.18,5.94-.85,74.75,17.57,92.14,59.52,0,0-38.17,6.05-95.24-14.36"
          />
          <path
            className="cls-2"
            d="M1076.33,701c-5.98-24.57-35.73-60.41-35.73-60.41l-56.41,.89"
          />
        </g>
        <g id="Bostäder">
          <path
            className="cls-2"
            d="M1087.29,765.63c-.39,3.02-103.56-4.16-103.94-6.05s0-60.85,0-60.85l103.18,18.52s3.78,24.94,.76,48.38Z"
          />
        </g>
        <g id="Bostäder-2" data-name="Bostäder">
          <path
            className="cls-2"
            d="M985.02,965.67c-7.56-26.83,.76-67.28,.76-67.28,0,0,14.36-13.23,68.03,0,0,0,10.02,14.61-6.43,47.62-5.97,11.99-22.7,9.39-22.7,9.39,0,0-3.65,12.51-8.34,13.03"
          />
        </g>
        <g
          id="Sparre_Lantmäteriet_Kulturområde"
          data-name="Sparre Lantmäteriet Kulturområde"
        >
          <path
            className="cls-2"
            d="M1082.76,827.23c-56.31-3.78-99.4-.38-99.4-.38l-1.51,59.72,83.91,4.54s11.34-5.67,12.47-44.98"
          />
        </g>
        <g id="Bostäder_och_Butiker-3" data-name="Bostäder och Butiker">
          <path
            className="cls-2"
            d="M965.61,696.6c1.48,3.94,9.35,25.64,.52,35.65-5.26,5.97-16.62,5.36-39.1,3.9-9-.59-16.39-1.51-21.38-2.23-11.13,4.14-18.06,2.77-22.42,.56-4.31-2.19-15.95-11.21-11.99-8.36-3.4-3.05-8.22-6.59-14.6-9.2-2-.82-3.93-1.45-5.74-1.94v-42.9"
          />
        </g>
        <g id="Butiker">
          <path
            className="cls-2"
            d="M883.23,747.68s-13.03-8.86-15.64-13.03-27.11-.52-32.85-11.99l-39.1,1.56-1.04,12.51,2.61,51.46s-3.55,10.42,76.12,.9c30.24-3.61,42.75,14.45,42.75,14.45,0,0,12.51,4.97,17.73,3.61,5.21-1.35,2.09-27.99,2.09-27.99,0,0,18.77-9.03,30.76-2.71v-18.51l-.52-7.14s-26.59-14.08-82.9-3.13Z"
          />
        </g>
        <g id="Bostäder_och_butiker" data-name="Bostäder och butiker">
          <path
            className="cls-4"
            d="M937.98,807.64l26.07,2.09,2.61-33.27s-11.47-3.75-27.11-.1"
          />
        </g>
        <g id="Bostäder-3" data-name="Bostäder">
          <polyline
            className="cls-4"
            points="876.97 881.16 968.74 881.16 967.7 827.46 912.95 825.37"
          />
        </g>
        <g id="Bostäder-4" data-name="Bostäder">
          <polygon
            className="cls-6"
            points="866.46 930.48 970.74 934.13 970.22 970.62 865.94 962.8 866.46 930.48"
          />
        </g>
        <g id="Skolor-2" data-name="Skolor">
          <polygon
            className="cls-6"
            points="874.8 891.89 969.17 895.54 970.74 917.44 872.19 914.31 874.8 891.89"
          />
          <path
            className="cls-6"
            d="M783.04,646.84l-16.16-3.13s4.17-29.2,13.03-25.55,0,31.28,3.13,28.68Z"
          />
        </g>
        <g id="Bostäder-5" data-name="Bostäder">
          <path
            className="cls-2"
            d="M629.75,915.88l172.06,12.51s6.26,30.24-3.65,68.3l-158.5-4.69s-10.95,2.61-7.82-20.86"
          />
        </g>
        <g id="Bostäder-6" data-name="Bostäder">
          <path
            className="cls-2"
            d="M694.92,563.94s-.52,10.43,33.89,2.61c0,0,23.98,.52,41.19-3.13,17.21-3.65-18.25-136.6-19.29-130.35s-25.55,30.24-55.79,130.87Z"
          />
        </g>
        <g id="Bostäder-7" data-name="Bostäder">
          <path
            className="cls-7"
            d="M739.79,731.53s.07,0,.1,0c.23,0,.7-.08,1.25-.16-.05-.08-.11-.16-.16-.23-1.4-1.7-3.23-2.37-5.24-2.38,1.16,.62,2.29,1.28,3.39,2.15,.26,.2,.47,.41,.67,.63Z"
          />
          <path
            className="cls-7"
            d="M777.82,586.88c-28.15-19.29-74.04-2.61-74.04-2.61,0,0-55.27,59.96,10.43,141.82,.28,.35,.56,.69,.84,1.02,.24-.23,.5-.44,.81-.64,6.53-4.28,14.56-8.49,22.61-7.39,6.02,.82,12.85,6.32,14.12,12.74,1.14-.91,1.77-1.55,1.77-1.55,0,0,3.65-114.18,26.59-116.27l-3.13-27.11Z"
          />
        </g>
        <g id="Butiker-2" data-name="Butiker">
          <path
            className="cls-8"
            d="M784.6,822.03c3.65-52.66-3.13-172.58-3.13-172.58l-16.68-2.61s-2.61,18.25-8.86,88.11c0,0-18.25-30.76-40.67-4.17,0,0,3.65,10.43,67.78,88.11"
          />
        </g>
        <g id="Stortorget">
          <path
            className="cls-8"
            d="M863.33,877.82c1.86-.99,4.56-2.63,7.3-5.21,5.35-5.04,7.21-10.22,10.43-17.21,5.42-11.78,5.92-9.67,9.91-18.77,6.43-14.69,9.84-22.48,6.78-28.15-1.56-2.89-4.62-4.9-35.45-7.82-18.81-1.78-28.48-2.66-41.19-2.09-10.07,.45-18.59,1.55-25.03,2.61-.18,2.4-.33,4.93-.26,7.56,.13,5.08,.78,12.77,2.87,23.2,0,0-10.95,14.08,4.69,25.03,0,0,6.26,23.46,9.38,22.94s40.15,6.26,50.57-2.09Z"
          />
        </g>
        <g id="Hoglandspark">
          <polygon
            className="cls-8"
            points="796.59 616.08 841.95 617.64 841.95 708.37 798.68 707.84 796.59 616.08"
          />
        </g>
        <g id="Amiralitetsparken">
          <path
            className="cls-8"
            d="M807.02,1005.56c-1.05,.53-1.74,1.15-2.11,1.83-4.07,7.45,29.06,22.31,32.88,1.3,4.17-22.94,14.08-39.1,14.08-39.1l8.86-76.64c-16.16-7.3-44.32-2.09-44.32-2.09l-11.13,115.85"
          />
        </g>
        <g id="Museum">
          <path
            className="cls-8"
            d="M701.7,749.03s11.99,2.61,27.63,11.47c0,0-1.27,17.53-18.77,36.5-6.26,6.78-27.11-17.21-27.11-17.21,0,0,3.65-29.2,18.25-30.76Z"
          />
        </g>
        <g id="Butiker-3" data-name="Butiker">
          <path
            className="cls-1"
            d="M779.39,840.8c30.24,40.67,23.46,69.87,23.46,69.87-43.8,0-64.65-6.26-75.08-9.38s-5.21-65.69,0-72.47-13.56-30.76-13.03-29.2,18.77-34.41,18.77-34.41c0,0,15.64,5.74,33.37,54.22"
          />
        </g>
        <g id="Bostäder_och_Butiker-4" data-name="Bostäder och Butiker">
          <path
            className="cls-1"
            d="M637.57,900.24c13.56,6.78,75.08,4.69,77.17-.52,2.09-5.21,.52-67.78,.52-67.78,4.17-7.3-13.56-17.73-13.56-17.73-5.74-25.03-123.05-30.24-123.05-30.24,0,0-6.78,37.54-2.61,44.32"
          />
        </g>
        <g id="Brinova">
          <path
            className="cls-1"
            d="M511.92,810.04c15.64-1.56,47.45,6.78,47.45,6.78,23.98-102.19,13.03-88.64,13.03-88.64l-52.66-7.82s-10.95,80.29-8.34,86.55"
          />
        </g>
        <g id="Fisktorget">
          <path
            className="cls-4"
            d="M620.36,737.04c8.34,10.43,27.11,21.9,54.22,17.73,0,0-11.47,16.16-23.98,15.64-95.86-3.99-62.05-9.39-70.39-5.74s-2.61-37.54-2.61-37.54c6.69,.53,14.45,1.61,22.94,3.65,7.51,1.81,14.14,4.02,19.81,6.26Z"
          />
        </g>
        <g id="Varv_och_Marinbas" data-name="Varv och Marinbas">
          <path
            className="cls-5"
            d="M1045.82,989.39s-44.32-2.61-59.96-6.78l-65.17-2.61c-43.28-9.39-65.69-5.74-65.69-5.74,0,0-9.91,18.25-11.99,34.41l-1.06-.14c-1.24,1.79-2.67,3.32-4.32,4.67-.43,.63-.87,1.26-1.36,1.86-.78,.96-1.75,1.71-2.77,2.41-.55,.38-1.24,.55-1.93,.61-2.86,2.75-6.56,4.19-10.73,2.71-.54-.19-1.01-.42-1.46-.67-1.56-.2-3.05-.79-4.48-1.61-.19-.11-.35-.25-.52-.38-3.58-.46-6.79-2.78-9.3-5.93-1.06-1.34-1.33-2.82-1.09-4.19-.11-.19-.21-.38-.3-.6-.56-1.33-.59-2.73-.18-4.05l-3.24-.43s-62.05,1.56-121.48-3.13c-4.33,21.88-10.33,64.77,10.43,78.73,6.29,4.24,12.91,4.37,16.63,4.48,21.41,.66,53.05,3.94,101.72,14.29,25.72,.87,51.44,1.74,77.17,2.61l45.36,1.04s39.1,.52,44.32-.52c5.21-1.04,30.76-.52,42.75-8.34,0,0-3.65-6.78,.52-30.76,0,0-4.17-31.8,22.42-41.71l10.43-25.03-4.69-5.21Z"
          />
          <path
            className="cls-5"
            d="M974.91,982.62c37.02,1.56-19.29-5.74-50.05-1.56"
          />
          <path
            className="cls-5"
            d="M516.03,717.02c-3-17.33-32.93-26.41-49.01-31.28-1.76-.53-12.47-2.44-33.89-6.26-22.18-3.95-27.96-4.74-30.24-1.56-3.48,4.86,6.32,11.93,9.91,33.37,1.12,6.72,2.75,16.43-.52,22.94-.95,1.89-2.87,4.62-3.13,8.86-.17,2.73,.47,4.04-.52,6.26-.82,1.82-1.87,2.05-3.89,4.86-.91,1.27-1.9,2.78-2.89,4.52-5.59,9.8-5.07,16.03-8.34,24.51-4,10.36-10.27,15.27-13.56,19.29-7.63,9.34-11.62,29.09,5.21,75.08,4.69,26.59-17.73,12.51-17.73,12.51-.98,2.68-8.96,25.57,3.31,41.34,3.98,5.11,12.6,12.71,23.81,14.45,8.69,1.34,16.09-1.29,23.46,4.17,2.46,1.83,3.82,3.74,5.21,5.74,6.08,8.72,7.84,19.93,9.91,33.89,.42,2.82,1.03,7.36,4.08,8.73,1.83,.83,3.9,.22,5.31-.39,1.82-2.03,4.48-5.21,7.3-9.39,6.13-9.09,7.48-14.77,12.64-16.42,1.69-.54,4.34-.83,8.21,.78,5.74,27.11,8.34,15.64,8.34,15.64l18.77-69.34,57.35,14.08-12.51,76.12c20.86,4.69,10.95,20.33,29.72,20.86,18.77,.52,14.6,7.82,14.6,7.82,0,0-6.26,149.12,5.21,172.58,11.47,23.46,41.71-4.17,41.71-4.17,0,0,11.99,6.26,30.76-10.95,18.77-17.21,17.73-18.77,10.43-35.45-7.3-16.68,14.6-39.1,14.6-39.1l118.36-5.74c.35-4.87,.7-9.73,1.04-14.6-99.16-78.34-133.54-102.46-138.17-102.19-.29,.02-3.48,.3-7.82,0-3.98-.28-5.45-.8-8.34-1.04-6.55-.54-7.88,1.44-11.47,1.04-9.33-1.03-17.81-16.33-17.73-28.68,.02-2.77,.46-3.43,.52-8.34,.09-7.19-.79-9.86-.52-16.16,.19-4.43,.81-7.47,1.04-8.86,1.53-9.3-1.21-26.94-6.78-42.23,0,0-15.26-41.91-61-70.39-8.29-5.16-15.78-9.7-26.07-9.91-8.91-.18-11.84,3.05-18.77,1.04-9.77-2.83-9.97-10.97-19.29-16.16-12.79-7.12-31.03-2.14-31.28,1.04-.36,4.46,33.7,15.97,41.19,5.74,3.67-5.01,1.7-16.27-4.17-20.86-3.89-3.03-9.92-3.47-9.91-5.74,0-1.03,1.26-1.32,2.61-3.65,1.25-2.15,1.46-4.1,1.56-4.69,1.22-6.95,24.37-36.4,21.38-53.7Z"
          />
          <path className="cls-5" d="M535.84,771.76l15.64-6.78" />
          <path
            className="cls-5"
            d="M586.94,844.24c3.48-4.34,6.95-8.69,10.43-13.03"
          />
          <polygon
            className="cls-5"
            points="511.34 734.75 504.56 820.25 464.94 768.11 511.34 734.75"
          />
          <polygon
            className="cls-5"
            points="536.37 815.56 492.57 810.35 514.99 827.55 536.37 815.56"
          />
          <polygon
            className="cls-5"
            points="497.26 920.88 558.79 938.61 560.87 925.05 481.1 908.89 497.26 920.88"
          />
        </g>
      </svg>
    </div>
  );
}

export default Karta;
