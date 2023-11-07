declare const paper: any;

import Orbital from "./attractors/orbital";
import OrbitalField from "./attractors/orbitalField";
import HyperPoint from "../lib/topo/core/hyperPoint";
import { Circle, Point } from "../lib/topo/drawing/paperjs";
import { convertToSegment } from "../lib/topo/utils/converters";

const DEBUG_GREEN = "#10FF0C";
const GUIDES = "#06E7EF";

let view: any;
let layer: any;
let origin: any;

function testOrbitalFieldWithOrbitals(pos: any, params?: any) {
  const {
    radius = 100,
    count = 5,
    p4 = 0,
    p5 = 0,
    p6 = 0,
    p7 = 0,
    p8 = 0,
  } = params;

  const position = new HyperPoint(pos);
  const size = radius;
  const orbitalRadius = radius / 2;

  const orbitalField = new OrbitalField(position, size);

  const orbitals = [];

  for (let i = 0; i < count; i++) {
    orbitals.push(new Orbital(orbitalRadius));
  }

  orbitalField.addAttractors(orbitals);

  // ---------------------

  orbitalField.revolve(p5);

  orbitalField.expandBy(p6 * radius, "RAY");
  orbitalField.expandBy(p7 * radius, "HOR");

  // ---------------------

  // orbitalField.addAttractor(  new Orbital( orbitalRadius/2 ), p8 );

  // ---------------------

  const path = new paper.Path({
    strokeColor: DEBUG_GREEN,
    closed: true,
  });

  // --------------------

  const pts = orbitalField.locate(1);

  for (let i = 0; i < count; i++) {
    pts[i].steer(p4);

    const pt = convertToSegment(pts[i]);

    path.add(pt);
  }
}

const radius = 50;

interface dotType {
  x: number;
  y: number;
  r: number;
}

const dot = {
  x: 0,
  y: 0,
  r: radius,
};

let grid: dotType[] = [];

function createGrid(width: number, height: number, dot: any) {
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
      posList.push({ ...dot, x, y });
    }
  }

  return posList;
}

function concept_A(pos: any, dist: any) {
  const position = new HyperPoint(pos);
  const size = 100 + dist.x;
  const orbitalRadius = size / 2;

  const orbitalField = new OrbitalField(position, size);

  const orbitals = [];

  const count = 5;

  for (let i = 0; i < count; i++) {
    orbitals.push(new Orbital(orbitalRadius));
  }

  orbitalField.addAttractors(orbitals);
  orbitalField.expandBy(dist.y, "RAY");

  // ---------------------

  const path = new paper.Path({
    strokeColor: DEBUG_GREEN,
    closed: true,
  });

  // --------------------

  const pts = orbitalField.locate(1);

  for (let i = 0; i < count; i++) {
    const pt = convertToSegment(pts[i]);

    path.add(pt);
  }
}

function createOrbital(pos: any, radius: number) {
  const position = new HyperPoint(pos);
  const size = radius;
  const orbitalRadius = size / 3;

  const orbitalField = new OrbitalField(position, size);

  const orbitals = [];

  const count = 3;

  for (let i = 0; i < count; i++) {
    orbitals.push(new Orbital(orbitalRadius));
  }

  orbitalField.addAttractors(orbitals);
}

function proximityEffect(origin: any, position: any) {

  const o = new Point(origin);
  const p = new Point(position);

  const d = o.getDistance(p)
  console.log('distance: ', d)

  if (d<radius*2) {
    return radius * d/radius;
  } else {
    return radius;
  }

}

export function init() {
  paper.project.clear();
  view = paper.project.view;
  origin = view.center;
  layer = new paper.Layer();

  grid = createGrid(view.size.width, view.size.height, dot);
}

export function update(position: { x: number; y: number }) {
  origin = position;
  paper.project.clear();
  layer = new paper.Layer();

  // console.log(' + Mouse Position: ', origin);
  // console.log(" + Origin: ", view.center.subtract(origin));
}

export function generate() {
  // const path = new Circle({ center: paper.view.center, radius: 50, fillColor: 'black'});

  // testOrbitalFieldWithOrbitals(origin, { p5: 0.15, p6: 0.25});

  // concept_A(origin, view.center.subtract(origin));

  grid.forEach((n) => {
    // console.log("grid", n);
    const r = proximityEffect({x: n.x, y: n.y}, origin)
    createOrbital({ x: n.x, y: n.y }, r);
  });
}
