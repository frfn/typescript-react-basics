import React, {
	useReducer /* useState */,
	createContext,
	useContext,
	useEffect,
} from "react";

/* -- Interface for Context -- */
interface CartItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
}

interface IAppStateValue {
	cart: {
		items: CartItem[]; // object []
	};
}

/* -- created an obj of type IAppStateValue -- */
const DefaultAppState: IAppStateValue = {
	cart: {
		items: [],
	},
};

/* -- Props, this can be deletd tbh, just for me to see -- */
interface Props {
	children?: React.ReactNode; // copied from hovering over "props"
}

/* ---------------------------------------- */
/* 1. the cart context, giving it structure */
/* ---------------------------------------- */
export const AppStateContext = createContext(DefaultAppState);

/* ------------------------------------------------------------------------------------ */
/* 1. the setCart, giving it the type is should receive | you can add more actions here */
/* ------------------------------------------------------------------------------------ */
export const AppDispatchContext /* AppSetStateContext */ = createContext<
	| React.Dispatch<AddToCartAction | InitializeCartAction>
	/* React.Dispatch<React.SetStateAction<IAppStateValue>>, not anymore since useState is not used */
	| undefined
>(undefined);

/* ------------------------------------------------------------------------------------------------ */
/* 3. Custom Hook | outsourced so it is less bloated in FoodCard.tsx & to check if it is undefined! */
/* ------------------------------------------------------------------------------------------------ */
export const useStateDipatch /* useSetState */ = () => {
	// the useContext, FILLS in the information for createContext.
	// at first it is undefined, but when given the value with Provider programmed at the bottom, it WILL HAVE a value

	// AppSetStateContext.Provider value={setState} gives the `value` of dispatch
	// when using useStateDispatch in FoodCard.tsx, it WILL be the useStateDispatch function because the component is WRAPPED with the provider

	// this here just gives it a structure, the provider down below gives it its value

	// when useContext is called, useContext is going to retreive the value from the .Provider and FILL IN this structure, giving the createContext the setState function
	const dispatch = useContext(AppDispatchContext);
	if (!dispatch) {
		throw new Error(
			"useSetState was called outside of AppDispatchContext provider"
		);
	}

	// and being able to return the function if it is not undefined.
	return dispatch;

	// this will be FILLED in IF this custom is called in a component that is wrapped with the Provider component!
};

/* ------------ */
/*  4. Reducer  */
/* ------------ */
// what's here --V
interface Action<T> {
	type: T; // <-- goes here
}

// since we pass ADD_TO_CART for the T argument, that must be the type
// for AddToCartAction, to initialize it, it must contain type & payload
/* 
{
	type: "ADD_TO_CART",
}	payload: { items: { ... } }
*/
interface AddToCartAction extends Action<"ADD_TO_CART"> {
	payload: {
		item: CartItem;
		//Omit<CartItem,"quantity">; /* | '...' , union to omit more props! */
	};
}

interface InitializeCartAction extends Action<"INITIALIZE_CART"> {
	payload: {
		cart: IAppStateValue["cart"]; // === cart: { items: CartItem[]; }
	};
}

// adding more than one action? Use a union!
export const reducer = (
	state: IAppStateValue,
	action: InitializeCartAction | AddToCartAction
) => {
	switch (action.type) {
		case "INITIALIZE_CART":
			const newState = { cart: action.payload.cart };

			return { ...state, ...newState };

		// if case "ADD_TO_CART", either create a new obj and put in array or update obj quantity
		case "ADD_TO_CART":
			// creating a variable to easily handle the object
			const itemToAdd = action.payload.item;

			// checking to see if items exist in the array
			const itemExists = state.cart.items.find(
				(item) => item.id === itemToAdd.id
			);

			// updating state immutably
			return {
				// this long hand approach deeply copies the object
				...state,
				cart: {
					...state.cart,
					// don't get confused, the ternary expression RETURNS an array which is expected
					items: itemExists
						? // MAP returns a new array
						  state.cart.items.map((item) => {
								// if the itemToAdd is in the array, just update the quantity and one
								if (item.id === itemToAdd.id) {
									return {
										...item, // unpack and copy current props and values
										quantity: item.quantity + 1,
									};
								}

								// if not the item we're looking for, just return and move on to the next without touching the obj
								return item;
						  })
						: // this is _already_ an array |
						  [
								...state.cart.items,
								itemToAdd,
								// you can't do .push() because it is incompatible with the structure, in normal ReactJS, it is possible, but we're in TS

								// it is settled in onAddToCart() in FoodCard.tsx | but ath the end, this is the solution he came up with

								/* {
									...itemToAdd,
									quantity: 1,
								}, */
						  ],
				},
			};

		// just returns if no cases
		default:
			return state;
	}
};

/* -------------------------------------------------------- */
/* 2. the component that will provide the context with data */
/* -------------------------------------------------------- */
const AppStateProvider: React.FC<Props> = ({ children }) => {
	// state is an object => {cart: {items: [] } }
	const [state, dispatch /* setState */] = useReducer(
		reducer,
		DefaultAppState
	); /* useState(DefaultAppState); */

	/* -------------------------------------------------------------------------------------------------- */
	/* 5. useEffect & local storage | the order of the useEffect is VERY IMPORTANT, not ordered, no data! */
	/* -------------------------------------------------------------------------------------------------- */

	// if 2. is called first, it sets the data to an EMPTY cart

	// 1. loads the existing cart first!
	useEffect(() => {
		const existingCart = localStorage.getItem("cart");
		if (existingCart) {
			dispatch({
				type: "INITIALIZE_CART",
				payload: {
					// parsing is needed since the item is JSON stringified!
					cart: JSON.parse(existingCart),
				},
			});
		}
	}, []); // only render once, componentDidMount()

	// 2. if cart changes then rewrites the cart!!
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(state.cart));
	}, [state.cart]); // only rerender when state.cart is changed, componentDidUpdate()

	return (
		// cart is used in App.tsx | setCart is used in action.payloadCitems.ard.tsx
		<AppStateContext.Provider value={state}>
			<AppDispatchContext.Provider value={dispatch}>
				{children}
			</AppDispatchContext.Provider>
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
