import React, { useContext, useEffect } from 'react';

import { SliderProgress } from '../SliderProgress/SliderProgress';
import { IconChangeLayout } from '../../layouts/IconChangeLayout/IconChangeLayout';
import { formatTime } from '../../utils/formatTime';
import { useSound } from '../../hooks/useSound';

import styles from './Player.module.scss';

export const Player: React.FC = () => {
	const {
		play,
		active,
		isPlaying,
		volume,
		duration,
		currentTime,
		changeVolume,
		changeCurrentTime,
	} = useSound();

	if (!active) {
		return null;
	}

	return (
		<div className={styles.player}>
			<SliderProgress
				left={currentTime}
				right={duration}
				onChange={changeCurrentTime}
				width={'98vw'}
			/>
			<div className={styles.playerControls}>
				<div className={styles.play}>
					{
						//@ts-ignore
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
					<img
						src={`http://localhost:5000/${active?.picture}`}
						alt='active-info'
					/>
					<div className={styles.trackInfo}>
						<div>{active?.authorName}</div>
						<div>{active?.trackName}</div>
					</div>
				</div>

				<div className={styles.volumeAndTimer}>
					<div className={styles.timer}>
						<p>
							<span>{formatTime(currentTime)}/</span>
							<span>{formatTime(duration)}</span>
						</p>
					</div>
					<SliderProgress
						left={volume}
						right={100}
						onChange={changeVolume}
						width={'15vw'}
					/>
				</div>
			</div>
		</div>
	);
};
