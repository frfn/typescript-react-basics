import React, { useState, createContext, useContext } from "react";

/* -- Data for Context | this is how you type safe, yes you can create a shorter way. by default, but this is what must be done-- */
interface IAppStateValue {
	cart: {
		items: { id: number; name: string; price: number; quantity: number }[]; // object []
	};
}

const DefaultAppState: IAppStateValue = {
	cart: {
		items: [],
	},
};

/* -- Props, this can be deletd tbh, just for me to see -- */
interface Props {
	children?: React.ReactNode; // copied from hovering over "props"
}

// 1. the cart context, giving it structure
export const AppStateContext = createContext(DefaultAppState);

// 1. the setCart, giving it the type is should receive
export const AppSetStateContext = createContext<
	React.Dispatch<React.SetStateAction<IAppStateValue>> | undefined
>(undefined);

// 3. Custom Hook | outsourced so it is less bloated in FoodCard.tsx & to check if it is undefined!
export const useSetState = () => {
	// the useContext, FILLS in the information from the createContext.
	// at first it is undefined, but when given the value at the bottom, it WILL HAVE a value

	// AppSetStateContext.Provider value={setState} gives the `value` of setState
	// when using useSetState in FoodCard.tsx, it WILL be the setState function because the component is WRAPPED with the provider

	// this here just gives it a structure, the provider down below gives it its value

	// when useContext is called, useContext is going to retreive the value from the .Provider and FILL IN this structure, giving the createContext the setState function
	const setState = useContext(AppSetStateContext);
	if (!setState) {
		throw new Error(
			"useSetState was called outside of AppSetStateContext provider"
		);
	}

	// and being able to return the function if it is not undefined.
	return setState;
};

// 2. the component that will provide the context with data
const AppStateProvider: React.FC<Props> = ({ children }) => {
	// state is an object => {cart: {items: [] } }
	const [state, setState] = useState(DefaultAppState);

	return (
		// cart is used in App.tsx | setCart is used in FoodCard.tsx
		<AppStateContext.Provider value={state}>
			<AppSetStateContext.Provider value={setState}>
				{children}
			</AppSetStateContext.Provider>
		</AppStateContext.Provider>
	);
};

export default AppStateProvider;

/* 

1. React.FC takes in an object by default, it can have a prop argument!
`const mockFnComponent: React.FC = (props) => ( <div> Hi </div> );`

2. useState is a `generic` | by using the DefaultAppState, TS can infer that it is of type IAppStateValue
`const [cartZero, setCartZero] = useState<IAppStateValue>(undefined);`

*/
