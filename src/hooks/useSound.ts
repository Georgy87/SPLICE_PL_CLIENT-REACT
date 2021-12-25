import { useContext } from 'react';

import { PlayerContext } from '../context/PlayerContext';
import { PlayerStateType } from '../context/PlayerContextProvider/types';

export const useSound = () => {
	const [playerState, setPlayerState] = useContext(PlayerContext);

	let requestID: number = 0;
	const canvasWidth: number = 550;

	let {
		packs,
		samples,
		isPlaying,
		currentTime,
		duration,
		currentTrackIndex,
		volume,
		percent,
		packCurrentTime,
		packPercent,
	} = playerState;

	const playTrack = (index: number, typeElement: string) => {
		if (index === currentTrackIndex) return play();

		let url =
			typeElement === 'packs'
				? `/${packs[index]?.audio}`
				: `/${samples[index]?.audio}`;

		playerState.audioPlayer.pause();
		playerState.audioPlayer = new Audio(url);

		playerState.audioPlayer.volume = volume / 100;

		playerState.audioPlayer.onloadedmetadata = () => {
			setPlayerState((state: PlayerStateType) => ({
				...state,
				duration: Math.ceil(state.audioPlayer.duration),
			}));
		};

		playerState.audioPlayer.play();

		playerState.audioPlayer.onplay = () => {
	
			setPlayerState((state: PlayerStateType) => ({
				...state,
				currentTrackIndex: index,
				isPlaying: true,
			}));
			onTimeUpdate();
		};

		playerState.audioPlayer.onpause = () => {
			cancelAnimationFrame(requestID);
		};

		playerState.audioPlayer.onended = () => {
			setPlayerState((state: PlayerStateType) => ({
				...state,
				audioPlayer: new Audio(),
				currentTrackIndex: null,
				isPlaying: false,
				currentTrackId: null,
				active: null,
				duration: 0,
				currentTime: 0,
				packCurrentTime: 0,
				volume: 2,
				percent: 0,
			}));
			cancelAnimationFrame(requestID);
		};
	};

	const play = () => {
		if (playerState.isPlaying) {
			playerState.audioPlayer.pause();
		} else {
			playerState.audioPlayer.play();
		}
		setPlayerState((state: PlayerStateType) => ({
			...state,
			isPlaying: !playerState.isPlaying,
		}));
	};

	const onTimeUpdate = () => {
		setPlayerState((state: PlayerStateType) => {
			const { audioPlayer } = state;
			return {
				...state,
				currentTime: audioPlayer.currentTime,
				packCurrentTime: audioPlayer.currentTime,
				percent: (canvasWidth / audioPlayer.duration) * audioPlayer.currentTime,
				packPercent: (100 / audioPlayer.duration) * audioPlayer.currentTime,
			};
		});
		requestID = window.requestAnimationFrame(onTimeUpdate);
	};

	const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		playerState.audioPlayer.volume = Number(e.target.value) / 100;
	};

	const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
		playerState.audioPlayer.currentTime =
			(playerState.audioPlayer.duration / 100) * Number(e.target.value);
	};

	const changeCurrentTimeSample = (e: React.MouseEvent, canvasOffSetLeft: number) => {
		playerState.audioPlayer.currentTime =
			(playerState.audioPlayer.duration / canvasWidth) * (e.clientX - canvasOffSetLeft);
	};

	return {
		packs: packs,
		isPlaying: isPlaying,
		currentPackId: currentTrackIndex !== null && packs?.[currentTrackIndex]?._id,
		currentSampleId: currentTrackIndex !== null && samples?.[currentTrackIndex]?._id,
		active: currentTrackIndex !== null && packs?.[currentTrackIndex],
		duration: duration,
		currentTime: currentTime,
		packCurrentTime: packCurrentTime,
		volume: volume,
		playerState,
		percent: percent,
		packPercent: packPercent,
		playTrack,
		play,
		changeVolume,
		changeCurrentTime,
		setPlayerState,
		changeCurrentTimeSample,
	};
};
