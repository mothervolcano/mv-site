import AttractorTopo from "@/app/lib/topo/core/attractorTopo";
import HyperPoint from "@/app/lib/topo/core/hyperPoint";
import { TopoPath } from "@/app/lib/topo/drawing/paperjs";
import { IHyperPoint, IPath, IPoint, TopoLocationData } from "@/app/lib/topo/types";


class Spine extends AttractorTopo {

	constructor(length: number, anchor?: IHyperPoint ) {

		const topoPath: IPath = new TopoPath()

		// console.log('SPINE: ', topoPath)

		super(topoPath, anchor);
		this.setLength(length);
		this.draw();
	}

	draw() {

		if (this.anchor) {

			this.topo.reset();
			const A: IPoint = this.anchor.point.subtract([this.length/2, 0]);
			const B: IPoint = this.anchor.point.add([this.length/2, 0]);
			this.topo.add(A,B);

			this.topo.visibility = false;

			// this.topo.strokeColor = new paper.Color("blue");
		}
	}

	configureAttractor() {

		if (this.field) {

			this.setOrientationDeterminator(this.field.determineOrientation)
			this.setSpinDeterminator(this.field.determineSpin)
			this.setPolarityDeterminator(this.field.determinePolarity)
		}
	}

	adjustToPosition() {

		if (this.determineOrientation(this.anchor.position)) {
			this.setAxisAngle(0);
		} else if (!this.determineOrientation(this.anchor.position)) {
			this.setAxisAngle(180);
		} else {
			throw new Error("POSSIBLY TRYING TO ANCHOR OUTSIDE OF FIELDs BOUNDS");
		}
	}

	adjustToSpin() {
		if (this.determineSpin(this.anchor.position)) {
			this.setSpin(1);
		} else if (!this.determineSpin(this.anchor.position)) {
			this.setSpin(-1);
		} else {
			throw new Error("POSSIBLY TRYING TO PLACE THE ATTRACTOR OUTSIDE OF FIELDs BOUNDS");
		}
	}

	adjustToPolarity() {
		// TODO
		this.setPolarity(1);
	}

	// at is provided by attractors that have paths that are non-linear ie. the input location doesn't match the mapped location.
	createAnchor({ point, tangent, normal, curveLength, pathLength, at }: TopoLocationData): IHyperPoint {
		const factor = [0, 0.25, 0.5, 0.75].includes(at) ? 1 / 3 : curveLength / pathLength;

		const hIn = tangent.multiply(curveLength * factor).multiply(-1);
		const hOut = tangent.multiply(curveLength * factor);

		const anchor = new HyperPoint(point, hIn, hOut);

		anchor.position = at;
		anchor.tangent = tangent.multiply(this.spin); // HACK: because the path is flipped using scale() the vectors need to be inverted
		anchor.normal = normal.multiply(this.spin);
		anchor.spin = this.spin;
		anchor.polarity = this.polarity;

		return anchor;
	}

	getTopoLocationAt(at: number): TopoLocationData {

		if ( !this.topo ) {

			throw new Error(`ERROR @Spine.getTopoLocationAt(${at}) ! Topo path is missing`)
		}

		const loc = this.topo.getLocationAt(this.topo.length * at);

		return {
			point: loc.point,
			tangent: loc.tangent,
			normal: loc.normal,
			curveLength: loc.curve.length,
			pathLength: loc.path.length,
			at: at,
		};
	}
}

export default Spine;