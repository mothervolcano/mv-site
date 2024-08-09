import ProjectHeader from "@/app/components/ProjectHeader";
import ProjectTopic from "@/app/components/ProjectTopic";

type BlockAligment = "left" | "right";

const content = [
	{
		title: "Isotopo",
		text: "He felt a slight itch up on his belly; pushed himself slowly up on his back towards the headboard so that he could lift his head better.",
		alignment: "right" as BlockAligment,
	},
];

export default function Page() {
	return (
		<>
			<ProjectHeader title="Careem Iconography">
				<div>Header image goes here</div>
			</ProjectHeader>
			<ProjectTopic
				title={content[0].title}
				text={content[0].text}
				alignment={content[0].alignment}
			>
				<div>
					Topic image goes here
				</div>
			</ProjectTopic>
		</>
	);
}
