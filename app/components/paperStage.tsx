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

const PaperStage = ({ canvasRef, width, height, onMouseMove, onResize }: any) => {
	// ...
	const containerRef = useRef<HTMLDivElement>(null);
	const size = useSize(containerRef);
	const [mousePos, setMousePos] = useMousePosition();

	useEffect(() => {
		// Update canvas size based on parent size
		if (canvasRef.current && size) {
			canvasRef.current.width = size.width;
			canvasRef.current.height = size.height;
			// paperScope.project.view.viewSize = new paperScope.Size(size.width, size.height);
			onResize(size.width, size.height);
		}
	}, [size]);

	if (canvasRef.current) {
		onMouseMove(mousePos);
	}

	return (
		<div style={{ width: "100%", height: "100%" }} ref={containerRef}>
			<canvas
				// style={{ zIndex: "1", position: "relative", width: `${width}px`, height: `${height}px` }}
				style={{ zIndex: "1", position: "relative", width: "100%", height: "100%" }}
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
