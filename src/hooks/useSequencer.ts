import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';

//@ts-ignore
import clap from './7_Kick_Kit.wav';
//@ts-ignore
import hihat from './fg2_110_drum_loop_nuwave_full.wav';
//@ts-ignore
import snare from './Output 1-2.wav';
//@ts-ignore
import smpl from './Out.wav';

let AUDIO = new window.AudioContext();
export type SequencerStateType = {
	isPlaying: any;
	noteTime: any;
	startTime: any;
	currentStep: any;
	tempo: any;
	tic: any;
	currentPattern: any;
	bank: any;
	totalCount: any;
	initialPattern: any;
	currentInitialPattern: any;
	requestId: number;
};

export const useSequencer = () => {
	const [sequencerState, setSequencerState] = useState<SequencerStateType>({
		isPlaying: false,
		noteTime: 0,
		startTime: 0,
		currentStep: 0,
		tempo: 520,
		tic: 60 / 180 / 4,
		currentPattern: null,
		bank: [],
		totalCount: 0,
		initialPattern: [
			[1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
		currentPattern,
		bank,
		totalCount,
		initialPattern,
		currentInitialPattern,
		requestId,
	} = sequencerState;

	let [id, setId] = useState<number>(0);
	let [step, setStep] = useState<number>(1);

	const setTempo = () => {
		tic = 60 / 190 / 4;
	};

	const scheduleNote = () => {
		if (!isPlaying) return false;
		const _scheduleNote = () => {
			let ct = AUDIO.currentTime;

			ct -= startTime;

			while (noteTime < ct + 0.2) {
				let pt = noteTime + startTime;

				playPatternStepAtTime(pt);
				nextNote();
			}

			requestId = window.requestAnimationFrame(_scheduleNote);
			setId(requestId);
		};
		_scheduleNote();
	};

	const nextNote = () => {
		currentStep++;
		setStep(currentStep);
	
		if (currentStep == 64) currentStep = 0;

		noteTime += tic;
	};

	const playPatternStepAtTime = (pt: number) => {
		for (let k in currentInitialPattern) {
			if (currentInitialPattern[k][currentStep] === 1) {
				playPattern(k, pt);
			}
		}
	};

	const playPattern = (id: string, when: any) => {
		const s = AUDIO.createBufferSource();
		s.buffer = bank[id];

		s.connect(AUDIO.destination);
		s.start(when || 0);
	};

	const _parsePattern = () => {
		currentInitialPattern = [];

		for (let k in initialPattern) {
			let pat = initialPattern[k];
			currentInitialPattern[k] = pat;
		}
	};

	const loadSamples = (srcObj: string[]) => {
		srcObj.forEach((src: string, index: number) => {
			_loadSample(index, src);
		});
	};

	const _loadSample = async (key: any, url: any) => {
		const response = await fetch(`${url}`);
		const arrayBuffer = await response.arrayBuffer();

		const data = await AUDIO.decodeAudioData(arrayBuffer);

		_handleSampleLoad(key, data);
	};

	const _handleSampleLoad = async (key: any, buffer: any) => {
		bank[key] = buffer;
	};

	const onPlay = () => {
		isPlaying = true;
		noteTime = 0.0;
		startTime = AUDIO.currentTime + 0.005;

		scheduleNote();
		setTempo();
		_parsePattern();
		let sampleList = [
			clap,
			'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/openHat.wav',
			hihat,
			snare,
			smpl,
		];

		loadSamples(sampleList);
	};

	const onStop = () => {
		isPlaying = false;
		currentStep = 0;

		cancelAnimationFrame(id);
	};

	return {
		sequencerState,
		initialPattern,
		step,
		isPlaying,
		onPlay,
		onStop,
	};
};
