import React, { useState } from 'react';
import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';

import styles from './PackInfoUpload.module.scss';

type PropsType = {
	setInfo: Function;
};

export const PackInfoUpload: React.FC<PropsType> = ({ setInfo }) => {
	const [genre, setGenre] = useState<string>('');
	const [authorName, setAuthorName] = useState<string>('');
	const [packInfo, setPackInfo] = useState<string>('');

	const onSendInfo = () => {
		setInfo({
			genre,
			authorName,
			packInfo,
		});
	};

	return (
		<div className={styles.packUploadWrapper}>
			<label>GENRE</label>
			<input
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setGenre(e.target.value)
				}
			/>

			<label>AUTHOR NAME</label>
			<input
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setAuthorName(e.target.value)
				}
			/>

			<label>DESCRIPTION</label>
			<textarea
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
					setPackInfo(e.target.value)
				}
			/>
			<ButtonLayout typeStyle='black' onClicked={onSendInfo}>
				SAVE INFO
			</ButtonLayout>
		</div>
	);
};
