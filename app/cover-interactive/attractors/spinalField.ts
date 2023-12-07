import AttractorField from "@/app/lib/topo/core/attractorField";
import HyperPoint from "@/app/lib/topo/core/hyperPoint";
import { TopoPath } from "@/app/lib/topo/drawing/paperjs";
import { IHyperPoint, IPath, IPoint, TopoLocationData } from "@/app/lib/topo/types";

class SpinalField extends AttractorField {
	private _alternator: boolean = false;
	private _mode: string;

	constructor(length: number, anchor?: IHyperPoint, mode: string = "DIRECTED") {
		const topoPath = new TopoPath();

		if ( anchor ) {
			const A: IPoint = anchor.point.subtract([length/2, 0]);
			const B: IPoint = anchor.point.add([length/2, 0]);
			topoPath.add(A,B);	
		}

		topoPath.visibility = false;

		// topoPath.strokeColor = new paper.Color("black")

		super(topoPath, anchor);

		this.setLength(length);

		this._mode = mode;

		this.configureAttractor();
	}

	private alternate() {
		this._alternator = !this._alternator;
	}

	configureAttractor() {
		switch (this._mode) {
			case "SYMMETRICAL":
				this.setOrientationDeterminator((pos: number) => {
					return pos < 0.5;
				});
				this.setSpinDeterminator((pos: number) => {
					return pos < 0.5;
				});
				break;

			case "ALTERNATED": // TODO: need to know the order of each att
				this.alternate();
				this.setOrientationDeterminator((pos: number) => {
					return !this._alternator;
				});
				this.setSpinDeterminator((pos: number) => {
					return this._alternator;
				});

				break;

			case "DIRECTED":
				this.setOrientationDeterminator((pos: number) => {
					return pos >= 0;
				});
				this.setSpinDeterminator((pos: number) => {
					return pos >= 0;
				});
				break;
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
		if (!this.topo) {
			throw new Error(`ERROR @Spine.getTopoLocationAt(${at}) ! Topo path is missing`);
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

export default SpinalField;
