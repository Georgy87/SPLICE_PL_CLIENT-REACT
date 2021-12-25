import React from 'react';

import { useSound } from '../../hooks/useSound';

import styles from './SampleSliderLayout.module.scss';

type PropsType = {
	canvasOffSetLeft: number;
	trackId?: string | null;
	currentSampleId?: string | false;
	children: React.ReactNode;
	width: string;
};

export const SampleSliderLayout: React.FC<PropsType> = ({
	canvasOffSetLeft,
	children,
	trackId,
	currentSampleId,
}) => {
	const { percent, changeCurrentTimeSample } = useSound();
	
	return (
		<div className={styles.sliderContainer} onMouseUp={(e: React.MouseEvent) => changeCurrentTimeSample(e, canvasOffSetLeft)}>
			{/* {trackId === currentSampleId && (
				<div
					style={{
						left: `${percent}px`,
					}}
					className={styles.cursor}
				></div>
			)} */}
			<div className={styles.sliderWave}>{children}</div>
		</div>
	);
};
