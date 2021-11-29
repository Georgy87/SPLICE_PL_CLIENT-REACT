import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSound } from '../../hooks/useSound';
import { IconChangeLayout } from '../../layouts/IconChangeLayout/IconChangeLayout';
import { selectPackProfile } from '../../store/selectors/packsSelectors';
import { SampleSliderLayout } from '../../layouts/SampleSliderLayout/SampleSliderLayout';
import { formatTime } from '../../utils/formatTime';
import { getAudioWave } from '../../utils/getAudioWave';
import { Samples } from '../../store/slices/samples/types';
import { IconLayout } from '../../layouts/IconLayout/IconLayout';
import { fetchSetLike } from '../../store/slices/samples/samplesSlice';

import styles from './SampleItem.module.scss';

type PropsType = {
	sample: Samples;
	idx: number;
};

export const SampleItem: React.FC<PropsType> = ({ sample, idx }) => {
	const packProfile = useSelector(selectPackProfile);

	const { audio, _id, audioCoordinates, duration, likes } = sample;

	const [width, setWidth] = useState<string>('550px');
	const [like, setLike] = useState<boolean>(false);

	const { playTrack, isPlaying, currentSampleId } = useSound();

	const dispatch = useDispatch();

	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		setLike(likes.length === 1);
		if (audio) {
			getAudioWave(audioCoordinates, canvasRef.current);
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

	const onChangeLike = () => {
		setLike(!like);
		dispatch(fetchSetLike({ sampleId: _id }));
	};

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
					<p className={styles.sampleName}>{sample.sampleName}</p>
					<div className={styles.rightWrap} onClick={onChangeLike}>
						{!like ? <IconLayout iconName='dislike' /> : <IconLayout iconName='like' />}
					</div>
				</li>
			</ul>
		</>
	);
};
