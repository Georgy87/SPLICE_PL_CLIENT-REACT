import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Pack } from '../../store/slices/pack/types';
import { setSampleFiles } from '../../store/slices/samples/samplesSlice';

import styles from './UserPackItem.module.scss';

type PackListProps = {
	pack: Pack;
	active?: boolean;
	id: string;
	index: number;
};

export const UserPackItem: React.FC<PackListProps> = ({ pack, index, id }) => {
	const [drag, setDrag] = useState<boolean>(false);

	const history = useHistory();

	const dispatch = useDispatch();

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

		dispatch(setSampleFiles({ files, packId: id }));
	};

	return (
		<div className={`${styles.packCardWrapper} ${styles.changePage}`}>
			<div
				className={styles.packCard}
				onClick={() => history.push(`/profile-pack/${pack?._id}`)}
			>
				<img src={`/${pack.picture}`} />

				<div>
					<div>{pack.genre}</div>
					<div style={{ fontSize: 12, color: 'gray' }}>{pack.name}</div>
				</div>
			</div>

			<div className={styles.downloadSamples}>
				{!drag ? (
					<div onDragEnter={dragEnter} onDragLeave={dragLeave} onDragOver={dragEnter}>
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
		</div>
	);
};
