import { createContext } from 'react';

import { PlayerStateType } from './PlayerContext/types';
import { SamplesPlayerStateType } from './SamplesPlayerContext/types';

export type ContextProps = [PlayerStateType, (state: any) => void];
export type SamplesPlayerContextProps = [SamplesPlayerStateType, (state: any) => void];

export const defaultPlayerState = {
	audioPlayer: new Audio(),
	packs: [],
	currentTrackIndex: null,
	isPlaying: false,
	currentTrackId: null,
	active: null,
	duration: 0,
	currentTime: 0,
	volume: 50,
};

export const defaultSamplesPlayerState = {
	ready: false,
	samples: [],
	isPlaying: false,
	currentIndex: 0,
	active: null,
};

export const Context = createContext<ContextProps>([
	defaultPlayerState,
	() => {},
]);

export const SamplesContext = createContext<SamplesPlayerContextProps>([
	defaultSamplesPlayerState,
	() => {},
]);
