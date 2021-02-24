import React from "react";
import styles from "./SpecialOffer.module.css";

// TS types
import { Food } from "../../types";

// custom hook
import { useStateDipatch } from "../../context/AppState";

interface Props {
	food: Food;
}

const SpecialOffer: React.FC<Props> = ({ food }) => {
	// custom hook | provides the dipatch intitialized in AppState.tsx as well as check to see if undefined
	const dispatch = useStateDipatch();

	// function to add to cart
	const onAddToCart = () => {
		/* must take in a type and the payload structure OR ERROR */
		dispatch({
			type: "ADD_TO_CART",
			payload: {
				item: {
					id: food.id,
					name: food.name,
					price: food.price,
					quantity: 1,
				},
			},
		});
	};

	return (
		<div className={styles["container"]}>
			<h1>Special Offer</h1>
			<h2>{food.name}</h2>
			<p>{food.description}</p>
			<p>${food.price}</p>
			<button type="button" onClick={onAddToCart}>
				Add To Cart
			</button>
		</div>
	);
};

export default SpecialOffer;
