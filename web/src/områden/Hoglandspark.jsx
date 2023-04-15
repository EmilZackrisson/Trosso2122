import områden from "./områden.css";

export default function Stortorget() {
     return (
          <main className="område">
               <h1 className="titel">Hoglands Park</h1>
               <p className="info">
                    Parken är en perfekt plats för utomhusaktiviteter och
                    kulturell historia. Om man i framtiden väljer att avverka
                    stora delar växtlighet så måste det finnas platser där man
                    fortfarande kan besöka naturen, därför vill vi bevara den
                    som den är i helhet men också öka växtligheten med fler
                    träd, buskar och blommor.
               </p>
               <img
                    src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/cb/a5/d1/20190520-180925-largejpg.jpg?w=1200&h=1200&s=1"
                    alt="Bild på Hoglandspark"
                    className="områdeBild"
               />
          </main>
     );
}
