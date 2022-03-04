import { createContext } from 'react';

import { PlayerStateType } from './PlayerContextProvider/types';

export type ContextProps = [PlayerStateType, (state: any) => void];

export const defaultPlayerStateType = {
	audioPlayer: new Audio(),
	packs: [],
	samples: [],
	currentTrackIndex: null,
	isPlaying: false,
	currentTrackId: null,
	active: null,
	duration: 0,
	currentTime: 0,
	packCurrentTime: 0,
	volume: 40,
	percent: 0,
	packPercent: 0,
};

export const PlayerContext = createContext<ContextProps>([
	defaultPlayerStateType,
	() => {},
]);
