"use client";

import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import Logo from "./logo";

export default function Navbar() {
	const pathName = usePathname();

	return (
		<nav>
			<Logo
				className={`${styles.logo} ${
					pathName === "/" ? styles.logoBig : styles.logoSmall
				}`}
			/>
		</nav>
	);
}
