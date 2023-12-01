import { Circle, Path, Point } from "../lib/topo/drawing/paperjs";

import Orbital from "./attractors/orbital";
import Spine from "./attractors/spine";
import OrbitalField from "./attractors/orbitalField";
import HyperPoint from "../lib/topo/core/hyperPoint";
import SpinalField from "./attractors/spinalField";
import { pull } from "../lib/topo/tools/stitcher";
import { IPath } from "../lib/topo/types";
import { convertToSegment } from "../lib/topo/utils/converters";

const DEBUG_GREEN = "#10FF0C";
const GUIDES = "#06E7EF";

const MODES: any = {
	SINE: "SINE",
	TRIANGLE: "TRIANGLE",
	SQUARE: "SQUARE",
	SAWTOOTH: "SAWTOOTH",
};

const mode = MODES.SINE;

let lineColor: paper.Color;


function envelopeAmp(i: number, nx: number, freq: number, nf: number) {
	const ix = i / (freq - 1);


	const f = Math.max(0.5-nf*0.1, 0.2)
	

	const d = f - Math.abs(nx - ix);
	// const d = 0.2 - Math.abs(nx - ix);

	// console.log(`enveloping step ${i}`, Math.sin(d))
	console.log('envelope', d)

	return Math.max(Math.sin(d), 0);
}

export function setStyle({ color }: { color: paper.Color }) {
	lineColor = color;
}

export function createSineWave(
	position: { x: number; y: number },
	length: number,
	frequency: number,
	amplitude: number,
	nx: number,
	nf: number
) {
	// ...
	const baseline = new SpinalField(new HyperPoint(position), length, "ALTERNATED");

	const amp = amplitude;
	const freq = frequency;

	const cycle = baseline.length / freq;
	const handleLength = mode === MODES.SINE ? (cycle / 4) * (5/3) : 0;

	const path: IPath = new Path({
		strokeColor: lineColor,
		strokeWidth: 1,
	});

	const spines = [];
	const curveLengths = [];

	for (let i = 0; i < freq; i++) {
		const ampFactor = envelopeAmp(i, nx, freq, nf);
		// console.log("ampFactor: ", ampFactor)
		const spine = new Spine(Math.max(amp * ampFactor, 1));
		spines.push(spine);
		// curveLengths.push(handleLength*(ampFactor*5 - ampFactor*5));
	}

	baseline.addAttractors(spines);

	// const compression = 0.20 * nx;

	// if ( nx > 0.5 ) {
	// 	baseline.compress(0 + 0.20*nx, 1);
	// } else {
	// 	baseline.compress(0, 1 - 0.20*nx);
	// }

	// baseline.compress(0.10, 0.90);

	// ------------------------------------------------

	const hpts1 = baseline.locate(1);
	const hpts0 = baseline.locate(0);

	let currPt = null;
	let prevPt = null;

	// const A = baseline.attractor.locate(0).scaleHandles(0)
	// const B = baseline.attractor.locate(1).scaleHandles(0)

	// path.add(A.getSegment());

	for (let i = 0; i < hpts1.length; i++) {
		currPt = hpts1[i];

		// const hLength = curveLengths[i] ? curveLengths[i] : handleLength;

		pull(currPt, handleLength);

		if (prevPt) {
			// curve( prevPt, currPt, 1/3, 1/3 );
		}

		if (mode === MODES.SINE) {
			// currPt.steer( 90*currPt.polarity, 180 ).flip();
			currPt.steer(90 * currPt.polarity).flip();
		}

		if (mode === MODES.SQUARE) {
			hpts0[i].scaleHandles(handleLength);
			path.add(convertToSegment(hpts0[i]));
		}

		if (currPt.point.x !== 0 && currPt.point.y !== 0) {
			path.add(convertToSegment(currPt));
		}

		prevPt = currPt;
	}

	// path.fullySelected = true;
}

export function createFlatLine(position: { x: number; y: number }, length: number) {
	const line = new Spine(length, new HyperPoint(position));

	const A = line.locate(0);
	const B = line.locate(1);

	const path = new Path({
		segments: [A.getSegment(), B.getSegment()],
		strokeColor: lineColor,
		strokeWidth: 1,
	});

	return path;
}
