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
import { fetchSetLike, fetchDeleteLike } from '../../store/slices/samples/samplesSlice';
// import WebWorkerEnabler from '../../utils/WebWorkerEnabler';
// import WebWorker from '../../utils/WebWorker';

import styles from './SampleItem.module.scss';
import { sendFileImages } from '../../utils/createSamples';

type PropsType = {
	sample: Samples;
	idx: number;
};

// const workerInstance = new WebWorkerEnabler(WebWorker);

export const SampleItem: React.FC<PropsType> = ({ sample, idx }) => {
	const { audio, _id, audioCoordinates, duration, likes, canvasImage } = sample;

	const packProfile = useSelector(selectPackProfile);

	const profileUpdate = packProfile?.update;

	const [width, setWidth] = useState<string>('550px');
	const [like, setLike] = useState<boolean>(false);

	const { playTrack, isPlaying, currentSampleId } = useSound();
	const dispatch = useDispatch();
	const canvasRef = useRef<HTMLCanvasElement>(null);

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

	// useEffect(() => {
	// 	if (audio && canvasRef?.current) {
	// 		// getAudioWave(audioCoordinatesParse, canvasRef.current, _id, profileUpdate);

	// 		// const offscreen = canvasRef?.current.transferControlToOffscreen();
	// 		// //@ts-ignore
	// 		// workerInstance.postMessage(
	// 		// 	{
	// 		// 		canvas: offscreen,
	// 		// 		audioCoordinates: audioCoordinatesParse,
	// 		// 		sampleId: _id,
	// 		// 		profileUpdate,
	// 		// 		cssCanvasWidth: 550,
	// 		// 		cssCanvasHeight: 50,
	// 		// 		dpr: 2,
	// 		// 	},
	// 		// 	[offscreen],
	// 		// );

	// 		// //@ts-ignore
	// 		// workerInstance.addEventListener('message', (e: any) => {
	// 		// 	const { file, sampleId, profileUpdate } = e.data;

	// 		// 	sendFileImages(file, profileUpdate, sampleId);
	// 		// });
	// 	}
	// }, [profileUpdate]);

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
						{profileUpdate ? (
							<canvas
								ref={canvasRef}
								style={{
									width: width,
									height: '35px',
								}}
							/>
						) : (
							<img
								src={`/${canvasImage}`}
								style={{
									width: width,
									height: '35px',
								}}
								alt={canvasImage}
							/>
						)}
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
