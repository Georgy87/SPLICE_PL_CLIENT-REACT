import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useAction';
import { selectAudio } from '../../store/selectors/playerSelectors';
import { SliderProgress } from '../SliderProgress/SliderProgress';
import { IconChangeLayout } from '../../layouts/IconChangeLayout/IconChangeLayout';

import { formatTime } from '../../utils/formatTime';

import styles from './Player.module.scss';

export const Player: React.FC = () => {
	const audio = useSelector(selectAudio);

	const {
		playTrack,
		pauseTrack,
		setDuration,
		setCurrentTime,
		setVolume,
		setAudio,
		setAudioPlay,
		setAudioPause,
		setAudioSrc,
	} = useActions();

	const { pause, volume, active, duration, currentTime } = useTypedSelector(
		(state) => state.player,
	);

	useEffect(() => {
		if (!audio) {
			setAudio(new Audio());
		} else {
			setAudioVal();
			play();
		}
	}, [active]);

	const setAudioVal = async () => {
		if (active) {
			await setAudioSrc('http://localhost:5000/' + active.audio);
			audio.volume = volume / 100;
			audio.onloadedmetadata = () => {
				setDuration(Math.ceil(audio.duration));
			};
			audio.ontimeupdate = () => {
				setCurrentTime(Math.ceil(audio.currentTime));
			};
		}
	};

	const play = () => {
		if (pause) {
			playTrack();
			setAudioPlay();
		} else {
			pauseTrack();
			setAudioPause();
		}
	};

	const changeVolume = (e: React.MouseEvent, value: number) => {
		audio.volume = Number(value) / 100;
		setVolume(Number(value));
	};

	const changeCurrentTime = (e: React.MouseEvent, value: number) => {
		audio.currentTime = Number(value);
		setCurrentTime(Number(value));
	};

	if (!active) {
		return null;
	}

	return (
		<div className={styles.player}>
			<SliderProgress
				left={currentTime}
				right={duration}
				onChange={changeCurrentTime}
				width={'78%'}
			/>
			<div className={styles.playerControls}>
				<div className={styles.play}>
					<IconChangeLayout
						onClicked={play}
						blockStyle={styles.playPauseCircle}
						iconOneOrTwo={pause}
						iconOne='play-footer'
						iconTwo='pause-footer'
						typeBtn='footer'
						iconStyle={{
							color: '#1d1b3b',
							fontSize: '35px',
							cursor: 'pointer',
						}}
					></IconChangeLayout>
				</div>

				<div className={styles.trackActive}>
					<div>{active?.authorName}</div>
					<div>{active?.trackName}</div>
				</div>

				<div className={styles.volumeAndTimer}>
					<div className='timer'>
						<p>
							<span>{formatTime(currentTime)}</span>/
							<span>{formatTime(duration)}</span>
						</p>
					</div>
					<SliderProgress
						left={volume}
						right={100}
						onChange={changeVolume}
						width={'30%'}
					/>
				</div>
			</div>
		</div>
	);
};
