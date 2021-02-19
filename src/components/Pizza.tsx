import React from "react";

// 1. name the props that will be passed in
interface Props {
	pizza: Pizza; // Pizza should have id, name, description, price
}

// 2. for each prop passed in, what does it contain
interface Pizza {
	id: number; // used for key
	name: string;
	description: string;
	price: number;
}

const Pizza: React.FC<Props> = ({ pizza }) => {
	return (
		<li>
			<h2>{pizza.name}</h2>
			<p>{pizza.description}</p>
			<p>{pizza.price}</p>
		</li>
	);
};

export default Pizza;
