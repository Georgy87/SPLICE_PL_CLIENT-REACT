import React, { useEffect, useState } from 'react';
import { CustomerServiceOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/fa';

import { NavbarList } from '../NavbarList/NavbarList';
import { Sidebar } from '../Sidebar/Sidebar';

import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { IconLayout } from '../../layouts/IconLayout/IconLayout';

import styles from './Navbar.module.scss';

export const Navbar = () => {
	const [mobile, setModile] = useState(false);
	const [sidebar, setSideBar] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 1065) {
				setModile(true);
			} else {
				setModile(false);
				setSideBar(false);
			}
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<>
			<nav className={styles.navbar}>
				<Link
					to='/'
					className={styles.navbarLogo}
					onClick={() => setSideBar(true)}
				>
					<IconLayout iconName={'music'} />
					SampleCloud
				</Link>
				{mobile && (
					<>
						{sidebar ? (
							<Icons.FaTimes
								className={styles.sidebarToggleLogo}
								onClick={() => setSideBar(!sidebar)}
							/>
						) : (
							<Icons.FaBars
								className={styles.sidebarToggleLogo}
								onClick={() => setSideBar(!sidebar)}
							/>
						)}
					</>
				)}
				{!mobile && <NavbarList />}
				{!mobile && (
					<Link to='/login'>
						<ButtonLayout typeStyle={'sign-in-out'}>
							<IconLayout iconName={'user'} />
							<span>Log In</span>
						</ButtonLayout>
					</Link>
				)}
			</nav>
			{mobile && <Sidebar sidebar={sidebar} />}
		</>
	);
};

{
	/* <div className={`${styles.sidebar}`}>`
				<div className={styles.logoDetails}>
					<CustomerServiceOutlined />
					<span className={styles.logoName}>SPLICE</span>
				</div>
				<NavbarList/>
			</div> */
}
