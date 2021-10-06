import React, {
	DragEventHandler,
	useEffect,
	useState,
	useContext,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useActions } from '../../hooks/useAction';
import { Pack } from '../../store/types/packs';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { selectPacks } from '../../store/selectors/packsSelectors';
import { selectAudio } from '../../store/selectors/playerSelectors';
import { pausePack, playPack } from '../../store/slices/packSlice';
import { IconChangeLayout } from '../../layouts/IconChangeLayout/IconChangeLayout';

import { EventHandler } from 'redux-form';

import styles from './PackItem.module.scss';
import { Howl } from 'howler';

type PackListProps = {
	pack: Pack;
	active?: boolean;
	id: string;
	pageName?: string;
};

export const PackItem: React.FC<PackListProps> = ({ pack, id, pageName }) => {
	const [packId, setPackId] = useState<string>('');
	const [drag, setDrag] = useState<boolean>(false);
	const [btnChange, setBtnChange] = useState(true);

	const audio = useSelector(selectAudio);

	const { active, pause, volume } = useTypedSelector((state) => state.player);

	const dispatch = useDispatch();

	const router = useHistory();

	const {
		playTrack,
		pauseTrack,
		setActiveTrack,
		setAudioPlay,
		setAudioPause,
		setAudioSrc,
		setDuration,
		setCurrentTime,
	} = useActions();

	const play = async (id: any) => {
		setActiveTrack({ pack, flag: true });
	};

	const stop = async () => {};

	const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		console.log('Enter');
		setDrag(true);
	};

	const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDrag(false);
	};

	const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		const eventData = (e as React.DragEvent).dataTransfer;
		let files = [eventData.files];

		setDrag(false);
		// files.forEach((file) => dispatch(uploadFile(file, currentDir)));
	};

	return (
		<div className={styles.packCardWrapper}>
			<div className={styles.packCard}>
				<IconChangeLayout
					onClicked={() => play(pack._id)}
					blockStyle={styles.playPauseCircle}
					iconOneOrTwo={btnChange}
					iconOne='play'
					iconTwo='pause'
					iconStyle={{
						color: '#fff',
						fontSize: '60px',
						cursor: 'pointer',
					}}
					typeBtn='pack'
				></IconChangeLayout>

				<img src={`http://localhost:5000/${pack.picture}`} />

				<div>
					<div>{pack.trackName}</div>
					<div style={{ fontSize: 12, color: 'gray' }}>
						{pack.authorName}
					</div>
				</div>
				<button onClick={stop}>Stop</button>
			</div>
			{pageName === 'user-packs' && (
				<div className={styles.downloadSamples}>
					{!drag ? (
						<div
							onDragEnter={dragEnter}
							onDragLeave={dragLeave}
							onDragOver={dragEnter}
						>
							DOWNLOAD SAMPLES
						</div>
					) : (
						<div
							className={styles.drop}
							onDragEnter={dragEnter}
							onDragLeave={dragLeave}
							onDragOver={dragEnter}
							onDrop={onDrop}
						>
							DROP FILES
						</div>
					)}
				</div>
			)}
		</div>
	);
};
