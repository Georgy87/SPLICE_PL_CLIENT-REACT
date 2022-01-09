import React, { useState } from 'react';

//@ts-ignore
var AUDIO = new window.AudioContext();
export const SequencerPage = () => {
    const [playerState, setPlayerState] = useState<any>({
		audioPlayer: new Audio(),
		isPlaying: false,
		noteTime: 0,
		startTime: 0,
		ti: 0,
		currentStep: 0,
		tempo: 60,
		tic: 60 / 60 / 4,
		currentPattern: null,
		bank: {},
		totalCount: 0,
		// audioContext: new (window.AudioContext)(),
		pattern: {
			sequence: {
				openHat: '0101010101010101',
				closedHat: '0000000100000000',
				snare: '1010101010001000',
			},
		},
	});

	function onPlay() {
		playerState.isPlaying = true;
		playerState.noteTime = 0.0;
		playerState.startTime = AUDIO.currentTime + 0.005;
		scheduleNote();
	}

	function setTempo() {
		playerState.tic = 60 / 160 / 4; // 16th
	}

	setTempo();

	function scheduleNote() {
		if (!playerState.isPlaying) return false;
		var ct = AUDIO.currentTime;

		ct -= playerState.startTime;

		while (playerState.noteTime < ct + 0.2) {
			var pt = playerState.noteTime + playerState.startTime;

			playPatternStepAtTime(pt);
			nextNote();
		}
		playerState.ti = window.requestAnimationFrame(scheduleNote);
	}

	function nextNote() {
		playerState.currentStep++;

		console.log(playerState.currentStep);

		if (playerState.currentStep == 16) playerState.currentStep = 0;

		playerState.noteTime += playerState.tic;
	}

	function playPatternStepAtTime(pt: number) {
		for (var k in playerState.currentPattern) {
			if (playerState.currentPattern[k][playerState.currentStep] == '1') {
				// console.log(k, pt);

				playPattern(k, pt);
			}
		}
	}

	function playPattern(id: any, when: any) {
		const s = AUDIO.createBufferSource();

		s.buffer = playerState.bank[id];

		s.connect(AUDIO.destination);
		s.start(when || 0);
	}

	function _parsePattern(pattern: any) {
		playerState.currentPattern = {};

		for (var k in pattern.sequence) {
			var pat = _parseLine(pattern.sequence[k]);

			playerState.currentPattern[k] = pat;
		}
	}

	function _parseLine(line: any) {
		if (line.length !== 16) console.error('Invalid line length', playerState.pattern);

		return line.split('');
	}

	function loadSamples(srcObj: any) {
		for (var k in srcObj) {
			playerState.totalCount++;
		}
		for (var k in srcObj) {
			_loadSample(k, srcObj[k]);
		}
		// _onSamplesLoaded = callback;
	}

	async function _loadSample(key: any, url: any) {
		const response = await fetch(`${url}`);
		const arrayBuffer = await response.arrayBuffer();

		const data = await AUDIO.decodeAudioData(arrayBuffer);

		_handleSampleLoad(key, data);
	}

	function _handleSampleLoad(key: any, buffer: any) {
		playerState.bank[key] = buffer;
	}

	_parsePattern(playerState.pattern);

	let samples: any = {};
	let sampleList = ['snare', 'openHat', 'closedHat'];
	sampleList.forEach(function(id) {
		samples[id] = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/' + id + '.wav';
	});

	loadSamples(samples);

	return (
		<div className='App'>
			<button onClick={onPlay}>Play</button>
		</div>
	);
}