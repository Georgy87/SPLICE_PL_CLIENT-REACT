import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
	selectPacks,
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
	volume: 80,
	percent: 0,
	packPercent: 0,
	onload: false,
};

export const PlayerContextProvider: React.FC<PropsType> = ({ children }) => {
	const packs = useSelector(selectPacks);

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
