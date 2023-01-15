import { FC } from 'react';
import { useSound } from '@hooks/useSound';

import styles from './SliderProgress.module.scss';

interface SliderProgressProps {
    width: string;
    sliderType: 'volume' | 'currentTime';
}

export const SliderProgress: FC<SliderProgressProps> = ({ width, sliderType }) => {
    const { volume, packPercent, changeVolume, changeCurrentTime } = useSound();

    return (
        <div className={styles.slider}>
            {sliderType === 'volume' ? (
                <input style={{ width: width }} type="range" onChange={changeVolume} defaultValue={volume}></input>
            ) : (
                <input
                    style={{ width: width }}
                    type="range"
                    value={String(packPercent)}
                    onChange={changeCurrentTime}
                    // min='0'
                    // max='100'
                ></input>
            )}
        </div>
    );
};
