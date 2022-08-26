import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
	return (
		<div className="landing">
			<div className="text"><span>{"Welcome, "}<span className="bolder">gamer!</span></span></div>
			<Link to="/home">Press Start</Link>
		</div>
	);
}
