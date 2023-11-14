declare const paper: any;

import { Circle, Path, Point } from "../lib/topo/drawing/paperjs";

import { createPolyStar, createPorcupine } from "./formas";

import Pen from "../lib/topo/tools/pen";
import { genRandom, normalize } from "../lib/topo/utils/helpers";

const DEBUG_GREEN = "#10FF0C";
const GUIDES = "#06E7EF";

// ------------------------------------------------------------------------
// COMPONENTS

interface PlotType {
  position: { x: number; y: number };
  radius: number;
  sides: number;
  visible: boolean;
}

class Plot {
  position: { x: number; y: number };
  radius: number;
  sides: number;
  visible: boolean;

  constructor(position: { x: number; y: number }) {
    this.position = position;
    this.radius = radius;
    this.sides = 5;
    this.visible = false;
  }
}

// ----------------------------------------------------------------------
// TOOLS

const pen = Pen.getInstance();

// ----------------------------------------------------------------------
// CREATORS

function createGrid(width: number, height: number) {
  const w = width / (radius * 3);
  const h = height / (radius * 3);

  const m = radius * 2;

  const ix = radius;
  const iy = radius * 2;

  let x = 0;
  let y = 0;

  const posList = [];

  for (let c = 0; c < w; c++) {
    x = ix + c * (radius + m);

    for (let r = 0; r < h; r++) {
      y = iy + r * (radius + m);

      const plot: PlotType = new Plot({ x, y });
      posList.push(plot);
    }
  }

  return posList;
}

// ----------------------------------------------------------------------
// HELPERS

function proximityEffect(origin: any, position: any) {
  const o = new Point(origin);
  const p = new Point(position);

  const d = o.getDistance(p);

  if (d < radius * 6) {
    return (radius * d) / radius / 6;
  } else {
    return radius;
  }
}

function visibilityEffect(origin: any, position: any) {
  const o = new Point(origin);
  const p = new Point(position);

  const d = o.getDistance(p);

  if (d < radius * 10) {
    return (radius * d) / radius / 10;
  } else {
    return radius;
  }
}

// ----------------------------------------------------------------------

let view: any;
let layer: any;
let origin: any;

const radius = 30;

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
    const r = proximityEffect(n.position, origin);
    const v = visibilityEffect(n.position, origin);
    const opacity = 1 - normalize(v, 0, radius);
    const params = {
      sideCtrl: n.sides,
      expansionCtrl: 1 - normalize(r, 0, radius),
    };

    if (opacity > 0) {
      if ( !n.visible) {
        n.visible = true;
        n.sides = genRandom(5, 12);
      }
      createPolyStar(n.position, radius, opacity, params);
    } else {
      if ( n.visible ) {
        n.visible = false;
      }
      // const placeHolder = new Circle({center: n.position, radius: 5, fillColor: '#DEE2E6'})
    }

    
  });
}
