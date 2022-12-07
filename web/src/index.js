import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Dash from "./Dash";
// import Login from "./Login";
import Karta from "./Karta";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<App />} />
				{/* <Route path="/Trosso2122" element={<App />} /> */}
				<Route path="/dash" element={<Dash />} />
				<Route path="/karta" element={<Karta/>} />

				
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
