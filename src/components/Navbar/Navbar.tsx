import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { NavbarList } from '../NavbarList/NavbarList';
import { Sidebar } from '../Sidebar/Sidebar';
import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { IconLayout } from '../../layouts/IconLayout/IconLayout';
import { selectAuth } from '../../store/selectors/userSelectors';
import { logout } from '../../store/slices/user/userSlice';
import { setDefaultPackState } from '../../store/slices/pack/packSlice';

import styles from './Navbar.module.scss';

export const Navbar = () => {
	const [sidebar, setSideBar] = useState(false);

	const dispatch = useDispatch();

	const isAuth = useSelector(selectAuth);
	return (
		<>
			<nav className={isAuth ? styles.navbar : `${styles.navbar} ${styles.notAuth}`}>
				<Link to='/' className={styles.navbarLogo} onClick={() => setSideBar(true)}>
					<IconLayout iconName={'music'} />
					SampleCloud
				</Link>

				{sidebar ? (
					<Icons.FaTimes className={styles.sidebarToggleLogo} onClick={() => setSideBar(!sidebar)} />
				) : (
					<Icons.FaBars className={styles.sidebarToggleLogo} onClick={() => setSideBar(!sidebar)} />
				)}

				{isAuth ? <NavbarList /> : null}
				{
					<Link to='/login'>
						{isAuth ? (
							<ButtonLayout
								typeStyle={'sign-in-out'}
								onClicked={() => {
									dispatch(logout());
									dispatch(setDefaultPackState());
								}}
							>
								<IconLayout iconName={'login'} />
								<span>Log Out</span>
							</ButtonLayout>
						) : (
							<ButtonLayout typeStyle={'sign-in-out'}>
								<IconLayout iconName={'logout'} />
								<span>Log In</span>
							</ButtonLayout>
						)}
					</Link>
				}
			</nav>
			{sidebar && <Sidebar sidebar={sidebar} setSideBar={setSideBar} />}
		</>
	);
};
