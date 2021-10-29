import React, { useEffect, useState } from 'react';

import { useSound } from '../../hooks/useSound';

import styles from './Slider.module.scss';

export const Slider = (props: any) => {
	const { percent } = useSound();
	console.log(props.trackId, props.currentSampleIdpercent);
	return (
		<>
			<div className={styles.sliderContainer}>
				{/* <div
					style={{
						position: 'absolute',
						left:
							props.trackId === props.currentSampleId
								? `${percent}%`
								: `${0}%`,
					}}
				>
					<div className={styles.sliderCursor}></div>
					<input
						type='range'
						value={0}
						step='0.01'
						className='range'
						style={{width: '400px', backgroundColor: 'transparent'}}

					/>
				</div> */}
				<div className={styles.center}>
					<div className={styles.formElement}>
						<div id='rangeValue'>50</div>
						<input
							type='range'
							min='0'
							max='100'
							value={
								props.trackId === props.currentSampleId
									? percent
									: 0
							}
						></input>
						<div className={styles.sliderWave}>
							{props.children}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
