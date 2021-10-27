import React, { useEffect, useRef, useState } from 'react';
import { hookAudioWave } from './hookAudioWave';

type PropsType = {
	samplesUrl: string;
};

export const CanvasItems: React.FC<PropsType> = ({ samplesUrl }) => {
	const [hover, setHover] = useState(false);
	const canvasRef = useRef<any>(null);

	console.log(samplesUrl);

	useEffect(() => {
		if (samplesUrl) {
			fetch(`http://localhost:5000/${samplesUrl}`).then((data) => {
				hookAudioWave(data.arrayBuffer(), canvasRef.current);
			});
		}
	}, []);

	// hookAudioWave(`http://localhost:5000/${samplesUrl}`);
	// useEffect(() => {

	//   // perform a one-time drawing on the canvas element that should be retained throughout state changes

	//   myRef.current.addEventListener('onmouseover', () => setHover(true));
	//   myRef.current.addEventListener('onmouseout', () => setHover(false));

	// }, [])

	return (
		<div style={{ width: 500 }}>
			<canvas
				ref={canvasRef}
				style={{ width: '1000px', height: '50px' }}
			/>
		</div>
	);
};
