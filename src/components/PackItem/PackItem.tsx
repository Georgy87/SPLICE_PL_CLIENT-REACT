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
import { IconChangeLayout } from '../../layouts/IconChangeLayout/IconChangeLayout';
import { useSound } from '../../hooks/useSound';

import styles from './PackItem.module.scss';

type PackListProps = {
	pack: Pack;
	active?: boolean;
	id: string;
	pageName?: string;
	index: number;
};

export const PackItem: React.FC<PackListProps> = ({
	pack,
	index,
	pageName,
	id,
}) => {
	const [packId, setPackId] = useState<string>('');
	const [drag, setDrag] = useState<boolean>(false);

	const { playPack, isPlaying, currentTrackId } = useSound();

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
	console.log(isPlaying, currentTrackId);
	return (
		<div className={styles.packCardWrapper}>
			<div className={styles.packCard}>
				<IconChangeLayout
					onClicked={() => playPack(index)}
					blockStyle={styles.playPauseCircle}
					iconOneOrTwo={isPlaying}
					trackId={id}
					currentTrackId={currentTrackId}
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
