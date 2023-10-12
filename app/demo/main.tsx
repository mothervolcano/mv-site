declare const paper: any;

import Orbital from './attractors/orbital';
import OrbitalField from './attractors/orbitalField';
import HyperPoint from '../lib/topo/core/hyperPoint';
import { Circle } from '../lib/topo/drawing/paperjs';
import { convertToSegment } from '../lib/topo/utils/converters';

const DEBUG_GREEN = '#10FF0C';
const GUIDES = '#06E7EF';

let view: any
let layer: any
let origin: any


function testOrbitalFieldWithOrbitals( pos: any, params?: any ) {


  const { radius=100, count=5, p4=0, p5=0, p6=0, p7=0, p8=0 } = params;


  const position = new HyperPoint(pos);
  const size = radius;
  const orbitalRadius = radius/2;

  const orbitalField = new OrbitalField(position, size);

  const orbitals = [];

  for (let i = 0; i < count; i++) {

    orbitals.push( new Orbital( orbitalRadius ) );

  }

  orbitalField.addAttractors( orbitals );

  // ---------------------

  orbitalField.revolve( p5 );

  orbitalField.expandBy( p6*radius, 'RAY');
  orbitalField.expandBy( p7*radius, 'HOR');

  // ---------------------


  // orbitalField.addAttractor(  new Orbital( orbitalRadius/2 ), p8 );


  // ---------------------

  const path = new paper.Path({

    strokeColor: DEBUG_GREEN,
    closed: true

  })

  // --------------------

  const pts = orbitalField.locate( 1 );

  for ( let i = 0; i<count; i++ ) {

    pts[i].steer(p4);

    const pt = convertToSegment( pts[i] );

    path.add( pt );
  }

}

export function init() {

    paper.project.clear();
    view = paper.project.view;
    origin = view.center;
    layer = new paper.Layer();
};

export function update( position: {x:number,y:number}) {

	origin = position;

	console.log('---> CLICK! Mouse Position: ', origin);
}


export function generate() {

	// const path = new Circle({ center: paper.view.center, radius: 50, fillColor: 'black'});


	testOrbitalFieldWithOrbitals(origin, { p5: 0.15, p6: 0.25});



}


