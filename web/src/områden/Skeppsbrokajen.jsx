import områden from "./områden.css";
import leds from "../Leds";
import { useEffect, useState } from "react";

export default function Skeppsbrokajen() {
     const [title, setTitle] = useState("");
     const [info, setInfo] = useState("");
     const [bild, setBild] = useState("");

     useEffect(() => {
          const info = leds.find((area) => area.name === "Skeppsbrokajen");
          if (!info) return;
          setTitle(<h1 className="titel">{info.name}</h1>);
          setInfo(<p className="info">{info.info}</p>);
          setBild(<img src={info.picture} alt="Bild" className="områdeBild" />);
     }, []);

     return (
          <main className="område">
               {title}
               {info}
               {bild}
          </main>
     );
}
