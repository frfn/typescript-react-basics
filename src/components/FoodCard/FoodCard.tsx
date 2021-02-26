import React, { useContext } from "react";
import styles from "./FoodCard.module.css";

// TS Interface Type
import { Food } from "../../types";

// HoC
import withAddToCart from "../../hoc/withAddToCart/withAddToCart";
import {
	WithRenderProps,
	WithAddingToCartProps,
} from "../../hoc/withAddToCart/withAddToCart";

// import { CartItem, useStateDipatch } from "../../context/AppState"; /* Context API | the dispatch */
import { withAddToCartProps } from "../../hoc/withAddToCart/withAddToCart";

// 1. create interface Props
interface Props extends withAddToCartProps {
	food: Food; // Food type should have id, name, description, price | it's initialized and OUTSOURCED in types.ts!
}

// onAddToCart comes from the HoC, it passed on a function called onAddToCart to this component, which is the CHILD COMPONENT!
const FoodCard: React.FC<Props> = ({ food, onAddToCart }) => {
	const onHandleAddToCart = () => {
		// if truthy, execute
		if (onAddToCart) {
			onAddToCart({
				id: food.id,
				name: food.name,
				price: food.price,
				quantity: 1,
			});
		} else {
			throw new Error("Cannot add!");
		}
	};

	return (
		<li className={styles["food-container"]}>
			<h2 className={styles["food-container__h2"]}>{food.name}</h2>
			<p className={styles["food-container__p--desc"]}>
				{food.description}
			</p>
			<p className={styles["food-container__p--price"]}>${food.price}</p>
			<button type="button" onClick={onHandleAddToCart}>
				{`Add To ${food.name} to Cart`}
			</button>

			<WithRenderProps>
				{({ logger }) => {
					return <button onClick={() => logger()}>Click Me</button>;
				}}
			</WithRenderProps>

			<WithAddingToCartProps>
				{({ onAddToCart }) => {
					return (
						<button
							type="button"
							/* onClick={onAddToCart({
								id: food.id,
								name: food.name,
								price: food.price,
								quantity: 1,
							})} */
						>
							Add To Cart....
						</button>
					);
				}}
			</WithAddingToCartProps>
		</li>
	);
};

export default withAddToCart(FoodCard);

/* udpate: exported out to types.ts */
// 2. for each prop passed in, what does it contain
// interface Food {
// 	id: number; // used for key
// 	name: string;
// 	description: string;
// 	price: number;
// }

/* 
	This was the code previously... very messy!

	HERE:
	imagine that you were to just call the useContext() here, 
	- it fills the context with the setState function because of useContext()
	- since the index.tsx component is wrapped with the AppStateProvider component, it gives the AppSetStateContext value
	
	it is the same concept when used in AppState.tsx
*/

// context
// const setState = useSetState(); // useSetState is an arrow function, must be executed | when it is, the value is NOW setState because of the provider

/* 
// function to add to cart
const onAddToCart = () => {
	// console.log(food);  we see the description is on here as well, not compatible with the structure of the state used in AppState.tsx

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
							// console.log(item.id, food.id); /* used to see why it was causing an error if I didn't `return item` at the end
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

							
							if I add cheese pizza first, cheese pizza is first in the items array, 
							Now, I add pepperoni, and I add another pepperoni again, map() will iterate through the items array, going through the cheese pizza first.

							IT WILL GIVE ERROR, since food.id is not the same as the pizza.id

							because it iterates through the whole entire array first, if it not the item we are looking for, just `return item`
							
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
*/

/* 
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
