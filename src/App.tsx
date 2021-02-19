import React from "react";
import pizzas from "./data/pizzas.json";
import Pizza from "./components/Pizza";

const App = () => {
	// (window as any).hello();  /* to simulate source mapping error for TS */

	let content = <div>No Content</div>;

	if (pizzas) {
		content = (
			<ul>
				{pizzas.map((pizza) => {
					return <Pizza key={pizza.id} pizza={pizza} />;
				})}
			</ul>
		);
	}

	return <div>{content}</div>;
};

export default App;
