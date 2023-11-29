"use client";

declare const paper: any;

import styles from "../page.module.css";

import { useRef, useEffect, useState } from "react";

// import { useViewportSize } from "@mantine/hooks";
import useMousePosition from "../hooks/useMousePosition";

// const onViewportChange = (width: number, height: number) => {
// 	console.log(`! viewport changed: width: ${width} height: ${height}`);
// };

const PaperStage = ({ canvasRef, width, height, onMouseMove}: any) => {
	// ...
	const [mousePos, setMousePos] = useMousePosition();
	// const { width, height } = useViewportSize();

	if (canvasRef.current) {
		onMouseMove(mousePos);
	}

	// console.log("MOUNTING PAPERSTAGE!");

	// const canvasWidth = width ? `${width}px` : "100%";

	// onViewportChange(width, height);

	return (
		<canvas
			style={{ backgroundColor: "green", position: "relative", width: `${width}px`, height: `${height}px` }}
			ref={canvasRef}
			// onClick={(e) => {
			// 	setMousePos(e as unknown as MouseEvent);
			// 	onMouseClick(mousePos);
			// }}
		></canvas>
	);
};

export default PaperStage;
