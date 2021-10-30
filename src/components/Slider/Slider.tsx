import React, { InputHTMLAttributes, useEffect, useState } from 'react';

import { useSound } from '../../hooks/useSound';

import styles from './Slider.module.scss';

export const Slider = (props: any) => {
	const { percent, changeCurrentTimeSample } = useSound();

	return (
		<>
			<div className={styles.sliderContainer}>
				<div className={styles.formElement}>
					<input
						type='range'
						// min='0'
						// max='100'
						// step='0.01'
						value={
							props.trackId === props.currentSampleId
								? percent
								: 0
						}
						onChange={changeCurrentTimeSample}
					></input>
					<div className={styles.sliderWave}>{props.children}</div>
				</div>
			</div>
		</>
	);
};
