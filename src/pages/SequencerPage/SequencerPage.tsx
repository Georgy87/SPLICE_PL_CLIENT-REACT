import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SequencerStateType, useSequencer } from '../../hooks/useSequencer';
import { getColumnColor } from '../../utils/getColumnColor';
import { IconLayout } from '../../layouts/IconLayout/IconLayout';
import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { fetchGetLikedSamples } from '../../store/slices/user/userSlice';
import { selectLikedSamples } from '../../store/selectors/userSelectors';
import { Samples } from '../../store/slices/samples/types';
import { Loader } from '../../components/Loader/Loader';
import { useDropzone } from '../../hooks/useDropzone';

import styles from './SequencerPage.module.scss';
import { NavLink } from 'react-router-dom';

export const SequencerPage = () => {
	const likedSamples = useSelector(selectLikedSamples);

	const dispatch = useDispatch();

	const { onPlay, onStop, initialPattern, step, loadSamples } = useSequencer();

	const { dragEnter, dragStart } = useDropzone();

	const [pattern, setPattern] = useState<number[][]>(initialPattern);
	const [samplesBoxs, setSamplesBoxs] = useState<any>(['kick', 'snare', 'hihat', 'bass', 'smpl']);
	const [newSampleSrc, setNewSampleSrc] = useState<string>('');
	const [sampleList, setSampleList] = useState<string[]>([
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/openHat.wav',
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/openHat.wav',
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/openHat.wav',
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/openHat.wav',
		'http://localhost:5000/audio/26f1c160-8818-458c-82fc-d417567b262c.wav',
	]);

	function updatePattern({ x, y, value }: { x: number; y: number; value: number }) {
		const patternCopy: number[][] = [...pattern];
		patternCopy[y][x] = +!value;

		setPattern(patternCopy);
	}

	useEffect(() => {
		dispatch(fetchGetLikedSamples());
	}, []);

	useEffect(() => {
		loadSamples(sampleList);
	}, [sampleList]);

	const onDropHandler = (e: React.DragEvent<HTMLDivElement>, index: number) => {
		e.preventDefault();

		let sampleListCopy = [...sampleList];
		sampleListCopy[index] = `http://localhost:5000/${newSampleSrc}`;
		setSampleList(sampleListCopy);
	};

	const onDragStart = (e: React.DragEvent<HTMLDivElement>, src: string) => {
		setNewSampleSrc(src);
	};

	return (
		<div className={styles.root}>
			<div className={styles.sequencerControls}>
				<button onClick={() => onPlay(sampleList)}>Play</button>
				<button onClick={() => onStop()}>Stop</button>
			</div>
			<div className={styles.sequencerContainer}>
				<div className={styles.dropBoxes}>
					{samplesBoxs.map((src: string, index: number) => {
						return (
							<div onDragOver={dragEnter} onDrop={(e: React.DragEvent<HTMLDivElement>) => onDropHandler(e, index)}>
								<ButtonLayout typeStyle='sequencer'>
									<IconLayout iconName='drop'></IconLayout>
								</ButtonLayout>
							</div>
						);
					})}
				</div>
				<div className={styles.sequencerSteps}>
					{pattern.map((row: number[], y: number) => (
						<div>
							{row.map((value: number, x: number) => (
								<button
									className={x === step - 1 ? `${styles.sampleBox} ${styles.active}` : `${styles.sampleBox}`}
									style={{ backgroundColor: getColumnColor(x), background: value === 1 ? 'blue' : getColumnColor(x) }}
									onClick={() => updatePattern({ x, y, value })}
								></button>
							))}
						</div>
					))}
				</div>
			</div>

			<div className={styles.samplesContainer}>
				{!likedSamples ? (
					<Loader />
				) : (
					likedSamples?.map((samples: Samples) => {
						return (
							<ul
								key={samples._id}
								className={styles.likesSample}
								draggable={true}
								onDragStart={(e: React.DragEvent<HTMLUListElement>) => dragStart(e, samples.audio, setNewSampleSrc)}
							>
								<li>
									<img src={samples.packPicture} alt='likes-sample' />
									<p>{samples.sampleName}</p>
								</li>
							</ul>
						);
					})
				)}
			</div>
		</div>
	);
};
