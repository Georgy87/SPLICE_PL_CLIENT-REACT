import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
	selectPacks,
	selectSamples,
} from '../../store/selectors/packsSelectors';
import { PlayerContext, ContextProps, defaultPlayerStateType } from '../PlayerContext';

type PropsType = {
	children: React.ReactNode;
};

export const defaultState = {
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
	packPercent: 0,
};

export const PlayerContextProvider: React.FC<PropsType> = ({ children }) => {
	const packs = useSelector(selectPacks);
	const samples = useSelector(selectSamples);

	const [playerState, setPlayerState] = useState<ContextProps[0]>(defaultPlayerStateType);
	
	useEffect(() => {
		if (packs) {
			setPlayerState({
				...defaultState,
				packs: packs,
				samples: [],
			});
		}
	
	}, [packs]);

	return (
		<PlayerContext.Provider value={[playerState, setPlayerState]}>
			{children}
		</PlayerContext.Provider>
	);
};
