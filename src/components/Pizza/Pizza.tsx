import React from "react";
import styles from "./Pizza.module.css";

// 1. name the props that will be passed in
interface Props {
	pizza: Pizza; // Pizza should have id, name, description, price | it's initialized down below!
}

// 2. for each prop passed in, what does it contain
interface Pizza {
	id: number; // used for key
	name: string;
	description: string;
	price: number;
}

const Pizza: React.FC<Props> = ({ pizza }) => {
	return (
		<li className={styles["pizza-container"]}>
			<h2 className={styles["pizza-container__h2"]}>{pizza.name}</h2>
			<p className={styles["pizza-container__p--desc"]}>
				{pizza.description}
			</p>
			<p className={styles["pizza-container__p--price"]}>
				${pizza.price}
			</p>
		</li>
	);
};

export default Pizza;
