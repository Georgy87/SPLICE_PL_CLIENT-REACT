import React, { useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { SamplesPlayerStateType } from '../../context/SamplesPlayerContext/types';
import { useSampleSound } from '../../hooks/useSampleSound';

export let waveSurfer: any;

export const SamplePlayer = () => {
	const {
		currentId,
		samples,
		loading,
		setState,
		isPlaying,
	} = useSampleSound();

	const [ load, setLoad ] = useState(false);

	useEffect(() => {
		if (samples?.length) {
			waveSurfer = WaveSurfer.create({
				container: '#waveform',
				barGap: 2,
				barWidth: 1,
				// cursorWidth: 0,
				barRadius: 1,
				waveColor: 'black',
				progressColor: 'red',
			});

			waveSurfer?.load(
				`http://localhost:5000/${samples?.[currentId].audio}`,
			);
			setLoad(true);
			waveSurfer.on('ready', () => {
				handlePlayPause();
			});
		}
	}, [loading]);

	const handlePlayPause = () => {
		waveSurfer?.playPause();
		if (load) {
			setState((state: SamplesPlayerStateType) => ({
				...state,
				isPlaying: !state.isPlaying,
				// active: !state.active,
			}));
		}
	};

	useEffect(() => {
		setState((state: SamplesPlayerStateType) => ({
			...state,
			ready: false,
		}));

		if (waveSurfer) {
			waveSurfer.load(
				`http://localhost:5000/${samples?.[currentId].audio}`,
			);
		}
	}, [currentId]);

	return (
		<div>
			<div id='waveform' className='my-4' />
			<button onClick={handlePlayPause}>
				{isPlaying ? <div>Pause</div> : <div>Play</div>}
			</button>
		</div>
	);
};
