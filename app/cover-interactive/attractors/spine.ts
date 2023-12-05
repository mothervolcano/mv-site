import { Point, TopoPath, Group, Circle } from "../../lib/topo/drawing/paperjs";

import { PathLocationData, IHyperPoint, PointLike, IPath, IGroup } from "../../lib/topo/types";
import { convertToHyperPoint, convertToPoint } from "../../lib/topo/utils/converters";

import AttractorObject from "../../lib/topo/core/attractorObject";
import HyperPoint from "../../lib/topo/core/hyperPoint";

function isHyperPoint(value: any): value is IHyperPoint {
	return value != null && typeof value === "object" && "spin" in value && "polarity" in value;
}

class Spine extends AttractorObject {
	private DEBUG_MODE: boolean = false;

	private _A: any;
	private _B: any;

	// protected _path: any

	// private _debugPath1: IPath;
	// private _debugPath2: IPath;
	// private _debugPath3: IPath;
	// private _debugPath4: IPath;
	// private _arrow: IGroup;

	static project(positionData: PointLike | IHyperPoint | [IHyperPoint, IHyperPoint], length: number | null = null) : IPath {
		let projectedPath: IPath;

		// --------------------------------------------------------------
		// Create Spine from 2 points

		// TODO: validate positionData

		if (
			Array.isArray(positionData) &&
			positionData.length === 2 &&
			isHyperPoint(positionData[0]) &&
			isHyperPoint(positionData[1])
		) {
			const hyperPoints: [IHyperPoint, IHyperPoint] = positionData as [IHyperPoint, IHyperPoint];

			console.log(positionData);

			projectedPath = new TopoPath();
			projectedPath.add(...hyperPoints);

			projectedPath.fullySelected = true;

			return projectedPath;

			// --------------------------------------------------------------
			// Create Spine from 1 point
		} else if (length) {
			const C = convertToPoint(positionData);

			const vA = new Point({ angle: 180, length: length / 2 });
			const vB = new Point({ angle: 0, length: length / 2 });

			const A = new Point(C.add(vA));
			const B = new Point(C.add(vB));

			// projectedPath = new Path({
			// 	segments: [A, B],
			// });

			projectedPath = new TopoPath();
			projectedPath.add( A, B );

			// projectedPath.fullySelected = true;

			return projectedPath;
		} else {
			return new TopoPath({ segments: [[0, 0]] });
		}
	}

	constructor(
		length: number,
		positionData: PointLike | IHyperPoint | [IHyperPoint, IHyperPoint] = new HyperPoint(new Point(0, 0)),
	) {
		const path = Spine.project(positionData, length);

		const pos = convertToHyperPoint(path.getPointAt(path.length / 2))

		super(pos);

		// -------------------------------
		// DEBUG

		// this._debugPath1 = new TopoPath();
		// this._debugPath2 = new TopoPath();
		// this._debugPath3 = new TopoPath();
		// this._debugPath4 = new TopoPath();

		// this._arrow = new Group();

		// -------------------------------

		this._A = new HyperPoint(path.firstPoint.point, path.firstPoint.handleIn, path.firstPoint.handleOut);
		this._B = new HyperPoint(path.lastPoint.point, path.lastPoint.handleIn, path.lastPoint.handleOut);

		this.render();

		// super.render();
		// super.render(new Group([path, this._arrow]));

		return this;
	}

	protected render() {
		if (this.isRendered) {
			this.content.remove();
			this.isRendered = false;
		}

		this._path = new TopoPath();
		this._path.add(this._A, this._B);
		this._path.visibility = false;

		if (this.DEBUG_MODE) {
			this._path.strokeColor = new paper.Color("#02B7FD");
			this._path.visibility = true;
			// this.addOrientationArrow(this._path);
		}

		super.render(this._path)
		
		// super.render(new Group([this._path, this._arrow]));

		// this._path.fullySelected = true;

	}

	public adjustRotationToPosition(anchor: any, isPositive: Function, isNegative: Function) {
		if (isPositive(anchor.position)) {
			this.axisAngle = 0;
		} else if (isNegative(anchor.position)) {
			this.axisAngle = 180;
		} else {
			throw new Error("POSSIBLY TRYING TO ANCHOR OUTSIDE OF FIELDs BOUNDS");
		}
	}

	public adjustToOrientation(anchor: any, isPositive: Function, isNegative: Function) {
		if (isPositive(anchor.position)) {
			this.orientation = 1;
		} else if (isNegative(anchor.position)) {
			this.orientation = -1;
		} else {
			throw new Error("POSSIBLY TRYING TO PLACE THE ATTRACTOR OUTSIDE OF FIELDs BOUNDS");
		}
	}

	public adjustToPolarity(anchor: any) {
		// TODO

		this.polarity = 1;
	}

	protected getPathLocationDataAt(at: number): PathLocationData {

		if ( !this._path ) {

			throw new Error(`ERROR @Spine.getPathLocationDataAt(${at}) ! Path is missing`)
		}

		const loc = this._path.getLocationAt(this._path.length * at);

		return {
			point: loc.point,
			tangent: loc.tangent,
			normal: loc.normal,
			curveLength: loc.curve.length,
			pathLength: loc.path.length,
			at: at,
		};
	}

	// private addOrientationArrow(path: IPath) {
	// 	this._debugPath1.remove();
	// 	this._debugPath2.remove();
	// 	this._debugPath3.remove();
	// 	this._debugPath4.remove();

	// 	this._arrow.remove();

	// 	this._arrow = new Group();

	// 	let midPoint = path.getPointAt(path.length / 2);

	// 	this._debugPath1 = new TopoPath({ segments: [midPoint, path.segments[1]], strokeColor: "#70D9FF" });

	// 	let _A = this._debugPath1.lastPoint.point.subtract(this._debugPath1.lastPoint.tangent.multiply(5));
	// 	let _Ar = _A.rotate(30, this._debugPath1.lastPoint.point);

	// 	let _B = this._debugPath1.lastPoint.point.subtract(this._debugPath1.lastPoint.tangent.multiply(5));
	// 	let _Br = _B.rotate(-40, this._debugPath1.lastPoint.point);

	// 	this._debugPath2 = new TopoPath({
	// 		segments: [this._debugPath1.lastPoint.point, _Ar],
	// 		strokeColor: "#70D9FF",
	// 	});

	// 	this._debugPath3 = new TopoPath({
	// 		segments: [this._debugPath1.lastPoint.point, _Br],
	// 		strokeColor: "#70D9FF",
	// 	});

	// 	this._debugPath4 = new Circle({ center: midPoint, radius: 2, fillColor: "#70D9FF" });

	// 	this._arrow.addChild(this._debugPath1);
	// 	this._arrow.addChild(this._debugPath2);
	// 	this._arrow.addChild(this._debugPath3);
	// 	this._arrow.addChild(this._debugPath4);
	// }

	public clearGuides() {
		// TODO
	}

	// public anchorAt( location: any, along: string = 'RAY' ) {

	// 	super.anchorAt( location, along );
	// 	// this.rotate(180);
	// }
}

export default Spine;
