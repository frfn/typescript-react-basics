import React from "react";
import { useStateDispatch } from "../../context/AppState";
import { CartItem } from "../../context/AppState";

export interface withAddToCartProps {
	// LAST EDIT: I took the question mark out, getting lots of 'undefined' bs
	onAddToCart: (item: CartItem) => void; // FIRST EDIT: for me, I don't want to pass anything down to the child tbh, keep it local! so I made onAddToCart? optional
	// onAddToCart: (item: Omit<CartItem, 'quantity'>) => void
}

interface FoodVariable {
	food: CartItem;
}

// const testingCode: withAddToCartProps = {
// 	onAddToCart: (item: CartItem) => {
// 		console.log(item);
// 	},
// };

/* ------------------------------------------------------------------------------ */
/*   HoC Component | Wraps a component and gives it onAddToCart() functionality   */
/* ------------------------------------------------------------------------------ */
// the original props will be passed in when this HoC is used! <iAmAGenericArgument>
function withAddToCart<OriginalProps extends withAddToCartProps>(
	// React.ComponentType takes in an argument! ChildComponent must take a an argument!
	ChildComponent: React.ComponentType<OriginalProps>
) {
	// function to be returned, normally written as: return (props) => {...} in a normal HoC
	const AddToCartHOC = (
		// ommitting the keyof withAddToCartProps | so when importing the wrapped component, I don't have to pass in the prop!
		props: Omit<OriginalProps, keyof withAddToCartProps>
	) => {
		const dispatch = useStateDispatch();

		// giving a type to onAddToCart function, used [] to access withAddToCartProps and grab the '(item: CartItem) => void;' value
		const onAddToCart: withAddToCartProps["onAddToCart"] = (
			item: CartItem
			// he removes the CartItem type here because he used Omit to remove quantity! Also TS will infer the types anyways for the argument if given a type for the function!
		) => {
			dispatch({
				type: "ADD_TO_CART",
				// this works because the item is of type CartItem!
				payload: {
					item,
				},
			});
		};

		/* ----------------------------------------------------- */
		/*      I created this with intuition! - my solution     */
		/* ----------------------------------------------------- */
		const foodVariable = (props as never) as FoodVariable; // it was suggested to assert as 'never' first then as FoodVariable,

		// props structure is props: {food: {id, name, price, quantity}}
		// created FoodVariable interface to get the desired structure and traverse to the data we need!

		const foodItem: CartItem = {
			id: foodVariable.food.id,
			name: foodVariable.food.name,
			price: foodVariable.food.price,
			quantity: 1,
		};

		const onAddToCartThroughHoC /* : withAddToCartProps["onAddToCart"] only here to show that this is the onAddToCart function */ = (
			item: CartItem
		) => {
			dispatch({
				type: "ADD_TO_CART",
				payload: {
					item, // this can be named item because this is inferred that this will be item: { id, name, etc}

					// i was doing foodItem just by itself, and it was NOT working
				},
			});
		};
		/* -------------------------- */
		/*     end of my solution     */
		/* -------------------------- */

		// this is an assertion, there is a problem within the TS language when it comes to this. /* {...(props as OriginalProps)} */
		return (
			<div>
				<ChildComponent
					{...(props as OriginalProps)}
					onAddToCart={onAddToCart}
				/>
				<div
					style={{
						display: "flex",
						flexFlow: "column nowrap",
					}}
				>
					<button
						style={{
							alignSelf: "center",
							outline: "none",
							padding: "10px",
							background: "#fab1a0",
							color: "white",
							fontSize: "20px",
							borderRadius: "20px",
							border: "2px solid white",
							width: "500px",
							marginRight: "40px",
							cursor: "pointer",
						}}
						onClick={() => onAddToCartThroughHoC(foodItem)}
						type="button"
					>{`Add To Cart Through HoC! ${foodItem.name}`}</button>
				</div>
			</div>
		);
	};

	return AddToCartHOC;
}

export default withAddToCart;

/* ------------------- */
/*   WithRenderProps   */
/* ------------------- */
interface Logger {
	logger: () => void;
}
export const WithRenderProps: React.FC<{
	children: (props: Logger) => JSX.Element;
}> = ({ children }) => {
	const logger = () => {
		console.log("Hello!");
	};

	return children({ logger });
};

export const WithAddingToCartProps: React.FC<{
	children: (props: withAddToCartProps) => JSX.Element;
}> = ({ children }) => {
	const dispatch = useStateDispatch();
	const onAddToCart: withAddToCartProps["onAddToCart"] = (item) => {
		dispatch({
			type: "ADD_TO_CART",
			payload: {
				item,
			},
		});
	};
	return children({ onAddToCart });
};

/* 
<button type="button" onClick={logger}>
	PRINT ME, check console log
</button> 
*/

/* confirmed something that was obvious -- if the child component is rendered with this HoC, it renders with the child component individually, only maintaining the props that are PASSED into the component */

/* You can make this more friendly by passing the props in! */

/* -------------------------------------------------------------- */
/* you MUST use `extends` if you want to write a generic arrow fn */
/* -------------------------------------------------------------- */
// const withAddToCart = <OriginalProps extends {}>(ChildComponent: React.ComponentType) => {
// 	const AddToCartHOC = (props) => {
// 		<div>
// 			<ChildComponent />
// 		</div>;
// 	};
// 	return AddToCartHOC;
// };
// export default withAddToCart;
