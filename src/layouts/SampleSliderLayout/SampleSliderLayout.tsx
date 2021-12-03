import React from 'react';

import { useSound } from '../../hooks/useSound';

import styles from './SampleSliderLayout.module.scss';

type PropsType = {
	trackId?: string | null;
	currentSampleId?: string | false;
	children: React.ReactNode;
	width: string;
};

export const SampleSliderLayout: React.FC<PropsType> = ({
	children,
	trackId,
	currentSampleId,
	width,
}) => {
	const { percent, changeCurrentTimeSample } = useSound();

	return (
		<>
			<div className={styles.sliderContainer}>
				<div className={styles.formElement}>
					<input
						style={{ width: width }}
						type='range'
						// min='0'
						// max='100'
						// step='0.01'
						value={trackId === currentSampleId ? percent : 0}
						onChange={changeCurrentTimeSample}
					></input>
					<div className={styles.sliderWave}>{children}</div>
				</div>
			</div>
		</>
	);
};
