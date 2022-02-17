import axios, { AxiosResponse } from 'axios';
import { useState } from 'react';

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
	let AUDIO: AudioContext = new window.AudioContext() || new window.webkitAudioContext();
	const [sequencerState, setSequencerState] = useState<SequencerStateType>({
		isPlaying: false,
		noteTime: 0,
		startTime: 0,
		currentStep: 0,
		tempo: 128,
		tic: 60 / 128 / 4,
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

	let { isPlaying, noteTime, startTime, currentStep, tempo, tic, bank, initialPattern, currentInitialPattern, requestId } = sequencerState;

	const [step, setStep] = useState<number>(1);

	const setTempo = (tempoValue: number) => {
		tic = 60 / tempoValue / 4;
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
		// const response = await axios(`${url}`);

		// const arrayBuffer = await response.arrayBuffer();
		// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
		axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
		axios.defaults.headers['Access-Control-Allow-Methods'] = 'GET, PUT, POST, DELETE';
		axios.defaults.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';
		
		axios
			.request({
				responseType: 'arraybuffer',
				url: url,
				// headers: {
				// 	'Access-Control-Allow-Origin': '*',
				// }
			})
			.then(async (response: any) => {
				// console.log(response);
				const data: AudioBuffer = await AUDIO.decodeAudioData(response.data);
				// console.log(data);
				_handleSampleLoad(key, data);
			});
	};

	const _handleSampleLoad = async (key: number, buffer: AudioBuffer) => {
		//@ts-ignore
		bank[key] = buffer;
	};

	const onPlay = (sampleList: string[]) => {
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
		onPlay,
		onStop,
		loadSamples,
		setTempo,
	};
};
