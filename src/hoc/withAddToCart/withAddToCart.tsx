import React from "react";
import { useStateDipatch } from "../../context/AppState";
import { CartItem } from "../../context/AppState";

export interface withAddToCartProps {
	onAddToCart?: (item: CartItem) => void;
}

/* ------------------------------------------------------------------------------ */
/*   HoC Component | Wraps a component and gives it onAddToCart() functionality   */
/* ------------------------------------------------------------------------------ */
// the original props will be passed in when this HoC is used! <iAmAGenericArgument>
function withAddToCart<OriginalProps>(
	// React.ComponentType takes in an argument! ChildComponent must take a an argument!
	ChildComponent: React.ComponentType<OriginalProps>
) {
	const AddToCartHOC = (props: OriginalProps) => {
		const dispatch = useStateDipatch();

		//
		const onAddToCart = (item: CartItem) => {
			dispatch({
				type: "ADD_TO_CART",
				// this works because the item is of type CartItem!
				payload: {
					item,
				},
			});
		};

		return (
			<div>
				<ChildComponent {...props} onAddToCart={onAddToCart} />
			</div>
		);
	};

	return AddToCartHOC;
}

export default withAddToCart;

/* -------------------------------------------------------------- */
/* you MUST use `extends` if you want to write a generic arrow fn */
/* -------------------------------------------------------------- */
// const withAddToCart = <OriginalProps extends {}>(ChildComponent: React.ComponentType) => {
// 	const AddToCartHOC = (props) => {
// 		<div>
// 			<ChildComponent />
// 		</div>;
// 	};
// 	return AddToCartHOC;≤≤≤≤
// };
// export default withAddToCart;
