"use client";

import styles from "./page.module.css";
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
		alignment: "right" as BlockAligment,
	},
];

// -------------------------------
// SKETCH CODE

export default function Page() {
	const [initialized, setInitialized] = useState(false);
	const [viewportClicked, setViewportClicked] = useState(false);

	const clickHandler = () => {
		console.log("!! viewport clicked");
		setViewportClicked(true);
	};

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
					<div
						style={{ width: "100%", height: "100%" }}
						
					>
						<div
							onClick={clickHandler}
							style={{
								position: "absolute",
								zIndex: "100",
								top: "0",
								left: "0",
								width: "100%",
								height: "100%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								pointerEvents: viewportClicked
										? "none"
										: "auto",
							}}
						>
							<div
								className={styles["overlay-instructions"]}
								style={{
									transition: "opacity 600ms",
									opacity: viewportClicked ? "0" : "1",
								}}
							>
								Zoom and pan
							</div>
						</div>
						<div
							style={{
								width: "100%",
								height: "100%",
								zIndex: "10",
							}}
						>
							<DZIViewer tileSources={dzi_gameworld} />
						</div>
					</div>
				)}
			</ProjectHeader>
			<ProjectTopic
				title={content[0].title}
				text={content[0].text}
				alignment={content[0].alignment}
			>
				<video width="100%" autoPlay loop>
					<source src="/video/oscill-demo.mp4" type="video/mp4" />
					Your browser does not support the video tag
				</video>
			</ProjectTopic>
		</>
	);
}
