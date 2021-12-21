import React from 'react';
import Slider from '@material-ui/core/Slider';

import styles from './SliderProgress.module.scss';

interface SliderProgressProps {
	volume?: number;
	right?: number;
	onChange: any;
	width: string;
	sliderType: 'volume' | 'currentTime';
	currentTime?: number;
}

export const SliderProgress: React.FC<SliderProgressProps> = ({
	volume,
	currentTime,
	onChange,
	width,
	sliderType,
	right,
}) => {

	return (
		<div className={styles.slider}>
			{sliderType === 'volume' ? (
				<input
					style={{ width: width }}
					type='range'
					onChange={onChange}
				
					// min={volume}
					// max='100'
				></input>
			) : (
				<input
					style={{ width: width }}
					type='range'
					value={currentTime}
					onChange={onChange}
					min='0'
					max={String(right)}
				></input>
			)}
		</div>
	);
};
