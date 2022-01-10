import React, { useState } from 'react';
import { sequencerService } from '../../services/sequencerService';

//@ts-ignore
var AUDIO = new window.AudioContext();
export const SequencerPage = () => {
	// const [playerState, setPlayerState] = useState<any>({
	// 	isPlaying: false,
	// 	noteTime: 0,
	// 	startTime: 0,
	// 	ti: 0,
	// 	currentStep: 0,
	// 	tempo: 60,
	// 	tic: 60 / 60 / 4,
	// 	currentPattern: null,
	// 	bank: {},
	// 	totalCount: 0,
	// 	pattern: {
	// 		sequence: {
	// 			openHat: '0101010101010101',
	// 			closedHat: '0000000100000000',
	// 			snare: '1010101010001000',
	// 		},
	// 	},
	// 	initialPattern: [
	// 		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
	// 		[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 		[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
	// 	],
	// });

	// let {
	// 	isPlaying,
	// 	noteTime,
	// 	startTime,
	// 	ti,
	// 	currentStep,
	// 	tempo,
	// 	tic,
	// 	currentPattern,
	// 	bank,
	// 	totalCount,
	// 	pattern,
	// } = playerState;

	// function onPlay() {
	// 	isPlaying = true;
	// 	noteTime = 0.0;
	// 	startTime = AUDIO.currentTime + 0.005;
	// 	scheduleNote();
	// }

	// function setTempo() {
	// 	tic = 60 / 60 / 4; // 16th
	// }

	// setTempo();

	// function scheduleNote() {
	// 	if (!isPlaying) return false;
	// 	var ct = AUDIO.currentTime;

	// 	ct -= startTime;

	// 	while (noteTime < ct + 0.2) {
	// 		var pt = noteTime + startTime;

	// 		playPatternStepAtTime(pt);
	// 		nextNote();
	// 	}
	// 	ti = window.requestAnimationFrame(scheduleNote);
	// }

	// function nextNote() {
	// 	currentStep++;

	// 	if (currentStep == 16) currentStep = 0;

	// 	noteTime += tic;
	// }

	// function playPatternStepAtTime(pt: number) {
	// 	for (var k in currentPattern) {
	// 		if (currentPattern[k][currentStep] == '1') {
	// 			playPattern(k, pt);
	// 		}
	// 	}
	// }

	// function playPattern(id: any, when: any) {
	// 	const s = AUDIO.createBufferSource();

	// 	s.buffer = bank[id];
	// 	console.log(s.buffer);
	// 	s.connect(AUDIO.destination);
	// 	s.start(when || 0);
	// }

	// function _parsePattern(pattern: any) {
	// 	console.log(pattern);
	// 	currentPattern = {};
	// 	if (!currentPattern) return;
	// 	for (var k in pattern.sequence) {
	// 		var pat = _parseLine(pattern.sequence[k]);

	// 		currentPattern[k] = pat;
	// 	}

	// 	currentPattern[Symbol.iterator] = function() {
	// 		const entries = Object.entries(this);
	// 		let index = -1;

	// 		return {
	// 			next() {
	// 				index++;
	// 				return {
	// 					value: entries[index],
	// 					done: index >= entries.length,
	// 				};
	// 			},
	// 		};
	// 	};

	// 	// for (let values of playerState.currentPattern) {
	// 	//     playerState.currentPattern[values[0]] = ['test']

	// 	// }
	// 	// console.log(playerState.currentPattern, 'teeest');

	// 	// console.log(Object.entries(pattern.sequence));
	// }

	// _parsePattern(pattern);

	// function _parseLine(line: any) {
	// 	if (line.length !== 16) console.error('Invalid line length', pattern);

	// 	return line.split('');
	// }

	// function loadSamples(srcObj: any) {
	// 	for (var k in srcObj) {
	// 		totalCount++;
	// 	}
	// 	for (var k in srcObj) {
	// 		_loadSample(k, srcObj[k]);
	// 	}
	// }

	// async function _loadSample(key: any, url: any) {
	// 	const response = await fetch(`${url}`);
	// 	const arrayBuffer = await response.arrayBuffer();

	// 	const data = await AUDIO.decodeAudioData(arrayBuffer);

	// 	_handleSampleLoad(key, data);
	// }

	// function _handleSampleLoad(key: any, buffer: any) {
	// 	bank[key] = buffer;
	// }

	// let samples: any = {};
	// let sampleList = ['snare', 'openHat', 'closedHat'];
	// sampleList.forEach(function(id) {
	// 	samples[id] = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/' + id + '.wav';
	// });

	// loadSamples(samples);



	return (
		<div className='App'>
			<button onClick={() => sequencerService.onPlay()}>Play</button>
		</div>
	);
};
