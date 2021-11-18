import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useSound } from '../../hooks/useSound';
import { IconChangeLayout } from '../../layouts/IconChangeLayout/IconChangeLayout';
import { selectPackProfile } from '../../store/selectors/packsSelectors';
import { hookAudioWave } from '../../hooks/hookAudioWave';
import { SampleSliderLayout } from '../../layouts/SampleSliderLayout/SampleSliderLayout';
import { Samples } from '../../context/PlayerContextProvider/types';

import styles from './SampleItem.module.scss';
import { formatTime } from '../../utils/formatTime';

type PropsType = {
	sample: Samples;
	idx: number;
};

export const SampleItem: React.FC<PropsType> = ({ sample, idx }) => {
	const { audio, _id, audioCoordinates, duration } = sample;
	const [width, setWidth] = useState<string>('550px');

	const { play, playTrack, isPlaying, currentSampleId } = useSound();

	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		console.log(audio);
		if (audio) {
			hookAudioWave(audioCoordinates, canvasRef.current);
		}

		const handleResize = () => {
			if (window.innerWidth < 1065) {
				setWidth('300px');
			} else {
				setWidth('550px');
			}
			if (window.innerWidth < 900) {
				setWidth('230px');
			} else {
				setWidth('550px');
			}
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
			setWidth('550px');
		};
	}, []);

	const packProfile = useSelector(selectPackProfile);

	return (
		<>
			<ul className={styles.listItem}>
				<li>
					<img src={`/${packProfile?.picture}`} alt={packProfile?.picture} />
					<div className={styles.iconChangeWrap}>
						<p className={styles.sampleTime}>{formatTime(duration)}</p>
						<IconChangeLayout
							onClicked={(e: Event) => {
								e.stopPropagation();
								playTrack(idx, 'sample');
							}}
							iconOneOrTwo={isPlaying}
							currentTrackId={currentSampleId}
							blockStyle={styles.playPauseSample}
							trackId={_id}
							iconOne='play'
							iconTwo='pause'
							typeBtn='sample-item'
							iconStyle={{
								color: '#98b2d1',
								fontSize: '35px',
								cursor: 'pointer',
							}}
						></IconChangeLayout>
					</div>
					<SampleSliderLayout
						width={width}
						trackId={_id}
						currentSampleId={currentSampleId}
					>
						<canvas
							ref={canvasRef}
							style={{
								width: width,
								height: '35px',
							}}
						/>
					</SampleSliderLayout>
					<p>{sample.sampleName}</p>
				</li>
			</ul>
		</>
	);
};
