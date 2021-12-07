import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectSamplesFiles } from '../../store/selectors/samplesSelectors';
import { sendFileImages } from '../../utils/createSamples';
import WebWorker from '../../utils/WebWorker';
import WebWorkerEnabler from '../../utils/WebWorkerEnabler';
import { Canvas } from '../Canvas/Canvas';

import styles from './Canvas.module.scss';

export const CanvasList = () => {
	const sampleFiles = useSelector(selectSamplesFiles);

	return (
		<>
			{sampleFiles &&
				Object.values(sampleFiles[0]).map((file: File, idx: number) => {
					return <Canvas file={file} key={idx}/>;
				})}
		</>
	);
};
