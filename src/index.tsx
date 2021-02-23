import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import "../src/styles/main.css";

// Context
import AppStateProvider from "./context/AppState";

ReactDOM.render(
	<AppStateProvider>
		<App />
	</AppStateProvider>,
	document.getElementById("root")
);
