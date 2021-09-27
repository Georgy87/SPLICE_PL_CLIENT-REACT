import React, { useState } from 'react';
import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';

import styles from './PackInfoUpload.module.scss';

type PropsType = {
	setInfo: Function;
};

export const PackInfoUpload: React.FC<PropsType> = ({ setInfo }) => {
	const [trackName, setPackName] = useState('');
	const [authorName, setAuthorName] = useState('');
	const [packInfo, setPackInfo] = useState('');

	const onSendInfo = () => {
		setInfo({
			trackName,
			authorName,
			packInfo,
		});
	};

	return (
		<div className={styles.packUploadWrapper}>
			<label>Названия пака</label>
			<input
				style={{ marginTop: 10 }}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setPackName(e.target.value)
				}
			/>

			<label>Имя автора</label>
			<input
				style={{ marginTop: 10 }}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setAuthorName(e.target.value)
				}
			/>

			<label>Описание</label>
			<textarea
				style={{ marginTop: 10 }}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
					setPackInfo(e.target.value)
				}
			/>
			<ButtonLayout typeStyle='black' onClicked={onSendInfo}>
				Добавить информацию о паке
			</ButtonLayout>
		</div>
	);
};
