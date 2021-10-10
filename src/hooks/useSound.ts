import { useContext } from 'react';

import { Context } from '../context/Context';
import { PlayerStateType } from '../context/types';

export const useSound = () => {
	const [state, setState] = useContext<any>(Context);

	const playTrack = (index: number) => {
		if (index === state.currentTrackIndex) {
			// setState((state: PlayerStateType) => ({
			// 	...state,
			// 	active: state.packs[index],
			// }));
			console.log(state);

			play();
		} else {
			state.audioPlayer.pause();
			state.audioPlayer = new Audio(
				`http://localhost:5000/${state.packs[index]?.audio}`,
			);

			state.audioPlayer.volume = state.volume / 100;
			state.audioPlayer.onloadedmetadata = () => {
				setState((state: PlayerStateType) => ({
					...state,
					duration: Math.ceil(state.audioPlayer.duration),
				}));
			};
			// state.audioPlayer.ontimeupdate = () => {
			// 	setCurrentTime(Math.ceil(audio.currentTime));
			// 	setState((state: PlayerStateType) => ({
			// 		Math.ceil(state.audioPlayer)
			// 		);
			// };
			state.audioPlayer.ontimeupdate = () => {
				setState((state: PlayerStateType) => ({
					...state,
					currentTime: Math.ceil(state.audioPlayer.currentTime),
				}));
			};

			state.audioPlayer.play();
			setState((state: PlayerStateType) => ({
				...state,
				currentTrackIndex: index,
				isPlaying: true,
			}));
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
	
	return {
		playTrack,
		play,
		packs: state.packs,
		isPlaying: state.isPlaying,
		currentTrackId:
			state.currentTrackIndex !== null &&
			state.packs?.[state.currentTrackIndex]?._id,
		active: state.packs?.[state.currentTrackIndex],
		duration: state.duration,
		currentTime: state.currentTime,
	};
};
