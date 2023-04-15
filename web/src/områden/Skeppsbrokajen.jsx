import områden from "./områden.css";

export default function Stortorget() {
     return (
          <main className="område">
               <h1 className="titel">Skeppsbrokajen</h1>
               <p className="info">
                    Skeppsbrokajen eller “Skeppsbrokajen” är för nuläget ganska
                    tom där inte många byggnader följer kanten. De få byggnader
                    som finns används som konferens byggnader eller
                    restauranger, detta är perfekt och vill ha fler.
                    Skeppsbrokajen ska också ha en gångbana längs med små
                    platser där folk kan samlas för aktiviteter.
               </p>
               <img
                    src="https://www.nordicchoicehotels.se/globalassets/global/hotel-pictures/clarion-hotel/clarion-collection-hotel-carlscrona/the-hotel/surrounding-exterior-clarion-collection-hotel-carlscrona.jpg"
                    alt="Bild på Skeppsbrokajen"
                    className="områdeBild"
               />
          </main>
     );
}
