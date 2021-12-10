import React from 'react';

import styles from './AvatarEditorPage.module.scss';

export const AvatarEditorPage = () => {
	return (
		<div className={styles.root}>
			<div className={styles.downloadAvatar}>
				<div className={styles.dropzoneText}>Добавьте изображение сюда</div>
			</div>
		</div>
	);
};
