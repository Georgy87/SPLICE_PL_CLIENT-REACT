import React, { useContext, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { SamplesContext } from '../../context/Context';
import { SamplesPlayerStateType } from '../../context/SamplesPlayerContext/types';
import { useSampleSound } from '../../hooks/useSampleSound';

export let waveSurfer: any;

export const SamplePlayer = () => {
	// const { active, currentId, samples, playSample } = useSampleSound();

	const [state, setState] = useContext(SamplesContext);
	const { samples, active, currentId, loading } = state;

	useEffect(() => {
		if (samples?.length) {
			waveSurfer = WaveSurfer.create({
				container: '#waveform',
				// barGap: 3,
				// barWidth: 7,
				// cursorWidth: 0,
				// barRadius: 1,

				waveColor: 'black',
				progressColor: 'red',
			});

			waveSurfer?.load(
				`http://localhost:5000/${samples?.[currentId].audio}`,
			);

			waveSurfer.on('ready', () => {
				setState((state: SamplesPlayerStateType) => ({
					...state,
					ready: true,
				}));
				handlePlayPause();
			});
		}
		console.log(`${samples?.[currentId]?.audio}`);
	
	}, [loading]);

	const handlePlayPause = () => {
	
		waveSurfer?.playPause();
		// setState((state: SamplesPlayerStateType) => ({
		// 	...state,
		// 	// isPlaying: waveSurfer.isPlaying(),
		// }));
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
		</div>
	);
};
