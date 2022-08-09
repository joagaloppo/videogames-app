// REACT
import React from "react";
import ReactDOM from "react-dom";

//REDUX
import { Provider } from "react-redux";
import store from "./redux/store";

// APP COMPONENT
import App from "./App";

// ROUTER
import { BrowserRouter } from "react-router-dom";

//STYLES
import "./index.css";

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
