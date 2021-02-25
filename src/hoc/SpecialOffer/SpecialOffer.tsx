import React from "react";
import styles from "./SpecialOffer.module.css";

// HoC
import withAddToCart from "../../hoc/withAddToCart/withAddToCart";

// TS types
import { Food } from "../../types";
import { withAddToCartProps } from "../../hoc/withAddToCart/withAddToCart";

// custom hook
import { CartItem, useStateDipatch } from "../../context/AppState";

interface Props extends withAddToCartProps {
	food: Food;
}

const SpecialOffer: React.FC<Props> = ({ food, onAddToCart }) => {
	const onHandleAddToCart = () => {
		onAddToCart &&
			onAddToCart({
				id: food.id,
				name: food.name,
				price: food.price,
				quantity: 1,
			});
	};
	return (
		<div className={styles["container"]}>
			<h1>Special Offer</h1>
			<h2>{food.name}</h2>
			<p>{food.description}</p>
			<p>${food.price}</p>
			<button type="button" onClick={onHandleAddToCart}>
				{`Add To ${food.name} to Cart`}
			</button>
		</div>
	);
};

export default withAddToCart(SpecialOffer);

/* 
Code used to be here, now outsourced to the HoC

// custom hook | provides the dipatch intitialized in AppState.tsx as well as check to see if undefined
const dispatch = useStateDipatch();

// function to add to cart
const onAddToCart = () => {
	must take in a type and the payload structure OR ERROR
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
*/
