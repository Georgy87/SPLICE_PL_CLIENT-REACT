import { useSelector } from 'react-redux';
import { FC } from 'react';

import { selectLikedSamples } from '@selectors/userSelectors';
import { Samples } from '@slices/samples/types';

import styles from './SequencerSampleList.module.scss';

type PropsType = {
    onClicked: (sampleAudio: string) => void;
};

export const SequencerSampleList: FC<PropsType> = ({ onClicked }: any) => {
    const likedSamples = useSelector(selectLikedSamples);
    return (
        <div className={styles.samplesContainer}>
            {likedSamples?.map((samples: Samples) => {
                return (
                    <ul
                        key={samples._id}
                        className={styles.likesSample}
                        draggable={true}
                        onClick={() => onClicked(samples.audio)}
                    >
                        <li>
                            <img src={samples.packPicture} alt="likes-sample" />
                            <p>{samples.sampleName}</p>
                        </li>
                    </ul>
                );
            })}
        </div>
    );
};
