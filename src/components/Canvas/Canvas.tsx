import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectSamplesFiles } from '../../store/selectors/samplesSelectors';
import { sendFileImages } from '../../utils/sendFileImages';

export const CanvasRender = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const sampleFiles = useSelector(selectSamplesFiles);
	useEffect(() => {
		console.log(sampleFiles);
	}, [sampleFiles]);
	// if (audio && canvasRef?.current) {
	// getAudioWave(audioCoordinatesParse, canvasRef.current, _id, profileUpdate);

	// const offscreen = canvasRef?.current.transferControlToOffscreen();
	// //@ts-ignore
	// workerInstance.postMessage(
	//     {
	//         canvas: offscreen,
	//         // audioCoordinates: audioCoordinatesParse,
	//         sampleId: _id,
	//         profileUpdate,
	//         cssCanvasWidth: 550,
	//         cssCanvasHeight: 50,
	//         dpr: 2,
	//     },
	//     [offscreen],
	// );

	// //@ts-ignore
	// workerInstance.addEventListener('message', (e: any) => {
	//     const { file, sampleId, profileUpdate } = e.data;

	//     sendFileImages(file, profileUpdate, sampleId);
	// });
	// }

	return (
		<>
			{sampleFiles &&
				Object.values(sampleFiles[0]).map((el) => {
					return (
						<canvas
							ref={canvasRef}
							style={{
								width: '550px',
								height: '35px',
							}}
						/>
					);
				})}
		</>
	);
};
