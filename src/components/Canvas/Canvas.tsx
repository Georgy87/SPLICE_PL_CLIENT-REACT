import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectPackId } from '../../store/selectors/samplesSelectors';
import { audioService } from '../../services/audioService';
import { workerInstanceCreateSample } from '../../workers/WebWorkerEnabler';
import { canvasService } from '../../services/canvasService';
import { deleteSampleFiles } from '../../store/slices/samples/samplesSlice';
import { createSamples } from '../../utils/createSamples';
import { detectBrowser } from '../../utils/detectBrowser';

type PropsType = {
	file: File;
	fileId: string;
};

export const Canvas: React.FC<PropsType> = ({ file, fileId }) => {
	const packId = useSelector(selectPackId);

	const browser = detectBrowser();

	const dispatch = useDispatch();

	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef?.current;

		const reader: FileReader = new FileReader();

		reader.readAsArrayBuffer(file);

		reader.onload = async function() {
			const arrayBuffer: any = reader.result;
			if (!arrayBuffer) return;

			if (canvasRef?.current) {
				const offscreen = canvasRef?.current.transferControlToOffscreen();

				window.AudioContext = window.AudioContext || new window.webkitAudioContext();
				const audioContext = new AudioContext();
				const reader = new FileReader();

				reader.readAsArrayBuffer(file);

				reader.onload = function() {
					const arrayBuffer: any = reader.result;
					if (!arrayBuffer) return;
					audioContext.decodeAudioData(arrayBuffer).then(async (buffer: AudioBuffer) => {
						const audioCoordinates: any = audioService.sampleAudioData(buffer);

						if (browser === 'Safari') {
							const dataToSampleCreate = canvasService.drawingCanvasToImage(
								file,
								audioCoordinates,
								packId,
								canvas,
								fileId,
								buffer.duration,
							);

							if (!dataToSampleCreate) return;

							const id = await createSamples(dataToSampleCreate);

							dispatch(deleteSampleFiles(id));
						}

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
		};
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
