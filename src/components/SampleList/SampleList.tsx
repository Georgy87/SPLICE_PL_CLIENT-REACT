import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { selectTag } from '../../store/selectors/packsSelectors';
import { setTag } from '../../store/slices/pack/packSlice';
import { Samples } from '../../store/slices/samples/types';
import { sampleCategories } from '../AddSampleInfoModal/sampleCategories';
import { SampleItem } from '../SampleItem/SampleItem';

import styles from './SampleList.module.scss';

type PropsType = {
	samples?: Samples[];
	pageName?: string;
};

export const SampleList: React.FC<PropsType> = ({ samples, pageName }) => {
	const packTag = useSelector(selectTag);

	const dispatch = useDispatch();

	const onSetTag = (tag: string) => {
		if (tag !== packTag) {
			dispatch(setTag(tag));
		} else {
			dispatch(setTag(null));
		}
	};

	return (
		<>
			<div className={styles.samplesLabel}>
				<div className={styles.sample}>Sample</div>
				{pageName != 'liked-samples-page' && <div className={styles.tags}>
					{sampleCategories.map((tag: string, index: number) => {
						return (
							<ButtonLayout key={index} typeStyle='tags' onClicked={() => onSetTag(tag)}>
								{tag}
							</ButtonLayout>
						);
					})}
				</div>}
				<div className={styles.bpm}>Bpm</div>
			</div>
			{samples?.map((sample: Samples, index: number) => {
				return <SampleItem key={sample._id} sample={sample} idx={index} />;
			})}
		</>
	);
};
