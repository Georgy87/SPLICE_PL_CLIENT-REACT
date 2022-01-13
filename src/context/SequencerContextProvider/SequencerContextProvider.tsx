import React, { useState, useEffect } from 'react';

import { SequencerContext, ContextProps } from '../SequencerContext';

type PropsType = {
	children: React.ReactNode;
};

export const defaultState = {
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

export const SequencerContextProvider: React.FC<PropsType> = ({ children }) => {
	const [sequencerState, setSequencerState] = useState<ContextProps[0]>(defaultState);

	return (
		<SequencerContext.Provider value={[sequencerState, setSequencerState]}>
			{children}
		</SequencerContext.Provider>
	);
};
