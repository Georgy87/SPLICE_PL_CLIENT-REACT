import React, { useEffect, useRef, useState } from 'react';
import { Samples } from '../../context/SamplesPlayerContext/types';
import { useSound } from '../../hooks/useSound';
import { hookAudioWave } from './hookAudioWave';

type PropsType = {
	sample: Samples;
	index: number;
};

export const CanvasItems: React.FC<PropsType> = ({ sample, index }) => {
	const { audio } = sample;
	const [hover, setHover] = useState(false);

	const { playTrack } = useSound();
	const canvasRef = useRef<any>(null);

	useEffect(() => {
		if (audio) {
			fetch(`http://localhost:5000/${audio}`).then((data) => {
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
			<button onClick={() => playTrack(index)}>Play</button>
			<canvas
				ref={canvasRef}
				style={{ width: '1000px', height: '50px' }}
			/>
		</div>
	);
};
