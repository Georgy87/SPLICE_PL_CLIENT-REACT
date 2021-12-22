import React from 'react';

import { SliderProgress } from '../SliderProgress/SliderProgress';
import { IconChangeLayout } from '../../layouts/IconChangeLayout/IconChangeLayout';
import { formatTime } from '../../utils/formatTime';
import { useSound } from '../../hooks/useSound';

import styles from './Player.module.scss';

export const Player: React.FC = () => {
	const { active, isPlaying, duration, currentTime, play } = useSound();

	if (!active) {
		return null;
	}

	return (
		<div className={styles.player}>
			<SliderProgress sliderType='currentTime' width='98vw' />
			<div className={styles.playerControls}>
				<div className={styles.play}>
					{
						<IconChangeLayout
							onClicked={play}
							blockStyle={styles.playPauseCircle}
							iconOneOrTwo={isPlaying}
							iconOne='play-footer'
							iconTwo='pause-footer'
							typeBtn='footer'
							iconStyle={{
								color: '#1d1b3b',
								fontSize: '35px',
								cursor: 'pointer',
							}}
						></IconChangeLayout>
					}
				</div>

				<div className={styles.trackActive}>
					<img src={`${active?.picture}`} alt='active-info' />
					<div className={styles.trackInfo}>
						<div>{active?.name}</div>
						<div>{active?.genre}</div>
					</div>
				</div>

				<div className={styles.volumeAndTimer}>
					<div className={styles.timer}>
						<p>
							<span>{formatTime(currentTime)}/</span>
							<span>{formatTime(duration)}</span>
						</p>
					</div>
					<SliderProgress width='10rem' sliderType='volume' />
				</div>
			</div>
		</div>
	);
};
