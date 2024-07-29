"use client";

declare const OpenSeadragon: any;

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const duomo = {
	Image: {
		xmlns: "http://schemas.microsoft.com/deepzoom/2008",
		Url: "//openseadragon.github.io/example-images/duomo/duomo_files/",
		Format: "jpg",
		Overlap: "2",
		TileSize: "256",
		Size: {
			Width: "13920",
			Height: "10200",
		},
	},
};

const dzi_porto = {
	Image: {
		xmlns: "http://schemas.microsoft.com/deepzoom/2008",
		Url: "/dzi/porto_files/",
		Format: "jpeg",
		Overlap: "1",
		TileSize: "256",
		Size: {
			Width: "3024",
			Height: "4032",
		},
	},
};

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

export default function Page() {
	const [initialized, setInitialized] = useState(false);
	const viewerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (initialized) {
			const viewer = OpenSeadragon({
				id: "main-viewer",
				prefixUrl: "//openseadragon.github.io/openseadragon/images/",
				tileSources: dzi_gameworld,
				showNavigator: false,
			});
			console.log("Openseadragon library loaded!");
		}
	}, [initialized]);

	return (
		<>
			<Script
				src="//openseadragon.github.io/openseadragon/openseadragon.min.js"
				onReady={() => {
					setInitialized(true);
				}}
			/>
			<h1>CyberGuard Project</h1>
			<div
				ref={viewerRef}
				id="main-viewer"
				style={{
					position: "relative",
					width: "100%",
					height: "75%",
				}}
			></div>
		</>
	);
}
