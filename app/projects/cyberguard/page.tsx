"use client";

import Script from "next/script";
import { useState } from "react";
import ProjectHeader from "@/app/components/ProjectHeader";
import DZIViewer from "@/app/components/DZIViewer";
import ProjectTopic from "@/app/components/ProjectTopic";

const dzi_gameworld = {
	Image: {
		xmlns: "http://schemas.microsoft.com/deepzoom/2008",
		Url: "/dzi/gameworld_files/",
		Format: "jpeg",
		Overlap: "1",
		TileSize: "254",
		Size: {
			Width: "15000",
			Height: "19000",
		},
	},
};

type BlockAligment = "left" | "right";

const content = [
	{
		title: "Isotopo",
		text: "He felt a slight itch up on his belly; pushed himself slowly up on his back towards the headboard so that he could lift his head better.",
		alignment: "right" as BlockAligment
	}
]

export default function Page() {
	const [initialized, setInitialized] = useState(false);

	return (
		<>
			<Script
				src="//openseadragon.github.io/openseadragon/openseadragon.min.js"
				onReady={() => {
					setInitialized(true);
				}}
			/>
			<ProjectHeader title="CyberGuard">
				{initialized && (
					<DZIViewer 
						tileSources={dzi_gameworld}
					/>
				)}
			</ProjectHeader>
			<ProjectTopic
				title={content[0].title}
				text={content[0].text}
				alignment={content[0].alignment}
			>
				<video 
					width="100%"
					autoPlay
					loop
				>
					<source src="/video/oscill-demo.mp4" type="video/mp4"/>
					Your browser does not support the video tag
				</video>
			</ProjectTopic>
		</>
	);
}
