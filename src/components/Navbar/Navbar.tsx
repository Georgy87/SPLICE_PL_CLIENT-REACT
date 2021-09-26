import React from 'react';
import {
	MenuOutlined,
	CustomerServiceOutlined,
} from '@ant-design/icons';

import { useHistory } from 'react-router-dom';

import { NavbarList } from '../NavbarList/NavbarList';

import styles from './Navbar.module.scss';

const drawerWidth = 240;

export const Navbar = () => {
	const history = useHistory();

	return (
		<>
			<div className={`${styles.sidebar}`}>`
				<div className={styles.logoDetails}>
					<CustomerServiceOutlined />
					<span className={styles.logoName}>SPLICE</span>
				</div>
				<NavbarList/>
			</div>

			<div className={styles.homeSection}>
				<div className={styles.homeContent}>
					<MenuOutlined />
					<div className={styles.mainText}>
						Create, we'll do the rest.
					</div>
				</div>
			</div>
		</>
	);
};
