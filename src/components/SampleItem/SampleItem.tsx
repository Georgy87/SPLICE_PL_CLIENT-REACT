import React from 'react';

import {
	Samples,
} from '../../context/SamplesPlayerContext/types';
import { useSampleSound } from '../../hooks/useSampleSound';

import styles from './SampleItem.module.scss';

type PropsType = {
	sample: Samples;
	idx: number;
};

export const SampleItem: React.FC<PropsType> = ({ sample, idx }) => {
	const { playSample, currentId, isPlaying } = useSampleSound();

	return (
		<div>
			<ul>
				<li>
					{
						//@ts-ignore
						<div onClick={() => playSample(idx)}>
							{sample.sampleName}
							{isPlaying && currentId === idx ? <div>pause</div> : <div>play</div>}
						</div>
					}
				</li>
			</ul>
		</div>
	);
};
