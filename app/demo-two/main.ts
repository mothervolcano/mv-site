declare const paper: any;

// import { Color } from 'paper';

import { Circle, Path, Point } from "../lib/topo/drawing/paperjs";
import { IPath } from "../lib/topo/types";
import { degToRad } from "../lib/topo/utils/helpers";

import { setStyle, createSineWave, createFlatLine } from "./waves";

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
	color: paper.Color;
}

class Plot {
	position: { x: number; y: number };
	length: number;
	visible: boolean;
	color: paper.Color;

	constructor(position: { x: number; y: number }, length: number) {
		this.position = position;
		this.length = length;
		this.visible = false;
		this.color = new paper.Color(0, 0, 0);
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
	const mt = height * 0.09;
	const mb = height * 0.15;
	const h = (height - mt) / rowNum;
	const x = width / 2;

	const step = degToRad(90/rowNum);  

	const plots: PlotType[] = [];

	for (let row = 0; row < rowNum; row++) {
		const y =  mt + (height-mb) * (1 - Math.sin(step*row));

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
	// view.onFrame = () => {
	// 	layer.rotate(1);
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

export function generate() {
	// const plot = grid[3]

	// if ( proximitySensor(plot.position, origin, 100) ) {
	// 	createSineWave(plot.position, plot.length, 10);
	// }
	const effectRadius = 200;
	const baseFreq = 25;
	const nx = origin.x / view.size.width;
	// const ix = Math.floor(freq * x);

	const step = degToRad(90/rowNum);

	const flatLine: IPath = createFlatLine({x:0, y: 0}, view.size.width);

	grid.forEach((n, i) => {
		const color = new paper.Color(n.color);
		color.alpha = 1-Math.max(i, rowNum/2)/rowNum;
		setStyle({color});

		const freq = 2 + Math.min(Math.floor(baseFreq*Math.tan(step*i)));

		if (proximitySensor(n.position, origin, effectRadius)) {
			const amp = calculateAmplitude(n.position, origin, effectRadius);
			createSineWave(n.position, n.length, freq, amp*Math.cos(step*i)*1.25, nx, freq/baseFreq);
		} else {
			// createSineWave(n.position, n.length, freq, 1, ix);
			flatLine.clone()
			flatLine.position = n.position;
			flatLine.strokeColor = color;
		}
	});
}

export function _generate() {
	const effectRadius = 200;
	const freq = 25;
	const nx = origin.x / view.size.width;
	// const ix = Math.floor(freq * x);

	const plot = grid[10];

	const color = new paper.Color(plot.color);
	setStyle({color});

	if (proximitySensor(plot.position, origin, effectRadius)) {
		const amp = calculateAmplitude(plot.position, origin, effectRadius);
		createSineWave(plot.position, plot.length, freq, amp, nx, 1);
		// console.log("...generating wave: ", amp);
	}
}
