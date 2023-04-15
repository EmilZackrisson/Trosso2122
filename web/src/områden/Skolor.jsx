import områden from "./områden.css";

export default function Stortorget() {
     return (
          <main className="område">
               <h1 className="titel">Skolor</h1>
               <p className="info">
                    Skolor kommer alltid att behövas och ingen anledning till
                    att flytta dem heller. Skolorna kommer att bevaras och de
                    kommer därför att byggas ut så att det får plats för fler
                    personer.
               </p>
               <img
                    src="https://www.karlskrona.se/globalassets/skola-och-forskola/gymnasieskola/bilder/ehresvardska-gymnasiet.jpg?mode=page-intro-medium"
                    alt="Bild på Ehrensvärdska gymnasiet"
                    className="områdeBild"
               />
          </main>
     );
}
