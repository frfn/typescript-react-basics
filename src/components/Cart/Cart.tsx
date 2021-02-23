import React, { useContext } from "react";
import styles from "./Cart.module.css";

// react icons
import { FiShoppingBag } from "react-icons/fi";

// Context API
import { AppStateContext } from "../../context/AppState";

// 1. props interface
interface Props {
	// cart: Items /* I didn't do this correctly before, this is why it's here */
}

/* for above! cart prop will take this in! */
// interface Items {
// 	items: {id: number, name: string, price: number}[]
// }

// 2. state interface
interface State {
	isOpen: boolean;
}

// 3. creation of class component, take note of the argument Props, State
class Cart extends React.Component<Props, State> {
	// constructor `state` vs just `state`
	constructor(props: Props) {
		super(props);

		this.state = {
			isOpen: false,
		};

		// this.toggleIsOpen = this.toggleIsOpen.bind(this); /* good to know, if function is NOT an arrow function, you have to use .bind(this) to bind the function to THIS component! */
	}

	// if toggleIsOpen(event?: MouseEvent) { .. you must .bind(this)}

	// ECMAScript class field feature, Arrow Function, `this` keyword is binded automatically to the toggleIsOpen function
	toggleIsOpen = (
		event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		// make it really specific, type safe
		if ((event?.target as HTMLElement).nodeName === "BUTTON") {
			console.log("Hi!");
		}

		this.setState((prevState) => {
			return {
				...prevState,
				isOpen: !prevState.isOpen,
			};
		});
	};

	// useContext for cart object, so you don't have to use the <AppStateContext.Consumer>{(context) => { JSX }}<AppStateContext.Consumer>
	static contextType = AppStateContext;

	render() {
		let content = "Empty Cart";

		// if there is a cart object
		if (this.context.cart.items) {
			// logic to add the sum of pizza
			const sumOfPizza = this.context.cart.items.reduce(
				(
					accumulator: number,
					currValue: { quantity: number }
				): number => {
					return accumulator + currValue.quantity; // accumulator starts at the initial value
				},
				0
			);

			// if the item array length >= 1 else, content stays "Empty Cart"
			if (sumOfPizza >= 1) {
				content =
					// if it is greater than 1, content = .length + " Pizzas" else .length + " Pizza"
					sumOfPizza > 1
						? sumOfPizza + " Pizzas"
						: sumOfPizza + " Pizza";
			}
		}

		return (
			<div className={styles["cart-container"]}>
				<button
					onClick={(e) => this.toggleIsOpen(e)}
					className={styles["cart-container__button"]}
					type="button"
				>
					<FiShoppingBag />
					<span style={{ paddingLeft: "10px" }}>{content}</span>
				</button>
				{this.state.isOpen && (
					<div className={styles["cart-container__cart-drop-down"]}>
						<ul>
							{/* we have to explicitly typesafe item because we used the static contextType approach */}
							{this.context.cart.items.length > 0 ? (
								this.context.cart.items.map(
									(item: {
										id: number;
										name: string;
										price: number;
										quantity: number;
									}) => {
										return (
											<li key={item.id}>
												<div>
													{item.name} – $
													{item.price.toFixed(2)}
												</div>

												<div>
													&times;{" "}
													{item.quantity &&
														`${item.quantity}`}
												</div>
											</li>
										);
									}
								)
							) : (
								<li style={{ justifyContent: "center" }}>
									Empty Cart! Please add food!
								</li>
							)}
						</ul>
					</div>
				)}
			</div>
		);
	}
}

export default Cart;
