declare const paper: any;

import Orbital from "./attractors/orbital";
import OrbitalField from "./attractors/orbitalField";
import HyperPoint from "../lib/topo/core/hyperPoint";
import { Circle, Path, Point } from "../lib/topo/drawing/paperjs";
import { convertToSegment } from "../lib/topo/utils/converters";

import Pen from "../lib/topo/tools/pen";
import { normalize } from "../lib/topo/utils/helpers";
import Spine from "./attractors/spine";
import { pull } from "../lib/topo/tools/stitcher";

const DEBUG_GREEN = "#10FF0C";
const GUIDES = "#06E7EF";


// ------------------------------------------------------------------------
// COMPONENTS


interface PlotType {
  position: { x: number, y: number };
  radius: number;
}

class Plot {

  position: {x: number, y: number};
  radius: number;

  constructor(position: {x: number, y: number}) {
    this.position = position;
    this.radius = radius;
  }
}


// ----------------------------------------------------------------------
// TOOLS


const pen = Pen.getInstance();


// ----------------------------------------------------------------------
// CREATORS


function createGrid(width: number, height: number) {
  const w = width / (radius*3);
  const h = height / (radius*3);

  const m = radius*2;

  const ix = radius;
  const iy = radius * 2;

  let x = 0;
  let y = 0;

  const posList = [];

  for (let c = 0; c < w; c++) {
    
    x = ix + c * (radius + m);
    
    for (let r = 0; r < h; r++) {
      y = iy + r * (radius + m);

      const plot: PlotType = new Plot({x,y})
      posList.push(plot);
    }
  }

  return posList;
}


function ___createForma(pos: any, radius: number, opacity: number) {

  if ( opacity > 0 ) {

    const position = new HyperPoint(pos);
    const size = radius;
    const orbitalRadius = size / 3;

    const orbitalField = new OrbitalField(position, size);

    const atts = [];

    const count = 5;

    for (let i = 0; i < count; i++) {
      atts.push(new Orbital(orbitalRadius));
    }

    orbitalField.addAttractors(atts);

    // ....................................................................

    const pts = orbitalField.locate(0).map( (pt:any, i: number) => {
      if ( pt.spin === -1 ) {
        pt.flip();
      }
      return pt;
    });

    const path = new Path({fillColor: 'black', strokeWidth:2, closed: true})

    pen.setPath(path);
    pen.add(pts)

    path.opacity = opacity;


  }


}

function createForma(position: {x: number, y: number}, opacity: number, params: any) {
    const {
      sideCtrl=5,
      expansionCtrl=1,
      twirlCtrl=1,
      tipRoundnessCtrl=0,
      joinRoundessCtrl=0,
      extendCtrl=0,
      shrinkCtrl=0,
    } = params;

    const sides = sideCtrl;

    const polyRadius = radius;
    const starRadius = polyRadius * Math.cos(Math.PI / sides);

    const polyField = new OrbitalField(new HyperPoint(position), polyRadius);
    const starField = new OrbitalField(new HyperPoint(position), starRadius);

    const num = sideCtrl;
    const polySpineLength = radius;
    const starSpineLength = radius;

    // ----------------------------------------------
    //

    const polySpines: any[] = [];

    for (let i = 0; i < num; i++) {
      polySpines.push(new Spine(polySpineLength));
    }

    polyField.addAttractors(polySpines);

    // ----------------------------------------------
    //

    const starSpines: any[] = [];

    for (let i = 0; i < num; i++) {
      starSpines.push(new Spine(starSpineLength));
    }

    starField.addAttractors(starSpines);

    // ----------------------------------------------
    // TWIRL ACTION

    const angleOffset = (180 / num) * twirlCtrl;
    starField.revolve(normalize(angleOffset, 0, 360));

    // ----------------------------------------------
    // PULL <> PUSH ACTION

    starField.expandBy(starRadius * (expansionCtrl - 0.5) * 1.75, "RAY");

    // ----------------------------------------------
    // TWEAK LENGTH ACTION

    polyField.expandBy(polyRadius * extendCtrl, "RAY");

    
    // ----------------------------------------------
    // 


    // ----------------------------------------------
    // DRAW

    const polyPts = polyField.locate(0.5);
    const starPts = starField.locate(0.5);


    // ----------------------------------------------
    // TIP CURVATURE ACTION

    const tipCurvature = radius/2 * tipRoundnessCtrl;

    console.log('Tip curvature: ', tipCurvature)

    for ( const pt of polyPts ) {

      pull(pt, tipCurvature);
      pt.steer(90);
    }

    // ----------------------------------------------
    // JOIN CURVATURE ACTION  

    const joinCurvature = radius/2 * joinRoundessCtrl;

    for ( const pt of starPts ) {

      pull(pt, joinCurvature);
      pt.steer(90);
    }

    const path = new Path({
      fillColor: 'black',
      opacity: opacity,
      closed: true,
    });

    for (let i = 0; i < num; i++) {
      // retract(polyPts[i]);
      path.add(convertToSegment(polyPts[i]));

      // retract(starPts[i]);
      // starPts[i].steer(90).scaleHandles( curveCtrl );
      path.add(convertToSegment(starPts[i]));
    }

    // ----------------------------------------------
    //

    // this._path.rotate( 90, this._position.point );
  }


// ----------------------------------------------------------------------
// HELPERS


function proximityEffect(origin: any, position: any) {

  const o = new Point(origin);
  const p = new Point(position);

  const d = o.getDistance(p)
  console.log('distance: ', d)

  if (d<radius*6) {
    return radius * d/radius / 6;
  } else {
    return radius;
  }

}



// ----------------------------------------------------------------------

let view: any;
let layer: any;
let origin: any;

const radius = 25;

let grid: PlotType[] = [];



export function init() {
  paper.project.clear();
  view = paper.project.view;
  origin = view.center;
  layer = new paper.Layer();

  grid = createGrid(view.size.width, view.size.height);
}

export function update(position: { x: number; y: number }) {
  origin = position;
  paper.project.clear();
  layer = new paper.Layer();

  // console.log(' + Mouse Position: ', origin);
  // console.log(" + Origin: ", view.center.subtract(origin));
}

export function generate() {
  grid.forEach((n) => {
    // console.log("grid", n);
    const r = proximityEffect(n.position, origin)
    const opacity = 1 - normalize(r, 0, radius)
    if ( opacity > 0 ) {

      const params = {
        expansionCtrl: normalize(r, 0, radius)
      }

      createForma(n.position, opacity, params);
    }
  });
}
