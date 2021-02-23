import React, { createContext, useState } from "react";

/* -- Data for Context | this is how you type safe, yes you can create a shorter way. by default, but this is what must be done-- */
interface IAppStateValue {
	cart: {
		items: { name: string; price: number }[]; // object []
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

// 1. the context
export const AppStateContext = createContext(DefaultAppState);

// 2. the component that will provide the context with data
const AppStateProvider: React.FC<Props> = ({ children }) => {
	const [cart, setCart] = useState(DefaultAppState);

	return (
		<AppStateContext.Provider value={cart}>
			{children}
		</AppStateContext.Provider>
	);
};

export default AppStateProvider;

/* 

1. React.FC takes in an object by default, it can have a prop argument!
`const mockFnComponent: React.FC = (props) => ( <div> Hi </div> );`

2. useState is a `generic` | by using the DefaultAppState, TS can infer that it is of type IAppStateValue
`const [cartZero, setCartZero] = useState<IAppStateValue>();`

*/
