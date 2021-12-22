import React from 'react';
import Slider from '@material-ui/core/Slider';

import styles from './SliderProgress.module.scss';
import { useSound } from '../../hooks/useSound';

interface SliderProgressProps {
	width: string;
	sliderType: 'volume' | 'currentTime';
}

export const SliderProgress: React.FC<SliderProgressProps> = ({
	width,
	sliderType,
}) => {

	const {
		volume,
		packPercent,
		percent,
		changeVolume,
		changeCurrentTime,
	} = useSound();
console.log(packPercent)
	return (
		<div className={styles.slider}>
			{sliderType === 'volume' ? (
				<input
					style={{ width: width }}
					type='range'
					onChange={changeVolume}
					defaultValue={volume}
				></input>
			) : (
				<input
					style={{ width: width }}
					type='range'
					value={packPercent}
					onChange={changeCurrentTime}
					// min='0'
					// max='100'
				></input>
			)}
		</div>
	);
};
