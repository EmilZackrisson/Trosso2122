import områden from "./områden.css";

export default function Stortorget() {
     return (
          <main className="område">
               <h1 className="titel">Stortorget</h1>
               <p className="info">
                    Torget visar idag en lång historia om Karlskrona och så ska
                    det vara i framtiden med. Det som kommer ändras på är fler
                    lampor och mer historiska paneler och info-rutor belyses.
                    Byggnaderna som Fredrikskyrkan, Tyska kyrkan och rådhuset
                    står kvar.
               </p>
               <img
                    src="https://www.svenskakyrkan.se/bilder/563393/078.jpg?DoProcessing=&ci=0,0,1500,844&w=1680"
                    alt="Bild på Stortorget"
                    className="områdeBild"
               />
          </main>
     );
}
