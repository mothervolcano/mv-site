import { Circle, Path, Point } from "../lib/topo/drawing/paperjs";

import Orbital from "./attractors/orbital";
import Spine from "./attractors/spine";
import OrbitalField from "./attractors/orbitalField";
import HyperPoint from "../lib/topo/core/hyperPoint";
import SpinalField from "./attractors/spinalField";
import { pull, retract, scaleHandles } from "../lib/topo/tools/stitcher";
import { IPath } from "../lib/topo/types";
import { convertToSegment } from "../lib/topo/utils/converters";
import { degToRad } from "../lib/topo/utils/helpers";

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
let lineWeight: number = 1;  


function envelopeAmp(i: number, nx: number, freq: number, nf: number) {
	
	const ix = i / (freq - 1);
	const f = Math.max(0.5-nf*0.1, 0.2)
	// const d = 0.5 - Math.abs(nx - ix);
	const d = f - Math.abs(nx - ix);

	// return Math.max(Math.sin(d), 0);
	return Math.max(d, 0);
}

export function setStyle({ color }: { color: paper.Color }) {
	lineColor = color;
}

export function createSineWave(
	position: { x: number; y: number },
	length: number,
	frequency: number,
	amplitude: number,
	compression: number,
	nx: number,
	ny: number,
	nf: number
) {
	// ...
	const baseline = new SpinalField(new HyperPoint(position), length, "ALTERNATED");

	const amp = amplitude;
	const freq = Math.max(frequency, 2);


	const compressionAxis = nx;
	const compressionRange = 1 * (1-compression);
	// const compressionRange = 0.2 * (1-nf2);
	const compressionStart = Math.max(nx-compressionRange/2, 0)
	const compressionEnd = Math.min(nx+compressionRange/2, 1)
	
	const cycle = (baseline.length*(compressionRange)) / freq;
	const handleLength = mode === MODES.SINE ? (cycle / 4) * (5/3): 0;

	const spines = [];

	for (let i = 0; i < freq; i++) {
		const ampFactor = envelopeAmp(i, nx, freq, nf);
		// console.log("ampFactor: ", ampFactor)
		const spine = new Spine(Math.max(amp * ampFactor, 1));
		spines.push(spine);
	}

	baseline.addAttractors(spines);

	if ( compression > 0 ) {
		baseline.compress(compressionStart, compressionEnd);
	}


	// ------------------------------------------------

	const waveColor = new paper.Color(lineColor);
	waveColor.red = 1;

	const path: IPath = new Path({
		strokeColor: waveColor,
		// strokeWidth: lineWeight*(1-ny),
		strokeWidth: lineWeight,
	});

	const hpts1 = baseline.locate(1);
	const hpts0 = baseline.locate(0);

	let currPt = null;
	let prevPt = null;

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
			scaleHandles(hpts0[i], 0);
			path.add(convertToSegment(hpts0[i]));
		}

		if (currPt.point.x !== 0 && currPt.point.y !== 0) {
			path.add(convertToSegment(currPt));
		}

		prevPt = currPt;
	}

	// path.firstSegment.handleIn = null;
	// path.firstSegment.handleOut = null;

	// path.lastSegment.handleIn = null;
	// path.lastSegment.handleOut = null;

	if (compression > 0) {

		const A = baseline.attractor.locate(0);
		const B = baseline.attractor.locate(1)
		retract(A)
		retract(B)
		path.insert(0,convertToSegment(A));
		path.add(convertToSegment(B));
	}

	// path.fullySelected = true;
}

export function createFlatLine(position: { x: number; y: number }, length: number, ny: number): IPath {
	const line = new Spine(length, new HyperPoint(position));

	const A = line.locate(0);
	const B = line.locate(1);

	const path: IPath = new Path({
		segments: [convertToSegment(A), convertToSegment(B)],
		strokeColor: lineColor,
		// strokeWidth: lineWeight * (1-ny),
		strokeWidth: lineWeight,
	});

	return path;
}
