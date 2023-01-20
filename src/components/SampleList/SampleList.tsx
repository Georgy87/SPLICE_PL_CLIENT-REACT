import React from 'react';
import { useSelector } from 'react-redux';

import { ButtonLayout } from '@layouts/ButtonLayout';
import { HorizontalSkeletonLayout } from '@layouts/HorizontalSkeletonLayout';
import { selectTag } from '@selectors/packsSelectors';
import { setTag } from '@slices/pack/packSlice';
import { Samples } from '@slices/samples/types';
import { useAppDispatch } from '@store/types';
import { sampleCategories } from '@components/AddSampleInfoModal/sampleCategories';
import { SampleItem } from '@components/SampleItem';

import styles from './SampleList.module.scss';

type PropsType = {
    samples?: Samples[] | null;
    pageName?: string;
};

export const SampleList: React.FC<PropsType> = ({ samples, pageName }) => {
    const packTag = useSelector(selectTag);

    const dispatch = useAppDispatch();

    const onSetTag = (tag: string) => {
        if (tag !== packTag) {
            dispatch(setTag(tag));
        } else {
            dispatch(setTag(null));
        }
    };

    const sceleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => <HorizontalSkeletonLayout key={index} />);

    return (
        <>
            <div className={styles.samplesLabel}>
                <div className={styles.sample}>Sample</div>
                {pageName != 'liked-samples-page' && (
                    <div className={styles.tags}>
                        {sampleCategories.map((tag: string, index: number) => {
                            return (
                                <ButtonLayout key={index} typeStyle="tags" onClicked={() => onSetTag(tag)}>
                                    {tag}
                                </ButtonLayout>
                            );
                        })}
                    </div>
                )}
                <div className={styles.bpm}>Bpm</div>
            </div>

            {samples
                ? samples?.map((sample: Samples, index: number) => {
                      return <SampleItem key={sample._id} sample={sample} idx={index} />;
                  })
                : sceleton}
        </>
    );
};
