import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import WaveSurfer from 'wavesurfer.js';
import { WaveSurferParams } from 'wavesurfer.js/types/params';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import {
	selectPacks,
	selectSamples,
} from '../../store/selectors/packsSelectors';
import { fetchGetPack } from '../../store/slices/pack/packSlice';

const waveSurferOptions = (ref: HTMLDivElement | string): WaveSurferParams => ({
	container: '#waveform',
	waveColor: 'black',
	scrollParent: false,
	barWidth: 3,
	barRadius: 3,
	responsive: true,
	height: 150,
});

export const WaveSurferPlayer = ({ url }: { url: string }) => {
	const waveformRef = useRef<HTMLDivElement | any>(null);
	const options = waveSurferOptions(waveformRef.current);
	const wavesurfer = useRef<HTMLDivElement | any>(null);
	const [changeTrack, setChangeTrack] = useState(false);

	useEffect(() => {
		wavesurfer.current = WaveSurfer.create(options);
		wavesurfer.current.load(url);
	}, [changeTrack]);

	const handler = () => {
		wavesurfer.current.on('play', function() {
			console.log('Play');
			setChangeTrack(!changeTrack);
		});

		wavesurfer.current.playPause();
	};

	return (
		<div style={{ width: 900, height: 400, marginBottom: '50px' }}>
			<div id='waveform' ref={waveformRef} />
			<div style={{ marginTop: '200px' }}>
				<button onClick={() => handler()}>TEST PLAY</button>
			</div>
		</div>
	);
};
