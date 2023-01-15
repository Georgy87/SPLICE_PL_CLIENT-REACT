import React from 'react';
import { useSelector } from 'react-redux';

import { selectSamplesFiles } from '@selectors/samplesSelectors';
import { Canvas } from '@components/Canvas';

export const CanvasList = () => {
	const sampleFiles = useSelector(selectSamplesFiles);
	return (
		<>
			{sampleFiles.map((files: { id: string; file: File }, idx: number) => {
				const { file, id } = files;
				return <Canvas file={file} fileId={id} key={idx} />;
			})}
		</>
	);
};
