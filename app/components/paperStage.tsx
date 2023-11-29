"use client";

declare const paper: any;

import useMousePosition from "../hooks/useMousePosition";

const PaperStage = ({ canvasRef, width, height, onMouseMove}: any) => {
	// ...
	const [mousePos, setMousePos] = useMousePosition();

	if (canvasRef.current) {
		onMouseMove(mousePos);
	}

	return (
		<canvas
			style={{ zIndex: "1", position: "relative", width: `${width}px`, height: `${height}px` }}
			ref={canvasRef}
			// onClick={(e) => {
			// 	setMousePos(e as unknown as MouseEvent);
			// 	onMouseClick(mousePos);
			// }}
		></canvas>
	);
};

export default PaperStage;
