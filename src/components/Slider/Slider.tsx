import React, { useEffect, useState } from 'react';

import { useSound } from '../../hooks/useSound';

import styles from './Slider.module.scss';

export const Slider = (props: any) => {
	const { percent, duration, state, bpmPercent} = useSound();

	useEffect(() => {
		// console.log(percent, duration);
		// console.log(state);
		console.log(state.bpmPercent);
	}, [state]);

	return (
		<div className={styles.sliderContainer}
			style={{
				width:
					props.trackId === props.currentSampleId
						? `${percent}%`
						: `${0}%`,
				
				height: '40px',
                borderRight: '1px solid red'
			}}
		>
			{props.children}
		</div>
	);
};
