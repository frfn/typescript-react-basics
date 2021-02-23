import React from "react";
import styles from "./Toolbar.module.css";

// Props
interface Props {
	navigations: Navigations;
}

// an object
interface Navigation {
	link: string;
	title: string;
}

// an array of object
type Navigations = Navigation[];

const Toolbar: React.FC<Props> = ({ navigations }) => {
	return (
		<div className={styles["toolbar-container"]}>
			<ul className={styles["toolbar-container__ul"]}>
				{navigations.map((navLink) => {
					return (
						<li
							key={navLink.title}
							className={styles["toolbar-container__li"]}
						>
							<a
								className={styles["toolbar-container__a"]}
								href={navLink.link}
							>
								{navLink.title}
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Toolbar;
