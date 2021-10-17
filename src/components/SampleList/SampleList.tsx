import React, { useContext } from 'react';

import { SamplesContext } from '../../context/Context';
import { PlayerSamplesContext } from '../../context/SamplesPlayerContext/SamplesPlayerContext';
import { Samples } from '../../context/SamplesPlayerContext/types';
import { selectSamples } from '../../store/selectors/packsSelectors';
import { SampleItem } from '../SampleItem/SampleItem';

import styles from './SampleList.module.scss';

export const SampleList = () => {
    const [ state, setState ] = useContext(
        SamplesContext
    );
    
	return (
		<div className={styles.sampleList}>
			{/* {samples?.map((sample: Samples) => {
				return <SampleItem key={sample._id} samples={samples} />;
			})} */}
		</div>
	);
};
