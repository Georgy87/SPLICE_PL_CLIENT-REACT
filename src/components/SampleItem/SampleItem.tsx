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
import { workerInstanceViewSample } from '../../workers/WebWorkerEnabler';

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
		// if (canvasRef?.current) {
		// 	const offscreen = canvasRef?.current.transferControlToOffscreen();

		// 	workerInstanceViewSample.postMessage(
		// 		{
		// 			audioCoordinates: audioCoordinatesParse,
		// 			canvas: offscreen,
		// 			cssCanvasWidth: 550,
		// 			cssCanvasHeight: 50,
		// 			dpr: 2,
		// 			currentTime: currentTime,
		// 		},
		// 		[offscreen],
		// 	);
		// }

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
		// const canvasData = {
		// 	audioCoordinates: audioCoordinatesParse,
		// 	cssCanvasWidth: 550,
		// 	cssCanvasHeight: 50,
		// 	dpr: 2,
		// 	currentTime: currentTime,
		// };

		const dpr = window.devicePixelRatio || 1;

		const cssCanvasWidth: number = 550;
		const cssCanvasHeight: number = 50;

		if (canvas != null) {
			if (currentSampleId === _id) {
				canvas.width = cssCanvasWidth * dpr;
				canvas.height = cssCanvasHeight * dpr;
				const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
				if (ctx === null) return;

				ctx?.scale(dpr, dpr);
				ctx?.translate(0, cssCanvasHeight / dpr);

				const barWidth = canvas.offsetWidth / audioCoordinatesParse.length;

				ctx.beginPath();

				const drawLineSegment = (ctx: CanvasRenderingContext2D, x: number, barHeight: number, barWidth: number) => {
					ctx.fillStyle = 'red';
					ctx.fillRect(x + barWidth / 2, -(barHeight / 2), 0.5, barHeight);
					ctx.stroke();
				};
			
				for (let i = 0; i < percent; i++) {
					const x = barWidth * i;
					let barHeight = audioCoordinatesParse[i];
					drawLineSegment(ctx, x, barHeight, barWidth);
				}
			}
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
							<canvas
								ref={canvasRef}
								style={{
									width: width,
									height: '35px',
									zIndex: 50,
									position: 'absolute',
								}}
							/>
						)}

						<img
							src={`/${canvasImage}`}
							style={{
								position: 'relative',
								width: width,
								height: '35px',
								zIndex: -50,
							}}
							alt={canvasImage}
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
