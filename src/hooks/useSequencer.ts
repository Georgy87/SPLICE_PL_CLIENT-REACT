import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

export type SequencerStateType = {
	AUDIO: AudioContext;
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
	let [sequencerState, setSequencerState] = useState<SequencerStateType>({
		AUDIO: new (window.AudioContext || window.webkitAudioContext)(),
		isPlaying: false,
		noteTime: 0,
		startTime: 0,
		currentStep: 0,
		tempo: 60,
		tic: 60 / 60 / 4,
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

	let { AUDIO, isPlaying, noteTime, startTime, currentStep, tic, bank, initialPattern, currentInitialPattern, requestId } = sequencerState;
	
	const [step, setStep] = useState<number>(1);

	const setTempo = (tempoValue: number) => {
		tic = 120 / tempoValue / 4;
	};
	
	const scheduleNote = () => {
		if (!isPlaying) return false;

		const _scheduleNote = () => {
			let ct: number = AUDIO.currentTime;

			ct -= startTime;

			while (noteTime < ct + 0.2) {
				let pt: number = noteTime + startTime;
				console.log(noteTime)
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

		if (currentStep === 32) currentStep = 0;

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
		axios
			.request({
				responseType: 'arraybuffer',
				url: url,
				method: 'GET',
			})
			.then(async (response: AxiosResponse) => {
				const data: AudioBuffer = await AUDIO.decodeAudioData(response.data);
				_handleSampleLoad(key, data);
			});
	};

	const _handleSampleLoad = async (key: number, buffer: AudioBuffer) => {
		//@ts-ignore
		bank[key] = buffer;
	};

	const onPlay = (sampleList: string[]) => {
		AUDIO.resume();
		isPlaying = true;
		noteTime = 0.0;
		startTime = AUDIO.currentTime;

		scheduleNote();

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
		requestId,
		onPlay,
		onStop,
		loadSamples,
		setTempo,
	};
};
