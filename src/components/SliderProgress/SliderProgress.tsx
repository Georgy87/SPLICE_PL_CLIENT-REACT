import React from 'react';
import Slider from '@material-ui/core/Slider';

import styles from './SliderProgress.module.scss';

interface SliderProgressProps {
	left?: number;
	right?: number;
	onChange: any;
	width: string;
}

export const SliderProgress: React.FC<SliderProgressProps> = ({
	left,
	right,
	onChange,
	width,
}) => {

	return (
		<div className={styles.slider}>
			<Slider
				min={0}
				max={right}
				value={left}
				style={{ width }}
				onChange={onChange}
			/>
		</div>
	);
};
