import React from 'react';
import { useSelector } from 'react-redux';

import { Samples } from '../../context/SamplesPlayerContext/types';
import { useSampleSound } from '../../hooks/useSampleSound';
import { IconChangeLayout } from '../../layouts/IconChangeLayout/IconChangeLayout';
import { selectPackProfile } from '../../store/selectors/packsSelectors';

import styles from './SampleItem.module.scss';

type PropsType = {
	sample: Samples;
	idx: number;
};

export const SampleItem: React.FC<PropsType> = ({ sample, idx }) => {
	const { playSample, currentId, isPlaying } = useSampleSound();
	const packProfile = useSelector(selectPackProfile);

	return (
		<>
			<ul className={styles.listItem}>
				<li>
					<img src={`http://localhost:5000/${packProfile?.picture}`} alt={packProfile?.picture} />
					<IconChangeLayout
						onClicked={() => playSample(idx)}
						iconOneOrTwo={isPlaying}
						currentTrackId={currentId}
						trackId={idx}
						iconOne='play'
						iconTwo='pause'
						typeBtn='sample-item'
						iconStyle={{
							color: '#49c5b6',
							fontSize: '35px',
							cursor: 'pointer',
						}}
					></IconChangeLayout>
					<p>{sample.sampleName}</p>
				</li>
			</ul>
		</>
	);
};
