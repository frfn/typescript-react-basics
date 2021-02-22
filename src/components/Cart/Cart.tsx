import React from "react";
import styles from "./Cart.module.css";

// import {} from 'react-icons'

interface Props {}

interface State {
	isOpen: boolean;
}

class Cart extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			isOpen: false,
		};
	}

	render() {
		return (
			<div className={styles["cart-container"]}>
				<button
					className={styles["cart-container__button"]}
					type="button"
				>
					2 Pizza(s)
				</button>
				<div className={styles["cart-container__cart-drop-down"]}>
					<ul>
						<li>Pizza 1</li>
						<li>Pizza 2</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default Cart;
