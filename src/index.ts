// you will need React.DOM to output components

/* for now, console logging is perfect! */
export default class A {
	name = "Flexer Fadrigalan";
}

const printThis = (someArg: string): void => {
	console.log(someArg);
};

printThis(new A().name);
