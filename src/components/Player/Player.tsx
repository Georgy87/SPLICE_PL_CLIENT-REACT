import React, { AudioHTMLAttributes, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useAction';
import { selectAudio } from '../../store/selectors/playerSelectors';
import TrackProgress from '../TrackProgress/TrackProgress';

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

	const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		audio.volume = Number(e.target.value) / 100;
		setVolume(Number(e.target.value));
	};

	const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
		audio.currentTime = Number(e.target.value);
		setCurrentTime(Number(e.target.value));
	};

	if (!active) {
		return null;
	}

	return (
		<div className={styles.player}>
			<button onClick={play}>
				{pause ? <button>Play</button> : <button>Pause</button>}
			</button>
			<div>
				<div>{active?.name}</div>
				<div style={{ fontSize: 12, color: 'gray' }}>
					{active?.artist}
				</div>
			</div>
			<TrackProgress
				left={currentTime}
				right={duration}
				onChange={changeCurrentTime}
			/>
			<button style={{ marginLeft: 'auto' }}>Vol</button>
			<TrackProgress left={volume} right={100} onChange={changeVolume} />
		</div>
	);
};
