import { useEffect, useState } from 'react';

type MousePosition = { x: number; y: number }
type MousePositionHook = [ { x: number; y: number }, (event: MouseEvent) => void ];

const useMousePosition = (): MousePositionHook => {
	
	const [ position, setPosition ] = useState<MousePosition>({x:0, y:0});

	// const handleMouseMove = ( event: MouseEvent ): void => {

	// 	if ( event.target ) {

	// 		let rect: DOMRect = (event.target as HTMLElement).getBoundingClientRect();

	// 		setPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
	// 	}
	// };

	const handleMouseMove = ( event: MouseEvent ): void => {

		setPosition({x: event.clientX, y: event.clientY} as MousePosition)
	}

	useEffect( () => {

		window.addEventListener('mousemove', handleMouseMove);

		return () => { window.removeEventListener('mousemove', handleMouseMove) }

	}, []);

	return [ position, setPosition ];

}

export default useMousePosition;