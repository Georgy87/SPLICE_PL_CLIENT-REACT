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
import { IconChangeLayout } from '../../layouts/IconChangeLayout/IconChangeLayout';

import styles from './SequencerPage.module.scss';

export const SequencerPage = () => {
	const likedSamples = useSelector(selectLikedSamples);

	const dispatch = useDispatch();

	const { initialPattern, step, loadSamples, setTempo, onPlay, onStop } = useSequencer();

	const { dragEnter, dragStart } = useDropzone();

	const [pattern, setPattern] = useState<number[][]>(initialPattern);
	const [samplesBoxs, setSamplesBoxs] = useState<any>(['kick', 'snare', 'hihat', 'bass', 'smpl']);
	const [newSampleSrc, setNewSampleSrc] = useState<string>('');
	const [sampleList, setSampleList] = useState<string[]>([
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/openHat.wav',
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/openHat.wav',
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/openHat.wav',
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/openHat.wav',
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/openHat.wav',
	]);
	const [valueBpm, setValueBpm] = useState<number>(60);
	const [isPlaying, setIsPlaying] = useState<boolean>(true);

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
	}, [valueBpm]);

	useEffect(() => {
		loadSamples(sampleList);
	}, [sampleList]);

	const onDropHandler = (e: React.DragEvent<HTMLDivElement>, index: number) => {
		e.preventDefault();

		let sampleListCopy = [...sampleList];
		sampleListCopy[index] = `${newSampleSrc}`;
		setSampleList(sampleListCopy);
	};

	const onDragStart = (e: React.DragEvent<HTMLDivElement>, src: string) => {
		setNewSampleSrc(src);
	};

	const onChangeBpm = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValueBpm(+e.target.value);
	};

	return (
		<div className={styles.root}>
			<div className={styles.sequencerControls}>
				<IconChangeLayout
					onClicked={(e: Event) => {
						e.stopPropagation();
						setTempo(valueBpm);
						setIsPlaying(!isPlaying);
						if (isPlaying === true) {
							onPlay(sampleList);
						} else {
							onStop();
						}
					}}
					blockStyle={styles.playPauseCircle}
					iconOneOrTwo={!isPlaying}
					iconOne='play-sequencer'
					iconTwo='pause-sequencer'
					iconStyle={{
						color: '#121214',
						fontSize: '45px',
						cursor: 'pointer',
					}}
					typeBtn='pack'
				></IconChangeLayout>
				<div className={styles.bpmControls}>
					<IconLayout iconName='metronom' />
					<input type='text' onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeBpm(e)} defaultValue={valueBpm} />
					<ButtonLayout
						typeStyle='update-bpm'
						onClicked={() => {
							onStop();
							setTempo(valueBpm);
							onPlay(sampleList);
							if (isPlaying === true) {
								onStop();
								setTempo(valueBpm);
								
							}
						}}
					>
						Update bpm
					</ButtonLayout>
				</div>
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
