import React from 'react';
import { MainLayout } from '../../layouts/MainLayout';

import styles from '../../styles/pagesStyles/MainPage.module.scss';

export const MainPage: React.FC = () => {
	return (
		<div className={styles.container}>
			<img
				src='https://samesound.ru/wp-content/uploads/2016/10/SONAR-2016-hero.jpg'
				alt='main-image'
			/>
		</div>
	);
};
