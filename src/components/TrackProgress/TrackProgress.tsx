import Slider from '@material-ui/core/Slider';
import React from 'react';

interface TrackProgressProps {
	left?: number;
	right?: number;
	onChange: any;
}

const TrackProgress: React.FC<TrackProgressProps> = ({
	left,
	right,
	onChange,
}) => {
	return (
		<div style={{ display: 'flex', width: '100%' }}>
			<Slider
				// min={0}
				// max={right}
				value={right}
				style={{ width: '100%' }}
				onChange={onChange}
			/>
			{/* <div>
				{left} / {right}
			</div> */}
		</div>
	);
};

export default TrackProgress;
