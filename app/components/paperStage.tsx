"use client";

declare const paper: any;

import { useRef, useEffect, useLayoutEffect, useState } from "react";

import useResizeObserver from "@react-hook/resize-observer";

import useMousePosition from "../hooks/useMousePosition";

const useSize = (target: any): any => {
	const [size, setSize] = useState();

	useLayoutEffect(() => {
		setSize(target.current.getBoundingClientRect());
	}, [target]);

	useResizeObserver(target, (entry: any) => setSize(entry.contentRect));

	return size;
};

const PaperStage = ({ canvasRef, onMouseMove, onResize }: any) => {
	// ...
	const containerRef = useRef<HTMLDivElement>(null);
	const size = useSize(containerRef);
	const [mousePos, setMousePos] = useMousePosition();

	useEffect(() => {

		const dpr = window.devicePixelRatio;

		// console.log('dpr', dpr)
		// Update canvas size based on parent size
		if (canvasRef.current && size) {
			canvasRef.current.width = size.width*dpr;
			canvasRef.current.height = size.height*dpr;
			const ctx = canvasRef.current.getContext("2d");
			ctx.scale(dpr, dpr);
			onResize({width: size.width, height: size.height});
		}
	}, [size]);

	if (canvasRef.current) {
		onMouseMove(mousePos);
	}

	const canvasWidth = size?.width ? `${size.width}px` : `100%`;
	const canvasHeight = size?.height ? `${size.height}px` : `100%`;

	return (
		<div style={{ width: "100%", height: "100%" }} ref={containerRef}>
			<canvas
				// style={{ zIndex: "1", position: "relative" }}
				style={{ zIndex: "1", position: "relative", width: canvasWidth, height: canvasHeight }}
				ref={canvasRef}
				// onClick={(e) => {
				// 	setMousePos(e as unknown as MouseEvent);
				// 	onMouseClick(mousePos);
				// }}
			></canvas>
		</div>
	);
};

export default PaperStage;
