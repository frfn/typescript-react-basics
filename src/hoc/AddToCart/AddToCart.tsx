import React from "react";

function withAddToCart<OriginalProps>(
	// the first argument is a React Component | adding the OriginalProps generic extends this component type, meaning you must incude {...props} inside the wrapped component

	// just learn it for now. and besides, that's how you pass props in anyways.
	ChildComponent: React.ComponentType<OriginalProps>
) {
	const AddToCartHOC = (props: OriginalProps) => {
		<div>
			<ChildComponent {...props} />
		</div>;
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
// 	return AddToCartHOC;
// };
// export default withAddToCart;
