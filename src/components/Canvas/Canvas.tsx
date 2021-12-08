import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectPackId } from '../../store/selectors/samplesSelectors';
import { workerInstance } from '../../utils/WebWorkerEnabler';
import { filterData, normalizeData } from '../../utils/getAudioCoordinates';

type PropsType = {
	file: File;
};

export const Canvas: React.FC<PropsType> = ({ file }) => {
	const packId = useSelector(selectPackId);

	let canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (canvasRef?.current) {
			const offscreen = canvasRef?.current.transferControlToOffscreen();
			// const offscreen = new OffscreenCanvas(1100, 100);

			const audioContext = new AudioContext();
			const reader = new FileReader();

			reader.readAsArrayBuffer(file);

			reader.onload = function() {
				const arrayBuffer: any = reader.result;
				audioContext.decodeAudioData(arrayBuffer).then((data) => {
					const audioCoordinates = normalizeData(filterData(data));

					//@ts-ignore
					workerInstance.postMessage(
						{
							audioCoordinates,
							packId,
							canvas: offscreen,
							// file: file,
							cssCanvasWidth: 550,
							cssCanvasHeight: 50,
							dpr: 2,
						},
						[offscreen],
					);
				});
			};
		}
	}, []);

	return (
		<>
			<canvas
				ref={canvasRef}
				style={{
					width: '550px',
					height: '35px',
				}}
			/>
		</>
	);
};

