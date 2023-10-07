'use client'

declare const paper: any

import { useRef, useEffect, useState } from 'react';
import Script from 'next/script';

// import { init } from '../lib/paperTest'


const PaperStage = ({ 

	onPaperLoad 

}:any ) => {

	const canvasRef = useRef<HTMLCanvasElement>(null);

	return (

		<>
			<canvas 

				style={{display: 'relative', width: '100%', height: '100%'}}
				ref={canvasRef} 
			>
				
			</canvas>
			
			<Script

				src='../../lib/paper/paper-core.js'
				onReady={() => {

					console.log(`Paperjs is ready! --> ${paper}`);

					paper.install(window);
					paper.setup(canvasRef.current);
					onPaperLoad(true);

					// const path = new paper.Path.Circle({ center: paper.view.center, radius: 50, fillColor: 'black'})
				}}
			/>
		</>
	)
}


export default PaperStage;


