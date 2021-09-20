import React from 'react';

import styles from '../../styles/pagesStyles/MainPage.module.scss';

export const MainPage: React.FC = () => {
	return (
		<div className={styles.container}>
			<img
				src='https://darbaculture.com/wp-content/uploads/2018/03/asap-rocky.jpg'
				alt='main-image'
			/>
		</div>
	);
};
