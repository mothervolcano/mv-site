import { Circle, Path, Point } from "../lib/topo/drawing/paperjs";

import Orbital from "./attractors/orbital";
import Spine from "./attractors/spine";
import OrbitalField from "./attractors/orbitalField";
import HyperPoint from "../lib/topo/core/hyperPoint";
import SpinalField from "./attractors/spinalField";
import { pull } from "../lib/topo/tools/stitcher";

const DEBUG_GREEN = "#10FF0C";
const GUIDES = "#06E7EF";

const MODES: any = {
	SINE: "SINE",
	TRIANGLE: "TRIANGLE",
	SQUARE: "SQUARE",
	SAWTOOTH: "SAWTOOTH",
};

const mode = MODES.SINE;

function envelopeAmp(i: number, nx: number, freq: number) {

	const ix = i/(freq-1)

	const d = 0.50-Math.abs(nx - ix);

	console.log(`enveloping step ${i}`, Math.sin(d))

	return Math.sin(d);

}

export function createSineWave(
	position: { x: number; y: number },
	length: number,
	freq: number,
	amp: number,
	nx: number,
): SpinalField {
	// ...
	const baseline = new SpinalField(new HyperPoint(position), length, "ALTERNATED");

	const cycle = baseline.length / freq;
	const handleLength = ((cycle / 4) * 5) / 3;

	const path = new Path({
		strokeColor: 'black',
		strokeWidth: 1,
	});

	const spines = [];

	for (let i = 0; i < freq; i++) {

		const ampFactor = envelopeAmp(i, nx, freq);
		// const len = i === axis ? length/12 : length/25;
		const spine = new Spine(Math.max(amp*ampFactor, 1));
		spines.push(spine);
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

		if (mode === MODES.SINE) {
			// currPt.steer( 90*currPt.polarity, 180 ).flip();
			currPt.steer(90 * currPt.polarity).flip();
		}

		pull(currPt, handleLength);

		if (prevPt) {
			// curve( prevPt, currPt, 1/3, 1/3 );
		}

		// hpt.scaleHandles( handleLength ).clearGuides();

		if (mode === MODES.SQUARE) {
			hpts0[i].scaleHandles(handleLength);

			path.add(hpts0[i].getSegment());
		}

		// markPoint( hpt.point );
		// traceSegment( hpt.getSegment() );

		if (currPt.point.x !== 0 && currPt.point.y !== 0) {
			path.add(currPt.getSegment());
		}


		prevPt = currPt;
	}

	// path.add(B.getSegment());

	// path.fullySelected = true;

	return baseline;
}

export function createFlatLine(position: { x: number; y: number },
	length: number) {

	const line = new Spine(length, new HyperPoint(position));

	const A = line.locate(0)
	const B = line.locate(1);

	const path = new Path({
		segments: [A.getSegment(), B.getSegment()],
		strokeColor: 'black',
		strokeWidth: 1
	})
}
