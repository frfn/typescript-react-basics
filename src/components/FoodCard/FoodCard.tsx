import React, { useContext } from "react";
import styles from "./FoodCard.module.css";

// Context API
import { useSetState } from "../../context/AppState";

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
	// context
	const setState = useSetState(); // useSetState is an arrow function, must be executed!

	// function to add to cart
	const onAddToCart = (
		event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
	): void => {
		// console.log(food); /* we see the description is on here as well, not compatible with the structure of the state used in AppState.tsx */

		// Cannot invoke an object which is possibly 'undefined', that is why it is inside an `if` statement | not anymore, it a custom hook, it checks to see if setState is undefined!

		setState((prevState) => {
			// grouping logic
			const itemExists = prevState.cart.items.find(
				(item) => item.id === food.id
			);

			return {
				...prevState,
				cart: {
					...prevState.cart,
					items: itemExists
						? prevState.cart.items.map((item) => {
								// console.log(item.id, food.id); /* used to see why it was causing an error if I didn't `return item` at the end */
								if (item.id === food.id) {
									return {
										...item,
										quantity: item.quantity + 1,
									};
								}
								// if it's not the item that we need to update, it still should return something
								// this statement is inside a map(), so it must return something.

								// since we're mapping, we are iterating through each element...
								// so if we start iterating and it doesn't have the same ID as food.id, it should return that object untouched, and continue until it finds the right item!

								/* 
								if I add cheese pizza first, cheese pizza is first in the items array, 
								Now, I add pepperoni, and I add another pepperoni again, map() will iterate through the items array, going through the cheese pizza first.

								IT WILL GIVE ERROR, since food.id is not the same as the pizza.id

								because it iterates through the whole entire array first, if it not the item we are looking for, just `return item`
								*/
								return item;
						  })
						: [
								...prevState.cart.items,
								// you can't do .push() because it is incompatible with the structure, in normal ReactJS, it is possible, but we're in TS
								{
									id: food.id,
									name: food.name,
									price: food.price,
									quantity: 1,
								},
						  ],
				},
			};
		});
	};

	return (
		<li className={styles["food-container"]}>
			<h2 className={styles["food-container__h2"]}>{food.name}</h2>
			<p className={styles["food-container__p--desc"]}>
				{food.description}
			</p>
			<p className={styles["food-container__p--price"]}>${food.price}</p>
			<button type="button" onClick={onAddToCart}>
				Add To Cart
			</button>
		</li>
	);
};

export default FoodCard;
