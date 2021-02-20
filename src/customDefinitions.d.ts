declare module "*.css" {
	const css: { [key: string]: string };
	export default css;
}

// svgr transforms SVGs to React component
declare module "*.svg" {
	const ReactComponent: React.ComponentType<React.SVGAttributes<SVGElement>>;
	export default ReactComponent;
}
