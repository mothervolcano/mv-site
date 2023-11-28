import { Circle, Path, Point } from "../lib/topo/drawing/paperjs";

import Orbital from "./attractors/orbital";
import Spine from "./attractors/spine";
import OrbitalField from "./attractors/orbitalField";
import HyperPoint from "../lib/topo/core/hyperPoint";
import SpinalField from "./attractors/spinalField";

function envelope( i: number, axis: number) {

}

export function createSineWave(position: { x: number; y: number }, length: number, freq: number, amp: number, axis: number): SpinalField {
	// ...
	const field = new SpinalField(new HyperPoint(position), length);

	const atts = [];

	for (let i = 0; i < freq; i++) {

		// const len = i === axis ? length/12 : length/25;
		const att = new Spine(amp);
		atts.push(att);
	}

	field.addAttractors(atts);



	return field;
}
