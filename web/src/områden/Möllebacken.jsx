import områden from "./områden.css";

export default function Stortorget() {
     return (
          <main className="område">
               <h1 className="titel">Möllebacken</h1>
               <p className="info">
                    Skolor kommer alltid att behövas och ingen anledning till
                    att flytta dem heller. Skolorna kommer att bevaras och de
                    kommer därför att byggas ut så att det får plats för fler
                    personer.
               </p>
               <img
                    src="https://tengbom.se/app/uploads/2016/05/ronnebygatan_07.RGB_color-600x600.jpg"
                    alt="Bild på Nordstjärnan"
                    className="områdeBild"
               />
          </main>
     );
}
