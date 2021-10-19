import { useContext } from 'react';

import { SamplesContext } from '../context/Context';
import { SamplesPlayerStateType } from '../context/SamplesPlayerContext/types';
import { waveSurfer } from '../components/SamplePlayer/SamplePlayer';

export const useSampleSound = () => {
	const [state, setState] = useContext(SamplesContext);

	const { samples, active, currentId } = state;

	const playSample = (index: number) => () => {
		waveSurfer.playPause();
		if (index !== currentId) {
			setState((state:  SamplesPlayerStateType) => ({
				...state,
				currentId: index,
			}));
			waveSurfer?.playPause();
			
		} else {
			waveSurfer?.playPause();
			setState((state:  SamplesPlayerStateType) => ({
				...state,
				isPlaying: waveSurfer?.isPlaying(),
			}));
		}
	};

	return {
		samples,
		active,
		playSample,
		currentId,
	};
};
