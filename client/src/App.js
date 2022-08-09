// REACT
import React from "react";

// ROUTER
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";

// COMPONENTS
import Nav from "./components/Nav.js";
import Landing from "./components/Landing.js";
import Home from "./components/Home.js";
import Create from "./components/Create.js";
import GameDetail from "./components/GameDetail.js";

export default function App() {
	return (
		<React.Fragment>
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route path="/" component={Nav} />
			</Switch>
			<Route path="/home" component={Home} />
			<Route path="/create" component={Create} />
			<Route path="/detail/:id" component={GameDetail} />
		</React.Fragment>
	);
}
