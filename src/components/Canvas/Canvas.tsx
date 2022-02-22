import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectPackId } from '../../store/selectors/samplesSelectors';
import { audioService } from '../../services/audioService';
import { workerInstanceCreateSample } from '../../workers/WebWorkerEnabler';

type PropsType = {
	file: File;
	fileId: string;
};

export const Canvas: React.FC<PropsType> = ({ file, fileId }) => {
	const packId = useSelector(selectPackId);

	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (canvasRef?.current) {
			const offscreen = canvasRef?.current.transferControlToOffscreen();
			
			window.AudioContext = window.AudioContext || new window.webkitAudioContext();
			const audioContext = new AudioContext();
			
			const reader = new FileReader();

			reader.readAsArrayBuffer(file);

			reader.onload = function() {
				const arrayBuffer: any = reader.result;
				if (!arrayBuffer) return;
				audioContext.decodeAudioData(arrayBuffer).then((buffer: AudioBuffer) => {
					const audioCoordinates: string[] = audioService.sampleAudioData(buffer);
					workerInstanceCreateSample.postMessage(
						{
							audioFile: file,
							audioCoordinates,
							packId,
							canvas: offscreen,
							cssCanvasWidth: 550,
							cssCanvasHeight: 50,
							dpr: 2,
							fileId,
							duration: buffer.duration,
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
