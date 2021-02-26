import React, { useEffect } from "react";

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

// HoC
import SpecialOffer from "../hoc/SpecialOffer/SpecialOffer";

const App: React.FC = (props) => {
	// (window as any).hello();  /* to simulate source mapping error for TS if no source map! */

	let content = <div className={styles["food-container"]}>No Content</div>;

	// an interface
	interface Navigation {
		link: string;
		title: string;
	}

	// an array of Navigation objects
	type Navigations = Navigation[];

	// using the Navigations type
	const navLinks: Navigations = [
		{ title: "Example One", link: "#e1" },
		{ title: "Example Two", link: "#e2" },
	];

	/* 
	const specialOfferFood: Food = {
		id: 999,
		name: "Special Today!",
		description: "New Pizza! Try now!",
		price: 17.99,
	}; 
	*/

	// example of how to use componentWillUnmount and componentDidMount
	/* useEffect(() => {
		const listener = () => {
			alert("Hello!");
		};
		document.addEventListener("mousedown", listener);
		return () => {
			document.removeEventListener("mousedown", listener);
		};
	}, []); */

	const specialOfferFood = pizzas.find((food) => food.specialOffer); // grabs a pizza that has a specialOffer prop
	const normalOfferFood = pizzas.filter((food) => !food.specialOffer); // grabs the pizzas that are not special offers

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

				{/* show special offer IF specialOfferFood is a truthy value */}
				{specialOfferFood && <SpecialOffer food={specialOfferFood} />}

				<ul className={styles["food-container__ul"]}>
					{normalOfferFood.map((pizza) => {
						return <FoodCard key={pizza.id} food={pizza} />;
					})}
				</ul>
			</div>
		);
	}

	return <div className={styles["food-container"]}>{content}</div>;
};

export default App;
