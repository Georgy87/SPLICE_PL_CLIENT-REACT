import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { Samples } from '../../store/slices/samples/types';
import { sampleCategories } from '../AddSampleInfoModal/sampleCategories';
import { Loader } from '../Loader/Loader';
import { SampleItem } from '../SampleItem/SampleItem';

import styles from './SampleList.module.scss';

type PropsType = {
	samples?: Samples[];
};

export const SampleList: React.FC<PropsType> = ({ samples }) => {
	return (
		<>
			<div className={styles.sampleList}>
				<div className={styles.samplesLabel}>
					<div className={styles.sample}>Sample</div>
					<div className={styles.tags}>
						{sampleCategories.map((tags: string) => {
							return <ButtonLayout typeStyle="tags">{tags}</ButtonLayout>;
						})}
					</div>
					<div className={styles.bpm}>Bpm</div>
				</div>
				{samples?.map((sample: Samples, index: number) => {
					return <SampleItem key={sample._id} sample={sample} idx={index} />;
				})}
			</div>
		</>
	);
};
