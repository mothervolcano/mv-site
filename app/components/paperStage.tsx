"use client";

declare const paper: any;

import { useRef, useEffect, useState } from "react";
import Script from "next/script";

import useMousePosition from "../hooks/useMousePosition";

const PaperStage = ({ onPaperLoad, onMouseClick, onMouseMove }: any) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [mousePos, setMousePos] = useMousePosition();
	
	if (canvasRef.current) {
		onMouseMove(mousePos);
	}

	return (
		<>
			<canvas
				style={{ position: "relative", width: "100%", height: "100%" }}
				ref={canvasRef}
				onClick={(e) => {
					setMousePos(e as unknown as MouseEvent);
					onMouseClick(mousePos);
				}}
			></canvas>

			<Script
				src="../../lib/paper/paper-core.js"
				onReady={() => {
					console.log(`Paperjs is ready! --> ${paper}`);

					paper.install(window);
					paper.setup(canvasRef.current);
					onPaperLoad(true);

					// const path = new paper.Path.Circle({ center: paper.view.center, radius: 50, fillColor: 'black'})
				}}
			/>
		</>
	);
};

export default PaperStage;
