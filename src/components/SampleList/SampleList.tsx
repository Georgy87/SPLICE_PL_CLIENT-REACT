import React, { useContext } from 'react';
import { Samples } from '../../context/SamplesPlayerContext/types';

import { useSampleSound } from '../../hooks/useSampleSound';
import { SampleItem } from '../SampleItem/SampleItem';

import styles from './SampleList.module.scss';

export const SampleList = () => {
    const { samples } = useSampleSound();

	return (
		<div className={styles.sampleList}>
			{samples?.map((sample: Samples, index: number) => {
				return <SampleItem key={sample._id} sample={sample} idx={index} />;
			})}
		</div>
	);
};
