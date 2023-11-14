import { Circle, Path, Point } from "../lib/topo/drawing/paperjs";

import Orbital from "./attractors/orbital";
import Spine from "./attractors/spine";
import OrbitalField from "./attractors/orbitalField";
import HyperPoint from "../lib/topo/core/hyperPoint";

import { convertToSegment } from "../lib/topo/utils/converters";
import { pull, retract } from "../lib/topo/tools/stitcher";
import { normalize } from "../lib/topo/utils/helpers";

export function createPolyStar(
  position: { x: number; y: number },
  radius: number,
  opacity: number,
  params: any,
) {
  const {
    sideCtrl = 6,
    expansionCtrl = 0,
    twirlCtrl = 1,
    tipRoundnessCtrl = 0,
    joinRoundessCtrl = 0,
    extendCtrl = 0,
    shrinkCtrl = 0,
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

  // starField.expandBy(starRadius * (expansionCtrl - 0.5) * 1.75, "RAY");
  starField.expandBy(starRadius * (0 - expansionCtrl), "RAY");
  // starField.expandBy(starRadius * 0, "RAY");

  console.log("expansionCtrl", expansionCtrl);

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

  const tipCurvature = (radius / 2) * tipRoundnessCtrl;

  console.log("Tip curvature: ", tipCurvature);

  for (const pt of polyPts) {
    pull(pt, tipCurvature);
    pt.steer(90);
  }

  // ----------------------------------------------
  // JOIN CURVATURE ACTION

  const joinCurvature = (radius / 2) * joinRoundessCtrl;

  for (const pt of starPts) {
    pull(pt, joinCurvature);
    pt.steer(90);
  }

  const path = new Path({
    fillColor: "black",
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

export function createPorcupine(
  position: { x: number; y: number },
  radius: number,
  opacity: number,
  params: any,
) {
  const {
    sideCtrl = 8,
    expansionCtrl = 0,
    twirlCtrl = 1,
    tipRoundnessCtrl = 0,
    joinRoundessCtrl = 0,
    extendCtrl = 0,
    shrinkCtrl = 0,
  } = params;

  const sides = sideCtrl;

  const starRadius = radius;

  const starField = new OrbitalField(new HyperPoint(position), starRadius);

  const num = sideCtrl;
  const starSpineLength = radius;

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

  // starField.expandBy(starRadius * (expansionCtrl - 0.5) * 1.75, "RAY");
  starField.expandBy(starRadius * expansionCtrl, "RAY");

  // ----------------------------------------------
  // TWEAK LENGTH ACTION

  // ----------------------------------------------
  //

  // ----------------------------------------------
  // DRAW

  const starPts = starField.locate(0.5);

  // ----------------------------------------------
  // TIP CURVATURE ACTION

  const joinCurvature = (radius / 2) * joinRoundessCtrl;

  for (const pt of starPts) {
    pull(pt, joinCurvature);
    pt.steer(90);
  }

  // ----------------------------------------------
  // DRAWING

  const basePath = starField.attractor.getPath();
  basePath.fillColor = 'black';
  basePath.opacity = opacity;

  for (let i = 0; i < num; i++) {
    const path = new Path({
      fillColor: "black",
      opacity: opacity,
      closed: true,
    });

    console.log('position: ', starField.getAttractor(i).anchor.position)

    const pos = starField.getAttractor(i).anchor.position

    const T = starPts[i];
    const A = starField.attractor.locate(pos - 0.025)
    const B = starField.attractor.locate(pos + 0.025)

    retract(A)
    retract(B)

    path.add(convertToSegment(A));
    path.add(convertToSegment(T));
    path.add(convertToSegment(B));

    basePath.join(path)
  }





  // ----------------------------------------------
  //

  // this._path.rotate( 90, this._position.point );
}
