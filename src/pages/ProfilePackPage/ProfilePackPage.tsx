import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { WaveSurferParams } from 'wavesurfer.js/types/params';

const waveSurferOptions = (ref: HTMLDivElement | string): WaveSurferParams => ({
	container: '#waveform',
	waveColor: 'black',
	scrollParent: false,
	barWidth: 3,
	barRadius: 3,
	responsive: true,
	height: 150,
});

export const ProfilePackPage = () => {
	const waveformRef = useRef<HTMLDivElement | any>(null);
	const options = waveSurferOptions(waveformRef.current);
	const wavesurfer = useRef<HTMLDivElement | any>(null);
	let url =
		'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3';

	useEffect(() => {
		wavesurfer.current = WaveSurfer.create(options);
		wavesurfer.current.load(url);
	}, [url]);

	const handler = () => {
		wavesurfer.current.playPause();
	}

	return (
		<div style={{ width: 300, height: 300 }}>
	
			<div id='waveform' ref={waveformRef} />
			<button onClick={() => handler()}>TEST PLAY</button>
		</div>
	);
};
