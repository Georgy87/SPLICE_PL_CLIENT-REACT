import React, { useRef } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { Pack } from '../../store/slices/pack/types';
import { setSampleFiles } from '../../store/slices/samples/samplesSlice';
import { useDropzone } from '../../hooks/useDropzone';
import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { IconLayout } from '../../layouts/IconLayout/IconLayout';

import styles from './UserPackItem.module.scss';

type PackListProps = {
	pack: Pack;
	active?: boolean;
	id: string;
	index: number;
};

export const UserPackItem: React.FC<PackListProps> = ({ pack, index, id }) => {
	const { drag, setDrag, dragEnter, dragLeave } = useDropzone();

	const ref = useRef<HTMLInputElement>(null);

	const history = useHistory();

	const dispatch = useDispatch();

	const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		const eventData = (e as React.DragEvent).dataTransfer;
		let file = [eventData.files];

		setDrag(false);

		Object.values(file[0]).forEach((file: File) => {
			dispatch(setSampleFiles({ id: uuidv4(), file, packId: id }));
		});
	};

	const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			Object.values(e.target.files).forEach((file: File) => {
				dispatch(setSampleFiles({ id: uuidv4(), file, packId: id }));
			});
		}	
	};

	return (
		<div className={`${styles.packCardWrapper} ${styles.changePage}`}>
			<div className={styles.packCard} onClick={() => history.push(`/profile-pack/${pack?._id}`)}>
				<img src={`${pack.picture}`} alt='pack-cover' />

				<div>
					<div>{pack.genre}</div>
					<div style={{ fontSize: 12, color: 'gray' }}>{pack.name}</div>
				</div>
			</div>

			<div className={styles.dropSamples}>
				{!drag ? (
					<div onDragEnter={dragEnter} onDragLeave={dragLeave} onDragOver={dragEnter}>
						DOWNLOAD SAMPLES
					</div>
				) : (
					<div className={styles.drop} onDragEnter={dragEnter} onDragLeave={dragLeave} onDragOver={dragEnter} onDrop={onDrop}>
						DROP FILES
					</div>
				)}
			</div>
			<div onClick={() => ref.current?.click()} className={styles.uploadSamples}>
				<input type='file' accept='audio/wav' style={{ display: 'none' }} ref={ref} multiple onChange={onFileUpload} />
				<ButtonLayout typeStyle='download'>
					<IconLayout iconName='upload' />
					DOWNLOAD SAMPLES
				</ButtonLayout>
			</div>
		</div>
	);
};
