import React from 'react';
import { Navbar } from '../components/Navbar/Navbar';

import styles from './MainLayout.module.scss';

export const MainLayout: React.FC = ({ children }) => {
	return (
		<>
			<div className={styles.PagesWrapper}>{children}</div>
		</>
	);
};
