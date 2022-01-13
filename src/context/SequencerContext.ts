import { createContext } from 'react';

import { SequencerStateType } from './SequencerContextProvider/types';

export type ContextProps = [SequencerStateType, (state: any) => void];

export const defaultSequencerStateType = {
	isPlaying: false,
	noteTime: 0,
	startTime: 0,
	ti: 0,
	currentStep: 0,
	tempo: 160,
	tic: 60 / 160 / 4,
	currentPattern: null,
	bank: [],
	totalCount: 0,
	initialPattern: [
		[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1],
		[0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
	],
	currentInitialPattern: null,
	AUDIO: new window.AudioContext(),
};

export const SequencerContext = createContext<ContextProps>([
	defaultSequencerStateType,
	() => {},
]);