import {
	IHyperPoint,
	IAttractor,
} from "../../lib/topo/types";

import AttractorField from "../../lib/topo/core/attractorField";
import Spine from "./spine";

class SpinalField extends AttractorField {
	private _positionData: any;

	private _length: number;
	private _mode: string;

	private _alternator: boolean = false;

	constructor(
		positionData: IHyperPoint | [IHyperPoint, IHyperPoint],
		length: number | null,
		mode: string = "SYMMETRICAL",
	) {
		const _path = Spine.project(positionData, length);

		super(_path.getPointAt(_path.length / 2));

		this._positionData = positionData;

		this._length = _path.length;
		this._mode = mode;

		this.render();

		return this;
	}

	private alternate() {
		this._alternator = !this._alternator;
	}

	protected render() {
		if (this.isRendered && this.content) {
			this.content.remove();
			this.isRendered = false;
		}

		this._attractor = new Spine(this._length, this._positionData);
		this._attractor.orientation = this.orientation;
		this._attractor.polarity = this.polarity;

		this.arrangeAttractors(this.filterAttractors());

		super.render( this._attractor.content );
		// super.render(this._attractor.path);
	}

	public adjustRotationToPosition(anchor: IHyperPoint, isPositive: Function, isNegative: Function) {
		if (!this._attractor) {
			throw new Error("Orbital Field has no defined base attractor");
		}

		this._attractor.adjustRotationToPosition(anchor, isPositive, isNegative);
	}

	public adjustToOrientation(anchor: IHyperPoint, isPositive: Function, isNegative: Function) {
		if (!this._attractor) {
			throw new Error("Orbital Field has no defined base attractor");
		}

		this._attractor.adjustToOrientation(anchor, isPositive, isNegative);
	}

	public adjustToPolarity(anchor: IHyperPoint) {
		if (!this._attractor) {
			throw new Error("Orbital Field has no defined base attractor");
		}

		this._attractor.adjustToPolarity(anchor);
	}

	// Called by the base class AttractorField
	protected configureAttractor(att: IAttractor, anchor: IHyperPoint) {
		switch (this._mode) {
			case "SYMMETRICAL":
				att.adjustRotationToPosition(
					anchor,
					(pos: number) => {
						return pos < 0.5;
					},
					(pos: number) => {
						return pos >= 0.5;
					},
				);

				att.adjustToOrientation(
					anchor,
					(pos: number) => {
						return pos < 0.5;
					}, // the condition of this field for the orientation to be 1
					(pos: number) => {
						return pos >= 0.5;
					}, // the condition of this field for the orientation to be -1
				);

				break;

			case "ALTERNATED": // TODO: need to know the order of each att
				this.alternate();

				att.adjustRotationToPosition(
					anchor,
					(pos: number) => {
						return !this._alternator;
					},
					(pos: number) => {
						return this._alternator;
					},
				);

				att.adjustToOrientation(
					anchor,
					(pos: number) => {
						return this._alternator;
					}, // the condition of this field for the orientation to be 1
					(pos: number) => {
						return !this._alternator;
					}, // the condition of this field for the orientation to be -1
				);

				break;

			case "DIRECTED":
				att.adjustRotationToPosition(
					anchor,
					(pos: number) => {
						return pos >= 0;
					},
					(pos: number) => {
						return false;
					},
				);

				att.adjustToOrientation(
					anchor,
					(pos: number) => {
						return pos >= 0;
					}, // the condition of this field for the orientation to be 1
					(pos: number) => {
						return false;
					}, // the condition of this field for the orientation to be -1
				);

				break;
		}

		att.adjustToPolarity(anchor);
	}

	// protected calculateRotation( i: number, anchor: any ) {

	// 	if ( isEven(i) ) {

	// 		return 0;

	// 	} else {

	// 		return this._mode === 'DIRECTED' ? 0 : 180;
	// 	}
	// };

	set mode(value: string) {
		this._mode = value;
	}

	get mode() {
		return this._mode;
	}

	get length() {
		return this._length;
	}
}

export default SpinalField;
