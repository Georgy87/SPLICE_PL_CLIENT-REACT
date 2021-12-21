import { useContext } from 'react';

import { PlayerContext } from '../context/PlayerContext';
import { PlayerStateType } from '../context/PlayerContextProvider/types';

export const useSound = () => {
	const [playerState, setPlayerState] = useContext(PlayerContext);
	let myReq: any;

	// const {
	// 	packs,
	// 	samples,
	// 	audioPlayer,
	// 	isPlaying,
	// 	currentTime,
	// 	duration,
	// 	currentTrackIndex,
	// 	volume,
	// 	percent,
	// } = playerState;

	const playTrack = (index: number, typeElement: string) => {
		if (index === playerState.currentTrackIndex) {
			play();
		
		} else {
			let url =
				typeElement === 'packs'
					? `/${playerState.packs[index]?.audio}`
					: `/${playerState?.samples[index]?.audio}`;

			playerState.audioPlayer.pause();
			playerState.audioPlayer = new Audio(url);

			playerState.audioPlayer.volume = playerState.volume / 100;

			playerState.audioPlayer.onloadedmetadata = () => {
				setPlayerState((state: PlayerStateType) => ({
					...state,
					duration: Math.ceil(state.audioPlayer.duration),
				}));
			};

			// playerState.audioPlayer.ontimeupdate = () => {
			// 	setPlayerState((state: PlayerStateType) => ({
			// 		...state,
			// 		currentTime: state.audioPlayer.currentTime,
			// 		packCurrentTime: state.audioPlayer.currentTime,
			// 		percent: (550 / state.audioPlayer.duration) * state.audioPlayer.currentTime,
			// 	}));
			// };

		
			//@ts-ignore
			function step() {
				setPlayerState((state: PlayerStateType) => ({
					...state,
					currentTime: state.audioPlayer.currentTime,
					packCurrentTime: state.audioPlayer.currentTime,
					percent: (550 / state.audioPlayer.duration) * state.audioPlayer.currentTime,
				}));
			
				myReq = window.requestAnimationFrame(step);
				console.log('test')
			}

			myReq = window.requestAnimationFrame(step);

			playerState.audioPlayer.play();

			setPlayerState((state: PlayerStateType) => ({
				...state,
				currentTrackIndex: index,
				isPlaying: true,
			}));
			
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
				cancelAnimationFrame(myReq);
			};
		}
	};

	const play = () => {
		if (playerState.isPlaying) {
			cancelAnimationFrame(myReq);
			playerState.audioPlayer.pause();
		
		} else {
			playerState.audioPlayer.play();
			cancelAnimationFrame(myReq);
		}
		setPlayerState((playerState: PlayerStateType) => ({
			...playerState,
			isPlaying: !playerState.isPlaying,
		}));
	};

	const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		playerState.audioPlayer.volume = Number(e.target.value) / 100;
	};

	const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
		playerState.audioPlayer.currentTime = Number(e.target.value);
	};

	const changeCurrentTimeSample = (e: React.MouseEvent) => {
		playerState.audioPlayer.currentTime =
			(playerState.audioPlayer.duration / 550) * (e.clientX - 184);
	};

	return {
		packs: playerState.packs,
		isPlaying: playerState.isPlaying,
		currentPackId:
			playerState.currentTrackIndex !== null &&
			playerState.packs?.[playerState.currentTrackIndex]?._id,
		currentSampleId:
			playerState.currentTrackIndex !== null &&
			playerState.samples?.[playerState.currentTrackIndex]?._id,
		active:
			playerState.currentTrackIndex !== null &&
			playerState.packs?.[playerState.currentTrackIndex],
		duration: playerState.duration,
		currentTime: playerState.currentTime,
		packCurrentTime: playerState.packCurrentTime,
		volume: playerState.volume,
		playerState,
		percent: playerState.percent,
		playTrack,
		play,
		changeVolume,
		changeCurrentTime,
		setPlayerState,
		changeCurrentTimeSample,
	};
};
