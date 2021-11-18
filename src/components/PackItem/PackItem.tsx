import React, { MouseEventHandler, useState } from 'react';
import { useHistory } from 'react-router';

import { IconChangeLayout } from '../../layouts/IconChangeLayout/IconChangeLayout';
import { useSound } from '../../hooks/useSound';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import { Pack } from '../../store/slices/pack/types';
import { fetchCreateSamples } from '../../store/slices/samples/samplesSlice';

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
	const [drag, setDrag] = useState<boolean>(false);

	const { playTrack, isPlaying, currentPackId } = useSound();

	const history = useHistory();

	const createSamples = useAsyncAction<any, any>(fetchCreateSamples);

	const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
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

		createSamples({ files, packId: pack._id });
	};

	return (
		<div
			className={
				pageName === 'user-packs'
					? `${styles.packCardWrapper} ${styles.changePage}`
					: styles.packCardWrapper
			}
		>
			<div
				className={styles.packCard}
				onClick={() => history.push(`profile-pack/${pack?._id}`)}
			>
				<IconChangeLayout
					onClicked={(e: Event) => {
						e.stopPropagation();
						playTrack(index, 'packs');
					}}
					blockStyle={styles.playPauseCircle}
					iconOneOrTwo={isPlaying}
					trackId={id}
					currentTrackId={currentPackId}
					iconOne='play'
					iconTwo='pause'
					iconStyle={{
						color: '#fff',
						fontSize: '60px',
						cursor: 'pointer',
					}}
					typeBtn='pack'
				></IconChangeLayout>

				<img src={`/${pack.picture}`} />

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
