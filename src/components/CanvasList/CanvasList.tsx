import React from 'react';
import { useSelector } from 'react-redux';

import { selectSamplesFiles } from '../../store/selectors/samplesSelectors';
import { Canvas } from '../Canvas/Canvas';


export const CanvasList = () => {
	const sampleFiles = useSelector(selectSamplesFiles);
	
	return (
		<>
			{sampleFiles &&
				Object.values(sampleFiles[0]).map((file: File, idx: number) => {
					return <Canvas file={file} key={idx} />;
				})}
		</>
	);
};
