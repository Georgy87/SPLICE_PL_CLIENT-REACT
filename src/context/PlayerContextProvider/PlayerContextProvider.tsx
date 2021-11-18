import React, { useState, useEffect, ReactChildren, ContextType } from 'react';
import { useSelector } from 'react-redux';

import {
	selectPacks,
	selectSamples,
} from '../../store/selectors/packsSelectors';

import { PlayerContext, ContextProps, defaultPlayerStateType } from '../PlayerContext';
//import { PlayerStateType } from './types';

type PropsType = {
	children: React.ReactNode;
};

const defaultState = {
	audioPlayer: new Audio(),
	currentTrackIndex: null,
	isPlaying: false,
	currentTrackId: null,
	active: null,
	duration: 0,
	currentTime: 0,
	volume: 2,
	percent: 0,
};

export const PlayerContextProvider: React.FC<PropsType> = ({ children }) => {
	const packs = useSelector(selectPacks);
	const samples = useSelector(selectSamples);

	const [state, setState] = useState<ContextProps[0]>(defaultPlayerStateType);

	useEffect(() => {
		if (packs) {
			setState({
				...defaultState,
				packs: packs,
				samples: [],
			});
		}

		if (samples) {
			setState({
				...defaultState,
				packs: packs,
				samples: samples,
			});
		}
	}, [packs, samples]);

	return (
		<PlayerContext.Provider value={[state, setState]}>
			{children}
		</PlayerContext.Provider>
	);
};
