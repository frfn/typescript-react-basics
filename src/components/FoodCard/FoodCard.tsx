import React from "react";
import styles from "./FoodCard.module.css";

// 1. name the props that will be passed in
interface Props {
	food: Food; // Food should have id, name, description, price | it's initialized down below!
}

// 2. for each prop passed in, what does it contain
interface Food {
	id: number; // used for key
	name: string;
	description: string;
	price: number;
}

const FoodCard: React.FC<Props> = ({ food }) => {
	return (
		<li className={styles["food-container"]}>
			<h2 className={styles["food-container__h2"]}>{food.name}</h2>
			<p className={styles["food-container__p--desc"]}>
				{food.description}
			</p>
			<p className={styles["food-container__p--price"]}>${food.price}</p>
		</li>
	);
};

export default FoodCard;
