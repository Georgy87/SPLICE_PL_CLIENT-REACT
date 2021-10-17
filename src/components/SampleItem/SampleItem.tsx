import React from 'react';
import { Samples } from '../../context/SamplesPlayerContext/types';

import styles from './SampleItem.module.scss';

type PropsType = {
    samples: Samples;
}
export const SampleItem: React.FC<PropsType> = () => {
	return (
		<div className={styles.sampleList}>
			<ul>
				<li>
                  
                </li>
			</ul>
		</div>
	);
};
