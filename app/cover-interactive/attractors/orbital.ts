import { TopoPath, Group, Circle, Ellipse } from '../../lib/topo/drawing/paperjs';

import { PathLocationData, PointLike, SizeLike, IHyperPoint} from '../../lib/topo/types';
import AttractorTopo from '../../lib/topo/core/attractorTopo'


class Orbital extends AttractorTopo {

	
	private _debugPath1: any;
	private _debugPath2: any;
	private _debugPath3: any;
	private _debugPath4: any;
	private _arrow: any;


	private _radius: number;

	// private _fixedOrientation: boolean;


	constructor( radius: SizeLike | number, position: IHyperPoint ) {

		super( position );

		this._radius =  typeof radius === 'number' ? radius : Array.isArray(radius) ? radius[0] : 'width' in radius ? radius.width : radius.x;
		
		/* DEBUG */

		this._debugPath1 = new TopoPath();
		this._debugPath2 = new TopoPath();
		this._debugPath3 = new TopoPath();
		this._debugPath4 = new TopoPath();

		this._arrow = new Group();

		this.render();

		
		// TODO: review this. The idea was to define the orientation permanently and prevent it from being reset by fields
		// if (orientation) this.adjustToOrientation( orientation );

		// this._fixedOrientation = false;

		// if ( orientation !== null ) {

		// 	this.adjustToOrientation( orientation );
		// 	this._fixedOrientation = true;
		// }

		return this;

	};

	get radius() {

		return this._radius;
	}


	protected render() {

		if ( this.isRendered && this._content ) {

			this._content.remove();
			this.isRendered = false;
		}	

		this._path = new Ellipse({

			center: this.position,
			radius: this.size,
			// strokeColor: '#00A5E0'
		})

		this._path.visibility = true;

		/* DEBUG */
		// this.addOrientationArrow();

		// super.render( new Group( [ this._path, this._arrow ] ) );
		super.render(this._path)

	};


	public adjustRotationToPosition( anchor: IHyperPoint,  isPositive: Function, isNegative: Function ) {
	
		if ( isPositive( anchor.position ) ) {

			this.axisAngle = -180;

		} else  if ( isNegative( anchor.position ) ) {

			this.axisAngle = 0;

		} else {

			throw new Error( 'POSSIBLY TRYING TO ANCHOR OUTSIDE OF FIELDs BOUNDS' );
		}
	};


	public adjustToOrientation( anchor: IHyperPoint,  isPositive: Function, isNegative: Function  ) {

		if ( isPositive( anchor.position ) ) {

			this.scale( 1, 1 );
			this.orientation = 1;

		} else  if ( isNegative( anchor.position ) ) {

			this.scale( -1, 1 );
			this.orientation = -1;

		} else {

			throw new Error( 'POSSIBLY TRYING TO ANCHOR OUTSIDE OF FIELDs BOUNDS' );
		}
	};


	public adjustToPolarity( anchor: IHyperPoint ) {

		// this.scale( 1, value );
	};


	protected getPathLocationDataAt( at: number ): PathLocationData {

		if ( !this._path ) {

			throw new Error(`ERROR @Orbital.getPathLocationDataAt(${at}) ! Path is missing`)
		}

		const loc = this._path.getLocationAt( this._path.length * at );

		return { point: loc.point, tangent: loc.tangent, normal: loc.normal, curveLength: loc.curve.length, pathLength: loc.path.length, at: at };
	};


	// private addOrientationArrow() {

	// 	this._debugPath1.remove();
	// 	this._debugPath2.remove();
	// 	this._debugPath3.remove();
	// 	this._debugPath4.remove();

	// 	this._arrow.remove();

	// 	this._arrow = new Group();

	// 	this._debugPath1 = new TopoPath({ segments: [ this._path.segments[0], this._path.segments[1] ], strokeColor: '#70D9FF' });
		
	// 	let _A = this._debugPath1.lastSegment.point.subtract( this._debugPath1.lastSegment.location.tangent.multiply(5) );
	// 	let _Ar = _A.rotate( 30, this._debugPath1.lastSegment.point );
		
	// 	let _B = this._debugPath1.lastSegment.point.subtract( this._debugPath1.lastSegment.location.tangent.multiply(5) );
	// 	let _Br = _B.rotate( -40, this._debugPath1.lastSegment.point );

	// 	this._debugPath2 = new TopoPath( {
	// 	                            segments: [ this._debugPath1.lastSegment.point, _Ar ],
	// 	                            strokeColor: '#70D9FF' });
		
	// 	this._debugPath3 = new TopoPath( {
	// 	                            segments: [ this._debugPath1.lastSegment.point, _Br ],
	// 	                            strokeColor: '#70D9FF' });

	// 	this._debugPath4 = new Circle({center: this._debugPath1.firstSegment.point, radius: 2, fillColor: '#70D9FF'});
	

	// 	this._arrow.addChild(this._debugPath1);
	// 	this._arrow.addChild(this._debugPath2);
	// 	this._arrow.addChild(this._debugPath3);
	// 	this._arrow.addChild(this._debugPath4);

	// }

	public reset() {

		this._orientation = 1;
		this._polarity = 1;

		this.render();
	}

	// public anchorAt( location: any ) {

	// 	super.anchorAt( location );
	// 	this.rotate(180);
	// }
	
}


export default Orbital;


