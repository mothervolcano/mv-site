declare const paper: any;

import { Circle, Path, Point } from "../lib/topo/drawing/paperjs";

import { createSineWave, createFlatLine } from "./waves";

// ------------------------------------------------------------------------
// MODULE GLOBALS

let view: any;
let layer: any;
let origin: any;

const rowNum = 30;

let grid: PlotType[] = [];

// ------------------------------------------------------------------------
// COMPONENTS

interface PlotType {
	position: { x: number; y: number };
	length: number;
	visible: boolean;
}

class Plot {
	position: { x: number; y: number };
	length: number;
	visible: boolean;

	constructor(position: { x: number; y: number }, length: number) {
		this.position = position;
		this.length = length;
		this.visible = false;
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

	return (radius - Math.abs(d))*0.30;
}

function createGrid(width: number, height: number): PlotType[] {
	// ...
	const h = height / rowNum;
	const x = width / 2;

	const plots: PlotType[] = [];

	for (let row = 0; row < rowNum; row++) {
		const y = h * row;

		const plot: PlotType = new Plot({ x, y }, width);
		plots.push(plot);
	}

	return plots;
}

export function init() {
	// ...
	paper.project.clear();
	view = paper.project.view;
	origin = view.center;
	layer = new paper.Layer();
	grid = createGrid(view.size.width, view.size.height);
	view.onResize = () => {
		console.log('!!! Paper view resized!')
		layer.position = view.center;
	}
}

export function update(position: { x: number; y: number }) {
	// ...
	origin = position;
	paper.project.clear();
	layer = new paper.Layer();

	// console.log(' + Mouse Position: ', origin);
	// console.log(" + Origin: ", view.center.subtract(origin));
}

export function generate() {
	// const plot = grid[3]

	// if ( proximitySensor(plot.position, origin, 100) ) {
	// 	createSineWave(plot.position, plot.length, 10);
	// }
	const effectRadius = 200;
	const freq = 25;
	const nx = origin.x / view.size.width;
	// const ix = Math.floor(freq * x);

	grid.forEach((n) => {
		if (proximitySensor(n.position, origin, effectRadius)) {
			const amp = calculateAmplitude(n.position, origin, effectRadius);
			createSineWave(n.position, n.length, freq, amp, nx);
		} else {
			// createSineWave(n.position, n.length, freq, 1, ix);
			createFlatLine(n.position, n.length)
		}
	});
}

export function _generate() {
	const effectRadius = 200;
	const freq = 25;
	const nx = origin.x / view.size.width;
	// const ix = Math.floor(freq * x);

	const plot = grid[3];

	if (proximitySensor(plot.position, origin, effectRadius)) {
		const amp = calculateAmplitude(plot.position, origin, effectRadius);
		createSineWave(plot.position, plot.length, freq, amp, nx);
		// console.log("...generating wave: ", amp);
	}
}
