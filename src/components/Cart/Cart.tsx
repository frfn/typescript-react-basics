import React from "react";
import styles from "./Cart.module.css";

// react icons
import { FiShoppingBag } from "react-icons/fi";

// 1. props interface
interface Props {}

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
	): void | undefined => {
		// console.log(event);

		// make it really specific, type safe
		if ((event?.target as HTMLElement).nodeName === "BUTTON") {
			console.log("Hi!");
		}

		this.setState((prevState) => {
			return {
				isOpen: !prevState.isOpen,
			};
		});
	};

	render() {
		return (
			<div className={styles["cart-container"]}>
				<button
					onClick={(e) => this.toggleIsOpen(e)}
					className={styles["cart-container__button"]}
					type="button"
				>
					<FiShoppingBag />
					<span style={{ paddingLeft: "10px" }}>2 Pizza(s)</span>
				</button>
				{this.state.isOpen && (
					<div className={styles["cart-container__cart-drop-down"]}>
						<ul>
							<li key={"1"}>Pizza 1</li>
							<li key={"2"}>Pizza 2</li>
						</ul>
					</div>
				)}
			</div>
		);
	}
}

export default Cart;
