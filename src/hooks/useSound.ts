import { useContext } from 'react';

import { Context } from '../context/Context';
import { PlayerStateType } from '../context/types';

export const useSound = () => {
	const [state, setState] = useContext<any>(Context);

	const playPack = (index: number) => {
		if (state) {
			setState((state: PlayerStateType) => ({
				...state,
				active:
					state?.currentTrackIndex !== null &&
					state.packs?.[state.currentTrackIndex],
			}));
		}

		if (index === state.currentTrackIndex) {
			play();
		} else {
			state.audioPlayer.pause();
			state.audioPlayer = new Audio(
				`http://localhost:5000/${state.packs[index].audio}`,
			);

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
		setState((state: any) => ({ ...state, isPlaying: !state.isPlaying }));
	};

	return {
		playPack,
		packs: state?.packs,
		isPlaying: state?.isPlaying,
		currentTrackId:
			state?.currentTrackIndex !== null &&
			state.packs?.[state.currentTrackIndex]._id,
	};
};
