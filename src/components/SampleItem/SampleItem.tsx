import React, { useContext } from 'react';
import { SamplesContext } from '../../context/Context';

import {
	Samples,
	SamplesPlayerStateType,
} from '../../context/SamplesPlayerContext/types';

import styles from './SampleItem.module.scss';
import { waveSurfer } from '../SamplePlayer/SamplePlayer';

type PropsType = {
	sample: Samples;
	idx: number;
};

export const SampleItem: React.FC<PropsType> = ({ sample, idx }) => {
	const [state, setState] = useContext(SamplesContext);

	const { samples, active, currentId } = state;
	const playSample = () => {
		if (idx !== currentId) {
			setState((state: SamplesPlayerStateType) => ({
				...state,
				currentId: idx,
			}));
		} else {
			// waveSurfer.playPause();

			setState((state: SamplesPlayerStateType) => ({
				...state,
				isPlaying: waveSurfer?.isPlaying(),
			}));
		}
	};

	return (
		<div>
			<ul>
				<li>
				
					<div onClick={playSample}>
						{sample.sampleName}
						{/* {currentId === index ? <div>Play</div> : <div>Pause</div>} */}
					</div>

				</li>
			</ul>
		</div>
	);
};
