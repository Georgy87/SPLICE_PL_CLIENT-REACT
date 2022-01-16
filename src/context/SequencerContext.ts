import { createContext } from 'react';

import { SequencerStateType } from './SequencerContextProvider/types';

export type ContextProps = [SequencerStateType, (state: any) => void];

export const defaultSequencerState = {
	isPlaying: false,
	noteTime: 0,
	startTime: 0,
	requestId: 0,
	currentStep: 0,
	tempo: 60,
	tic: 60 / 60 / 4,
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
	defaultSequencerState,
	() => {},
]);