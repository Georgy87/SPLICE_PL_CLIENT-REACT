import { useContext } from 'react';

import { SamplesContext } from '../context/Context';
import { SamplesPlayerStateType } from '../context/SamplesPlayerContext/types';
import { waveSurfer } from '../components/SamplePlayer/SamplePlayer';

export const useSampleSound = () => {
	const [state, setState] = useContext(SamplesContext);
	const { samples, active, currentId, loading, isPlaying } = state;

	const playSample = (index: number) => {
		if (index !== currentId) {
			setState((state: SamplesPlayerStateType) => ({
				...state,
				currentId: index,
				active: true,
				isPlaying: true,
			}));
			waveSurfer?.playPause();
		} else {
			setState((state: SamplesPlayerStateType) => ({
				...state,
				active: true,
				isPlaying: !state.isPlaying,
			}));
			waveSurfer?.playPause();
		}
	};

	return {
		samples,
		active,
		playSample,
		currentId,
		loading,
		setState,
		state,
		isPlaying,
	};
};
