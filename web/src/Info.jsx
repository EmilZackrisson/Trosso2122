import React from "react";

const Info = () => {
    return(
        <div className="info flex justify-center">
            <section className="container text-white m-5 text-center">
                <h1 className="text-4xl">Information</h1>
                <p>Denna sida är en del av ett gymnasiearbete där målet var att tänka ut hur Trossö kan se ut om 100 år och att bygga en modell av det vi kom fram till.</p>
                <p>Vill du se hur allting fungerar ihop? 
                    <a 
                    href="https://github.com/EmilZackrisson/Trosso2122"
                    className="link">
                        Trossö 2122 GitHub
                    </a>
                </p>
            </section>
        </div>
    );
};

export default Info;