import { useState } from 'react';

let AUDIO: AudioContext = new window.AudioContext() || new window.webkitAudioContext();

export type SequencerStateType = {
	isPlaying: boolean;
	noteTime: number;
	startTime: number;
	currentStep: number;
	tempo: number;
	tic: number;
	bank: [] | ArrayBuffer;
	totalCount: number;
	initialPattern: number[][];
	currentInitialPattern: null | number[][];
	requestId: number;
};

export const useSequencer = () => {
	const [sequencerState, setSequencerState] = useState<SequencerStateType>({
		isPlaying: false,
		noteTime: 0,
		startTime: 0,
		currentStep: 0,
		tempo: 128,
		tic: 60 / 180 / 4,
		bank: [],
		totalCount: 0,
		initialPattern: [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		],
		currentInitialPattern: null,
		requestId: 0,
	});

	let {
		isPlaying,
		noteTime,
		startTime,
		currentStep,
		tempo,
		tic,
		bank,
		initialPattern,
		currentInitialPattern,
		requestId,
	} = sequencerState;

	const [step, setStep] = useState<number>(1);

	const setTempo = () => {
		tic = 60 / 128 / 4;
	};

	const scheduleNote = () => {
		if (!isPlaying) return false;

		const _scheduleNote = () => {
			let ct: number = AUDIO.currentTime;

			ct -= startTime;

			while (noteTime < ct + 0.2) {
				let pt: number = noteTime + startTime;

				playPatternStepAtTime(pt);
				nextNote();
			}

			requestId = window.requestAnimationFrame(_scheduleNote);

			setSequencerState((state: SequencerStateType) => ({
				...state,
				requestId,
			}));
		};

		_scheduleNote();
	};

	const nextNote = () => {
		currentStep++;
		setStep(currentStep);

		if (currentStep == 32) currentStep = 0;

		noteTime += tic;
	};

	const playPatternStepAtTime = (pt: number) => {
		for (let k in currentInitialPattern) {
			if (currentInitialPattern[+k][currentStep] === 1) {
				playPattern(k, pt);
			}
		}
	};

	const playPattern = (id: string, when: number) => {
		const s: AudioBufferSourceNode = AUDIO.createBufferSource();

		//@ts-ignore
		s.buffer = bank[id];

		s.connect(AUDIO.destination);
		s.start(when || 0);
	};

	const _parsePattern = () => {
		currentInitialPattern = [];

		for (let k in initialPattern) {
			const pat = initialPattern[k];
			currentInitialPattern[k] = pat;
		}
	};

	const loadSamples = (url: string[]) => {
		url.forEach((url: string, index: number) => {
			_loadSample(index, url);
		});
	};

	const _loadSample = async (key: number, url: string) => {
		const response = await fetch(`${url}`);
		const arrayBuffer = await response.arrayBuffer();

		const data: AudioBuffer = await AUDIO.decodeAudioData(arrayBuffer);

		_handleSampleLoad(key, data);
	};

	const _handleSampleLoad = async (key: number, buffer: AudioBuffer) => {
		//@ts-ignore
		bank[key] = buffer;
	};

	const onPlay = (sampleList: string[]) => {
		isPlaying = true;
		noteTime = 0.0;
		startTime = AUDIO.currentTime + 0.005;

		scheduleNote();
		setTempo();
		_parsePattern();
		loadSamples(sampleList);
	};

	const onStop = () => {
		isPlaying = false;
		currentStep = 0;

		cancelAnimationFrame(requestId);
	};

	return {
		sequencerState,
		initialPattern,
		step,
		isPlaying,
		onPlay,
		onStop,
		loadSamples,
	};
};
