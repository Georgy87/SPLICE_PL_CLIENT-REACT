import React, { useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { SamplesPlayerStateType } from '../../context/SamplesPlayerContext/types';
import { useSampleSound } from '../../hooks/useSampleSound';
import { IconChangeLayout } from '../../layouts/IconChangeLayout/IconChangeLayout';

import styles from './SamplePlayer.module.scss';

export let waveSurfer: WaveSurfer;

export const SamplePlayer = () => {
	const {
		currentId,
		samples,
		loading,
		setState,
		isPlaying,
	} = useSampleSound();

	const [load, setLoad] = useState(false);

	useEffect(() => {
		if (samples?.length) {
			waveSurfer = WaveSurfer.create({
				container: '#waveform',
				barGap: 0,
				barWidth: 1,
				height: 40,
			
				cursorColor: '#49c5b6',
				barRadius: 1,
				waveColor: 'grey',
				progressColor: '#49c5b6',
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
		<div className={styles.sampleWaveform}>
			<div id='waveform' className={styles.waveform} />
			<div className={styles.playerControl}>
				<IconChangeLayout
					onClicked={handlePlayPause}
					iconOneOrTwo={isPlaying}
					iconOne='play-footer'
					iconTwo='pause-footer'
					typeBtn='sample-player'
					iconStyle={{
						color: '#fff',
						fontSize: '35px',
						cursor: 'pointer',
					}}
				></IconChangeLayout>
			</div>
		</div>
	);
};
