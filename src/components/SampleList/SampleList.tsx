import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectSamples } from '../../store/selectors/packsSelectors';
import { Samples } from '../../store/slices/samples/types';
import { Loader } from '../Loader/Loader';
import { SampleItem } from '../SampleItem/SampleItem';

import styles from './SampleList.module.scss';

export const SampleList = () => {
	const samples = useSelector(selectSamples);

	return (
		<>
			<div className={styles.sampleList}>
				{samples?.map((sample: Samples, index: number) => {
					return <SampleItem key={sample._id} sample={sample} idx={index} />;
				})}
			</div>
		</>
	);
};
