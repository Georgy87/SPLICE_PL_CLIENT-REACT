import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSequencer } from '../../hooks/useSequencer';
import { IconLayout } from '../../layouts/IconLayout/IconLayout';
import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';

import { selectLikedSamples } from '../../store/selectors/userSelectors';
import { Samples } from '../../store/slices/samples/types';
import { Loader } from '../../components/Loader/Loader';
import { useDropzone } from '../../hooks/useDropzone';
import { IconChangeLayout } from '../../layouts/IconChangeLayout/IconChangeLayout';
import Modal from '../../layouts/ModalLayout/ModalLayout';
import { Sequencer } from '../../components/Sequencer/Sequencer';
import { fetchGetLikedSamples } from '../../store/slices/user/actions';
//@ts-ignore
import Kick from '../../assets/samples-sequenser/Kick.wav';
//@ts-ignore
import Clap from '../../assets/samples-sequenser/Clap.wav';
//@ts-ignore
import Hat from '../../assets/samples-sequenser/Hat.wav';
//@ts-ignore
import Open_Hat from '../../assets/samples-sequenser/Open-Hat.wav';

import styles from './SequencerPage.module.scss';

export const SequencerPage = () => {
	const likedSamples = useSelector(selectLikedSamples);

	const dispatch = useDispatch();

	const { initialPattern, step, requestId, loadSamples, setTempo, onPlay, onStop } = useSequencer();

	const { dragStart } = useDropzone();

	const [pattern, setPattern] = useState<number[][]>(initialPattern);

	const [newSampleSrc, setNewSampleSrc] = useState<string>('');
	const [sampleList, setSampleList] = useState<string[]>([
		Kick,
		Clap,
		Hat,
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/openHat.wav',
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/101507/openHat.wav',
	]);

	const [valueBpm, setValueBpm] = useState<number>(60);
	const [isPlaying, setIsPlaying] = useState<boolean>(true);
	const [activeModal, setActiveModal] = useState<boolean>(false);
	const [indexBox, setIndexBox] = useState<number>(0);

	function updatePattern({ x, y, value }: { x: number; y: number; value: number }) {
		const patternCopy: number[][] = [...pattern];
		patternCopy[y][x] = +!value;
		setPattern(patternCopy);
	}

	useEffect(() => {
		dispatch(fetchGetLikedSamples());
		window.cancelAnimationFrame(requestId);
	}, []);

	useEffect(() => {
		loadSamples(sampleList);
	}, [sampleList]);

	useEffect(() => {
		loadSamples(sampleList);
	}, [valueBpm]);

	const onDropHandler = (e: React.DragEvent<HTMLDivElement>, index: number) => {
		e.preventDefault();

		let sampleListCopy = [...sampleList];
		sampleListCopy[index] = newSampleSrc;
		setSampleList(sampleListCopy);
	};

	const setSampleHandler = (src: string) => {
		let sampleListCopy = [...sampleList];
		sampleListCopy[indexBox] = src;
		setSampleList(sampleListCopy);
	};

	const onChangeBpm = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValueBpm(+e.target.value);
	};

	return (
		<div className={styles.root} data-testid='sequencer-page'>
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

			<Sequencer
				setIndexBox={setIndexBox}
				setActiveModal={setActiveModal}
				step={step}
				pattern={pattern}
				updatePattern={updatePattern}
				onDropHandler={onDropHandler}
			/>

			{/* <div className={styles.desktopModalWrapper}>
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
			</div> */}

			<Modal setActive={setActiveModal} active={activeModal}>
				<div className={styles.mobileModalWrapper}>
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
										onClick={() => setSampleHandler(samples.audio)}
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
			</Modal>
		</div>
	);
};
