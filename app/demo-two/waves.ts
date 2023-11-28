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

function envelope(i: number, axis: number) {}

export function createFlatLine(position: { x: number; y: number },
	length: number) {

	const line = new Spine(length, new HyperPoint(position));

	const A = line.locate(0)
	const B = line.locate(1);

	const path = new Path({
		segments: [A.getSegment(), B.getSegment()],
		strokeColor: DEBUG_GREEN,
		strokeWidth: 2
	})
}

export function createSineWave(
	position: { x: number; y: number },
	length: number,
	freq: number,
	amp: number,
	axis: number,
): SpinalField {
	// ...
	const baseline = new SpinalField(new HyperPoint(position), length, "ALTERNATED");

	const cycle = baseline.length / freq;
	const handleLength = ((cycle / 4) * 5) / 3;

	const path = new Path({
		strokeColor: DEBUG_GREEN,
		strokeWidth: 2,
	});

	const spines = [];

	for (let i = 0; i < freq; i++) {
		// const len = i === axis ? length/12 : length/25;
		const spine = new Spine(amp);
		spines.push(spine);
	}

	baseline.addAttractors(spines);

	// ------------------------------------------------

	const hpts1 = baseline.locate(1);
	const hpts0 = baseline.locate(0);

	let currPt = null;
	let prevPt = null;

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

		path.add(currPt.getSegment());

		prevPt = currPt;
	}

	return baseline;
}
