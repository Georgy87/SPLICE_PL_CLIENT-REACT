import { createContext } from 'react';

import { PlayerStateType } from './PlayerContext/types';

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
	volume: 50,
	percent: 0,
};


export const Context = createContext<ContextProps>([
	defaultPlayerStateType,
	() => {},
]);
