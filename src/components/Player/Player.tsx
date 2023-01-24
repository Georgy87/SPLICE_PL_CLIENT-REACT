import { FC } from 'react';

import { SliderProgress } from '@components/SliderProgress';
import { IconChangeLayout } from '@layouts/IconChangeLayout';
import { formatTime } from '@utils/formatTime';
import { useSound } from '@hooks/useSound';
import { Loader } from '@components/Kit/Loader';
import { Image } from '@components/Kit/Image';

import styles from './Player.module.scss';

export const Player: FC = () => {
    const { packPercent, active, isPlaying, duration, currentTime, play } = useSound();

    if (!active) {
        return null;
    }

    return (
        <div className={styles.player}>
            {packPercent > 0 ? <SliderProgress sliderType="currentTime" width="94vw" /> : <Loader />}
            <div className={styles.playerControls}>
                <div className={styles.play}>
                    <IconChangeLayout onClicked={play} iconOneOrTwo={isPlaying} size="42px" color="#03f" />
                </div>

                <div className={styles.trackActive}>
                    <Image src={`${active?.picture}`} alt="active-info" />
                    <div className={styles.trackInfo}>
                        <div>{active?.name}</div>
                        <div>{active?.genre}</div>
                    </div>
                </div>

                <div className={styles.volumeAndTimer}>
                    <div className={styles.timer}>
                        <span>{formatTime(currentTime)}</span>
                        <span> / </span>
                        <span>{formatTime(duration)}</span>
                    </div>
                    <SliderProgress width="65px" sliderType="volume" />
                </div>
            </div>
        </div>
    );
};
