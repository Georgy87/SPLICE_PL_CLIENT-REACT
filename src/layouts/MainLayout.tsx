import React from 'react';
import { Navbar } from '../components/Navbar';

import styles from './MainLayout.module.scss';

const MainLayout: React.FC = ({ children }) => {

	return (
		<>
			<Navbar />
			<div className={styles.PagesWrapper}>{children}</div>
		</>
	);
};

export default MainLayout;