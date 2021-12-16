import React, { MouseEventHandler, useRef } from 'react';

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
	const { percent, changeCurrentTimeSample, currentTime, duration } = useSound();
	
	return (
		<>
			<div className={styles.sliderContainer}>
				<div className={styles.formElement}>
					{trackId === currentSampleId && (
						// <input
						// 	onMouseMove={handleMouseMove}
						// 	style={{ width: width }}
						// 	type='range'
						// 	// step='0.01'
						// 	value={percent}
						// 	onChange={changeCurrentTimeSample}
						// ></input>
						<div
							style={{ width: '550px', height: '50px', position: 'absolute', zIndex: 5000 }}
							onMouseUp={changeCurrentTimeSample}
						>
							<div
								style={{
									position: 'absolute',
									height: '50px',
									left: `${percent}px`,
									backgroundColor: 'blue',
									width: '2px',
								}}
							></div>
						</div>
					)}
					<div className={styles.sliderWave}>{children}</div>
				</div>
			</div>
		</>
	);
};
