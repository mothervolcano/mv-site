import Link from "next/link";
import styles from "./ProjectHeader.module.css"
import { camptonLight, camptonBook, camptonMedium, camptonSemiBold, camptonBold } from "../styles/fonts";

interface ProjectHeaderProps {
	title: string;
	children: React.ReactNode;
}

export default function ProjectHeader(props: ProjectHeaderProps) {
	const {title, children} = props;

	return (
		<div className={styles.container}>
			<div className={styles.intro} style={{position: "relative"}}>
				<div style={{position:"absolute", top: "1rem", right: "0", textAlign: "end", border: "solid 1px black"}}>
					<Link
						href="/"
					>
						back
					</Link>
				</div>
				<h1 style={{fontFamily: camptonSemiBold.style.fontFamily}}>{title}</h1>
				<p style={{fontFamily: camptonBook.style.fontFamily}}>
					Drops of rain could be heard hitting the pane, which made him feel quite sad. "How about if I sleep a little bit longer and forget all this nonsense", he thought, but that was something he was unable to do because he was used to sleeping on his right, and in his present state couldn't get into that position. However hard he threw himself onto his right, he always rolled back to where he was.
				</p>
			</div>
			<div className={styles.content} style={{position: "relative", width: "100%", height: "100%"}}>
				{children}
			</div>	
		</div>
	)
}