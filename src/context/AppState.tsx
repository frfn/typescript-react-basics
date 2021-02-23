import React, { createContext, useState, useContext } from "react";

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

/* -- Props -- */
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
	const setState = useContext(AppSetStateContext);
	if (!setState) {
		throw new Error(
			"useSetState was called outside of AppSetStateContext provider"
		);
	}

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
