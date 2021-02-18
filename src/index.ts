export default class A {
	name = "Flexer Fadrigalan";
}

const printThis = (someArg: string): void => {
	console.log(someArg);
};

printThis(new A().name);
