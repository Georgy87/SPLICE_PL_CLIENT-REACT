import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useAction';
import { selectAudio } from '../../store/selectors/playerSelectors';
import TrackProgress from '../TrackProgress/TrackProgress';
import { IconChangeLayout } from '../../layouts/IconChangeLayout/IconChangeLayout';

import styles from './Player.module.scss';
import { formatTime } from '../../utils/formatTime';

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

	const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		audio.volume = Number(e.target.value) / 100;
		setVolume(Number(e.target.value));
	};

	const changeCurrentTime = (
		e: React.MouseEvent,
		value: number,
	) => {
		audio.currentTime = Number(value);
		setCurrentTime(Number(value));
	};

	if (!active) {
		return null;
	}

	return (
		<div className={styles.player}>
			<TrackProgress
				// left={currentTime}
				right={currentTime}
				onChange={changeCurrentTime}
			/>
			<div className={styles.playerControls}>
				<IconChangeLayout
					onClicked={play}
					blockStyle={styles.playPauseCircle}
					iconOneOrTwo={pause}
					iconOne='play-footer'
					iconTwo='pause-footer'
					typeBtn='footer'
					iconStyle={{
						color: '#fff',
						fontSize: '60px',
						cursor: 'pointer',
					}}
				></IconChangeLayout>
			</div>
			<div className='playback-widgets'>
				<div className='timer'>
					<p>
						<span>{formatTime(currentTime)}</span>/
						<span>{formatTime(duration)}</span>
					</p>
				</div>
			</div>
			<div>
				<div>{active?.name}</div>
				<div style={{ fontSize: 12, color: 'gray' }}>
					{active?.artist}
				</div>
			</div>

			<button style={{ marginLeft: 'auto' }}>Vol</button>
			{/* <TrackProgress left={volume} right={100} onChange={changeVolume} /> */}
		</div>
	);
};
