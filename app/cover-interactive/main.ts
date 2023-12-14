declare const paper: any;

import { TopoPath } from "../lib/topo/topo";
import { degToRad } from "../lib/topo/utils/helpers";

import { setStyle, createSineWave, createFlatLine,testWave } from "./waves";

// ------------------------------------------------------------------------
// MODULE GLOBALS

let view: any;
let layer: any;
let origin: any;

let num: number;
let step: number;
const effectRadius = 200;
const baseFreq = 16;

let stepper: number = 1;
let time: number = 0;

let grid: PlotType[] = [];

// ------------------------------------------------------------------------
// COMPONENTS

interface PlotType {
	position: { x: number; y: number };
	length: number;
	frequency: number;
	visible: boolean;
	color: paper.Color;
	compression: number;
}

class Plot {
	position: { x: number; y: number };
	length: number;
	frequency: number;
	visible: boolean;
	color: paper.Color;
	compression: number;

	constructor(position: { x: number; y: number }, length: number) {
		this.position = position;
		this.length = length;
		this.frequency = baseFreq;
		this.visible = false;
		this.color = new paper.Color(0.3, 0.3, 0.3);
		this.compression = 0;
	}
}

// ----------------------------------------------------------------------
// AUX

function proximitySensor(position: { x: number; y: number }, origin: any, radius: number) {

	const d = origin.y - position.y;
	return d < radius && d > -radius;
}

function calculateAmplitude(position: { x: number; y: number }, origin: any, radius: number) {
	const d = origin.y - position.y;

	return (radius - Math.abs(d)) * 0.3;
}

// ----------------------------------------------------------------------


export function init(margin: number, density: number) {
	// ...
	paper.project.clear();
	view = paper.project.view;
	origin = view.center;
	layer = new paper.Layer();
	// num = density;
	num = 75;
	grid = createGrid(view.size.width, view.size.height, margin, num);
	view.onResize = () => {
		console.log("!!! Paper view resized!");
		layer.position = view.center;
	};

	step = degToRad(90 / num);

	// view.onFrame = () => {

	// 	// stepper += 1;
	// 	// time = Math.sin(degToRad(stepper));

	// 	// paper.project.clear();
	// 	// layer = new paper.Layer();
	// 	// generate();
	// 	// console.log('time', time)
	// }
	// view.emit("resize")
}

export function resize(width: number, height: number) {
	view.viewSize = [width, height];
	layer.position = view.center;
}

export function update(position: { x: number; y: number }) {
	// ...
	origin = position;
	paper.project.clear();
	layer = new paper.Layer();

	// console.log(' + Mouse Position: ', origin);
	// console.log(" + Origin: ", view.center.subtract(origin));
}

function createGrid(width: number, height: number, margin: number, density: number): PlotType[] {
	// ...
	const mt = height * margin;
	const mb = height * 0;
	const h = (height - mt) / density;
	const x = width / 2;

	const plots: PlotType[] = [];

	for (let row = 0; row < density; row++) {
		// const y =  mt + (height-mt-mb) * ( Math.sin(step*row));
		const y = mt + h * row;

		const plot: PlotType = new Plot({ x, y }, width);
		plot.frequency = baseFreq;
		plot.compression = 0;
		plots.push(plot);
	}

	return plots;
}

export function generate() {
	// const plot = grid[3]

	// if ( proximitySensor(plot.position, origin, 100) ) {
	// 	createSineWave(plot.position, plot.length, 10);
	// }
	const nx = origin.x / view.size.width;
	// const ix = Math.floor(freq * x);

	const flatLine: TopoPath = createFlatLine({ x: 0, y: 0 }, view.size.width, 1);
	flatLine.visibility = false;

	// for ( const p of grid ) {

	// 	p.frequency = baseFreq + genRandom(0, 20);
	// }

	stepper += 1;
	time = Math.sin(degToRad(stepper));

	grid.forEach((n, i) => {
		// const color = new paper.Color(n.color);
		// color.alpha = 1-Math.max(i, rowNum/2)/rowNum;

		const ny = i / num;
		const nf = n.frequency / baseFreq;

		// const nextColor = new paper.Color(n.color);
		// nextColor.green = i / num;
		// n.color = nextColor;

		n.color.alpha = 1 - i/num;

		// const amp = calculateAmplitude(n.position, origin, effectRadius) * Math.cos(step * i) * 1.25;
		const amp = calculateAmplitude(n.position, origin, effectRadius) * Math.abs(time) * 2;

		if (proximitySensor(n.position, origin, effectRadius)) {
			setStyle({ color: n.color });
			createSineWave(n.position, n.length, n.frequency, amp, n.compression, nx, ny, nf);

			// n.color = nextColor;
		} else {
			// createFlatLine(n.position, n.length, ny);
			flatLine.clone();
			flatLine.visibility = true;
			flatLine.position = n.position;
			flatLine.strokeColor = n.color;
			// n.compression = 0;
		}
		// if ( n.frequency > 5 && n.frequency < 30) {
		// 		n.frequency = baseFreq + Math.floor(10 * time);
		// }
		// console.log("!! ",  time);
	});
}

// -----------------------------------------------------------------
// DEBUG

export function _generate() {
	const i = 15;

	const n = grid[i];

	const nx = origin.x / view.size.width;

	const ny = i / num;
	const nf = n.frequency / baseFreq;

	const nextColor = new paper.Color(n.color);
	nextColor.green = i / num;
	n.color = nextColor;

	// const amp = calculateAmplitude(n.position, origin, effectRadius) * 2;
	const amp = 50;

	if (proximitySensor(n.position, origin, effectRadius)) {
		setStyle({ color: n.color });
		createSineWave(n.position, n.length / 2, n.frequency, amp, n.compression, nx, ny, nf);

		// testWave(n.position);

		// n.color = nextColor;
	}
}
