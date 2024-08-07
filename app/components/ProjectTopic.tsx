import styles from "./ProjectTopic.module.css"

interface ProjectTopicProps {
	title: string;
	text: string;
	alignment: "left" | "right";
	children: React.ReactNode;
}


export default function ProjectTopic(props: ProjectTopicProps) {
	const {title, text, alignment, children} = props;
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{children}
			</div>
			<div className={styles.description}>
				<h2>{title}</h2>
				<p>{text}</p>
			</div>
		</div>
	)
}