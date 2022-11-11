import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	function logInClick() {
		if (username === "emil" && password === "hej") {
			const date = new Date();
			date.setHours(date.getHours() + 4);
			document.cookie = "loggedIn=true; expires=" + date.toString();
			navigate("/Dash");
		} else {
			alert("inte välkommen");
		}
	}

	return (
		<div className="login-container">
			<div className="login-box">
				<h1>Logga in</h1>
				<div className="form">
					<label htmlFor="username">Användare</label>
					<input
						type="text"
						name="username"
						id="username-box"
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
					<label htmlFor="password">Lösenord</label>
					<input
						type="password"
						name="password"
						id="password-box"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								logInClick();
							}
						}}
					/>
					<button onClick={logInClick}>Logga in</button>
				</div>
			</div>
		</div>
	);
}

export default Login;
