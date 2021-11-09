import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useSound } from '../../hooks/useSound';
import { IconChangeLayout } from '../../layouts/IconChangeLayout/IconChangeLayout';
import { selectPackProfile } from '../../store/selectors/packsSelectors';
import { hookAudioWave } from '../../hooks/hookAudioWave';
import { SampleSliderLayout } from '../../layouts/SampleSliderLayout/SampleSliderLayout';
import { Samples } from '../../context/PlayerContext/types';

import styles from './SampleItem.module.scss';

type PropsType = {
	sample: Samples;
	idx: number;
};

export const SampleItem: React.FC<PropsType> = ({ sample, idx }) => {
	const { audio, _id } = sample;
	const [hover, setHover] = useState(false);
	const [width, setWidth] = useState<string>('550px');

	const { play, playTrack, isPlaying, currentSampleId } = useSound();
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (audio) {
			fetch(`http://localhost:5000/${audio}`).then((data) => {
				hookAudioWave(data.arrayBuffer(), canvasRef.current);
			});
		}

		const handleResize = () => {
			if (window.innerWidth < 1065) {
				setWidth('300px');
			} else {
				setWidth('550px')
			}
			if (window.innerWidth < 900) {
				setWidth('230px');
			} else {
				setWidth('550px')
			}
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
			setWidth('550px')
		};
	}, []);

	const packProfile = useSelector(selectPackProfile);

	return (
		<>
			<ul className={styles.listItem}>
				<li>
					<img
						src={`http://localhost:5000/${packProfile?.picture}`}
						alt={packProfile?.picture}
					/>

					<IconChangeLayout
						onClicked={(e: Event) => {
							e.stopPropagation();
							playTrack(idx, 'sample');
						}}
						iconOneOrTwo={isPlaying}
						currentTrackId={currentSampleId}
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
