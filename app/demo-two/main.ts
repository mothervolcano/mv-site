declare const paper: any;

import { Circle, Path, Point } from "../lib/topo/drawing/paperjs";
import { IPath } from "../lib/topo/types";
import { degToRad, genRandom, genRandomDec } from "../lib/topo/utils/helpers";

import { setStyle, createSineWave, createFlatLine } from "./waves";

// ------------------------------------------------------------------------
// MODULE GLOBALS

let view: any;
let layer: any;
let origin: any;

let rowNum: number;
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
		this.color = new paper.Color(1, 0.65, 0.65);
		this.compression = 0;
	}
}

// ----------------------------------------------------------------------
// HELPERS

function proximitySensor(position: { x: number; y: number }, origin: any, radius: number) {
	// ...
	// const p = new Point(position);
	// const o = new Point(origin);

	// const d = p.getDistance(o);

	const d = origin.y - position.y;

	return d < radius && d > -radius;
}

function calculateAmplitude(position: { x: number; y: number }, origin: any, radius: number) {
	const d = origin.y - position.y;

	return (radius - Math.abs(d)) * 0.3;
}

function calculateFrequency(position: { x: number; y: number }, origin: any, radius: number) {
	const d = origin.y - position.y;

	return Math.sin((Math.abs(d) / radius) * degToRad(180));
}

// function calculateFrequency(p: PlotType, i: number, n: number, range: number) {
//     for (let offset = -range; offset <= range; offset++) {
//         if (offset === 0) continue; // Skip the current index

//         let neighborIndex = i + offset;
//         if (neighborIndex >= 0 && neighborIndex < grid.length) {
//             grid[neighborIndex].frequency = p.frequency - n;
//         }
//     }
// }



export function init(margin: number, density: number) {
	// ...
	paper.project.clear();
	view = paper.project.view;
	origin = view.center;
	layer = new paper.Layer();
	grid = createGrid(view.size.width, view.size.height, margin, density);
	view.onResize = () => {
		console.log("!!! Paper view resized!");
		layer.position = view.center;
	};

	rowNum = density;
	step = degToRad(90 / rowNum);

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
	const h = (height-mt) / density;
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

	const flatLine: IPath = createFlatLine({ x: 0, y: 0 }, view.size.width, 1);
	flatLine.visible = false;

	// for ( const p of grid ) {

	// 	p.frequency = baseFreq + genRandom(0, 20);
	// }

		stepper += 1;
		time = Math.sin(degToRad(stepper));

	grid.forEach((n, i) => {
		// const color = new paper.Color(n.color);
		// color.alpha = 1-Math.max(i, rowNum/2)/rowNum;

		const ny = i / rowNum;
		const nf = n.frequency / baseFreq;

		const nextColor = new paper.Color(n.color);
		nextColor.green = i / rowNum;
		n.color = nextColor;

		// const amp = calculateAmplitude(n.position, origin, effectRadius) * Math.cos(step * i) * 1.25;
		const amp = calculateAmplitude(n.position, origin, effectRadius) * Math.abs(time) * 2;

		if (proximitySensor(n.position, origin, effectRadius)) {
			setStyle({ color: n.color });
			createSineWave(n.position, n.length, n.frequency, amp, n.compression, nx, ny, nf);

			// n.color = nextColor;
		} else {
			// createFlatLine(n.position, n.length, ny);
			flatLine.clone();
			flatLine.visible = true;
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

export function _generate() {
	const effectRadius = 200;
	const freq = 25;
	const nx = origin.x / view.size.width;
	// const ix = Math.floor(freq * x);

	const plot = grid[10];

	const color = new paper.Color(plot.color);
	setStyle({ color });

	if (proximitySensor(plot.position, origin, effectRadius)) {
		const amp = calculateAmplitude(plot.position, origin, effectRadius);
		createSineWave(plot.position, plot.length, freq, amp, nx, 1, 1);
		// console.log("...generating wave: ", amp);
	}
}
