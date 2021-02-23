import React, { useContext } from "react";

// JSON data
import pizzas from "../data/pizzas.json";

// Components
import FoodCard from "../components/FoodCard/FoodCard";
import Toolbar from "../components/Toolbar/Toolbar";
import Cart from "../components/Cart/Cart";

// CSS
import styles from "./App.module.css";

// SVG
import PizzaSVG from "../assets/svg/pizza.svg";
/* ßwidth={120} height={120} to customize size in <PizzaSVG /> else no props for default size! */

// Context API
import { AppStateContext } from "../context/AppState";

const App: React.FC = (props) => {
	// (window as any).hello();  /* to simulate source mapping error for TS */

	let content = <div className={styles["food-container"]}>No Content</div>;

	// an object
	interface Navigation {
		link: string;
		title: string;
	}

	// an array of object
	type Navigations = Navigation[];

	const navLinks: Navigations = [
		{ title: "Example One", link: "#e1" },
		{ title: "Example Two", link: "#e2" },
	];

	// useContext
	const appStateContext = useContext(AppStateContext);

	if (pizzas) {
		content = (
			<div>
				<Toolbar navigations={navLinks} />

				<div className={styles["food-container__header"]}>
					<PizzaSVG width={180} height={180} />
					<div className={styles["food-container__site-title"]}>
						Delicious Pizza
					</div>
					<Cart />
				</div>

				<ul className={styles["food-container__ul"]}>
					{pizzas.map((pizza) => {
						return <FoodCard key={pizza.id} food={pizza} />;
					})}
				</ul>
			</div>
		);
	}

	return <div className={styles["food-container"]}>{content}</div>;
};

export default App;
