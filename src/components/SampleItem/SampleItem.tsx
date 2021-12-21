import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSound } from '../../hooks/useSound';
import { IconChangeLayout } from '../../layouts/IconChangeLayout/IconChangeLayout';
import { selectPackProfile } from '../../store/selectors/packsSelectors';
import { SampleSliderLayout } from '../../layouts/SampleSliderLayout/SampleSliderLayout';
import { formatTime } from '../../utils/formatTime';
import { Samples } from '../../store/slices/samples/types';
import { IconLayout } from '../../layouts/IconLayout/IconLayout';
import { fetchSetLike, fetchDeleteLike } from '../../store/slices/samples/samplesSlice';
import { canvasService } from '../../services/canvasService';

import styles from './SampleItem.module.scss';

type PropsType = {
	sample: Samples;
	idx: number;
};

export const SampleItem: React.FC<PropsType> = ({ sample, idx }) => {
	const { _id, audioCoordinates, duration, likes, canvasImage } = sample;

	const packProfile = useSelector(selectPackProfile);

	const [width, setWidth] = useState<string>('550px');
	const [like, setLike] = useState<boolean>(false);

	const { playTrack, isPlaying, currentSampleId, currentTime, percent } = useSound();
	const dispatch = useDispatch();
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const canvas: HTMLCanvasElement | null = canvasRef.current;

	const audioCoordinatesParse: number[] = JSON.parse(audioCoordinates);

	useEffect(() => {
		setLike(likes.length >= 1);

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

	useEffect(() => {
		if (currentSampleId === _id) {
			canvasService.sampleCanvas(canvas, audioCoordinatesParse, percent);
		}
	}, [canvas, currentTime]);

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
						{currentSampleId === _id && (
							<>
								<canvas
									ref={canvasRef}
									style={{
										width: width,
										height: '35px',
										zIndex: 50,
										position: 'absolute',
										top: 0,
										left: 0,
									}}
								/>
								{/* <div
									style={{
										height: '35px',
										zIndex: 49,
										position: 'absolute',
										top: 0,
										left: 0,
										backgroundColor: '#fff',
										width: `${percent}px`,
									}}
								/> */}
							</>
						)}

						<div
							className={styles.backgroundWave}
							style={{
								backgroundImage: `url(/${canvasImage})`,
								width: width,
							}}
						/>
					</SampleSliderLayout>

					<p className={styles.sampleName}>{sample.sampleName}</p>
					<div className={styles.rightWrap}>
						{!like ? (
							<IconLayout
								iconName='dislike'
								onClicked={() => {
									dispatch(fetchSetLike({ sampleId: _id }));
									setLike(!like);
								}}
							/>
						) : (
							<IconLayout
								iconName='like'
								onClicked={() => {
									dispatch(fetchDeleteLike({ sampleId: _id }));
									setLike(!like);
								}}
							/>
						)}
					</div>
				</li>
			</ul>
		</>
	);
};
