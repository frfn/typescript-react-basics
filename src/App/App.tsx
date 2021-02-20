import React from "react";
import pizzas from "../data/pizzas.json";
import Pizza from "../components/Pizza/Pizza";
import styles from "./App.module.css";

const App = () => {
	// (window as any).hello();  /* to simulate source mapping error for TS */

	let content = <div className={styles["pizza-container"]}>No Content</div>;

	if (pizzas) {
		content = (
			<div className={styles["pizzas-container__main-div"]}>
				<ul className={styles["pizzas-container__ul"]}>
					{pizzas.map((pizza) => {
						return <Pizza key={pizza.id} pizza={pizza} />;
					})}
				</ul>
			</div>
		);
	}

	return <div className={styles["pizza-container"]}>{content}</div>;
};

export default App;
