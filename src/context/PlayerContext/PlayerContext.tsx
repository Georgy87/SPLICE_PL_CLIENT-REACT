import React, { useState, useEffect, ReactChildren, ContextType } from 'react';
import { useSelector } from 'react-redux';

import { selectPacks, selectSamples } from '../../store/selectors/packsSelectors';

import { Context, ContextProps, defaultPlayerState } from '../Context';
//import { PlayerStateType } from './types';

type PropsType = {
	children: React.ReactNode;
}

export const PlayerContext: React.FC<PropsType> = ({ children }) => {
	const packs = useSelector(selectPacks);
	const samples = useSelector(selectSamples);

	const [state, setState] = useState<ContextProps[0]>(defaultPlayerState);

	useEffect(() => {
		if (packs) {
			setState({
				audioPlayer: new Audio(),
				packs: packs,
				samples: [],
				currentTrackIndex: null,
				isPlaying: false,
				currentTrackId: null,
				active: null,
				duration: 0,
				currentTime: 0,
				volume: 50,
			});
		}

		if (samples) {
			setState({
				audioPlayer: new Audio(),
				packs: packs,
				samples: samples,
				currentTrackIndex: null,
				isPlaying: false,
				currentTrackId: null,
				active: null,
				duration: 0,
				currentTime: 0,
				volume: 50,
			});
		}
	}, [packs, samples]);
	console.log(state);
	return (
		<Context.Provider value={[state, setState]}>
			{children}
		</Context.Provider>
	);
};
