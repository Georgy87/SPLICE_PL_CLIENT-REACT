import { useContext, useState } from 'react';

import { Context } from '../context/Context';
import { PlayerStateType } from '../context/PlayerContext/types';

export const useSound = () => {
	const [state, setState] = useContext(Context);

	const playTrack = (index: number, typeElement: string) => {
		if (index === state.currentTrackIndex) {
			play();
		} else {
			const url =
				typeElement === 'packs'
					? `http://localhost:5000/${state.packs[index]?.audio}`
					: `http://localhost:5000/${state?.samples[index]?.audio}`;
		
			state.audioPlayer.pause();
			state.audioPlayer = new Audio(url);

			state.audioPlayer.volume = state.volume / 100;

			state.audioPlayer.onloadedmetadata = () => {
				setState((state: PlayerStateType) => ({
					...state,
					duration: Math.ceil(state.audioPlayer.duration),
				}));
			};

			state.audioPlayer.ontimeupdate = () => {
				setState((state: PlayerStateType) => ({
					...state,
					currentTime: Math.ceil(state.audioPlayer.currentTime),
					percent: Number(
						(100 / state.duration * state.currentTime)
					),
				}));
				console.log(state.audioPlayer.currentTime )
			};

			state.audioPlayer.play();

			setState((state: PlayerStateType) => ({
				...state,
				currentTrackIndex: index,
				isPlaying: true,
			}));

			state.audioPlayer.onended = () => {
				setState((state: PlayerStateType) => ({
					...state,
					audioPlayer: new Audio(),
					currentTrackIndex: null,
					isPlaying: false,
					currentTrackId: null,
					active: null,
					duration: 0,
					currentTime: 0,
					volume: 2,
					percent: 0,
				}));
			};
		}
	};

	const play = () => {
		if (state.isPlaying) {
			state.audioPlayer.pause();
		} else {
			state.audioPlayer.play();
		}
		setState((state: PlayerStateType) => ({
			...state,
			isPlaying: !state.isPlaying,
		}));
	};

	const changeVolume = (e: React.MouseEvent, value: number) => {
		setState((state: PlayerStateType) => ({
			...state,
			volume: Number(value),
		}));

		state.audioPlayer.volume = Number(value) / 100;
	};

	const changeCurrentTime = (e: React.MouseEvent, value: number) => {
		setState((state: PlayerStateType) => ({
			...state,
			currentTime: Number(value),
		}));

		state.audioPlayer.currentTime = Number(value);
	
	};

	const changeCurrentTimeSample = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setState((state: PlayerStateType) => ({
			...state,
			// currentTime: Number(e.target.value),
			percent: e.target.value,
		}));

		state.audioPlayer.currentTime =
			(state.audioPlayer.duration / 100) * +e.target.value;
		
	};

	return {
		playTrack,
		play,
		packs: state.packs,
		isPlaying: state.isPlaying,
		currentPackId:
			state.currentTrackIndex !== null &&
			state.packs?.[state.currentTrackIndex]?._id,
		currentSampleId:
			state.currentTrackIndex !== null &&
			state.samples?.[state.currentTrackIndex]?._id,
		active:
			state.currentTrackIndex !== null &&
			state.packs?.[state.currentTrackIndex],
		duration: state.duration,
		currentTime: state.currentTime,
		volume: state.volume,
		changeVolume,
		changeCurrentTime,
		state,
		setState,
		percent: state.percent,
		changeCurrentTimeSample,
	};
};
