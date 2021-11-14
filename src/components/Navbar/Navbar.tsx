import React, { useEffect, useState } from 'react';
import { CustomerServiceOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/fa';

import { NavbarList } from '../NavbarList/NavbarList';
import { Sidebar } from '../Sidebar/Sidebar';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { IconLayout } from '../../layouts/IconLayout/IconLayout';

import styles from './Navbar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../store/selectors/userSelectors';
import { logout } from '../../store/slices/user/userSlice';

export const Navbar = () => {
	const [mobile, setModile] = useState(false);
	const [sidebar, setSideBar] = useState(false);

	const dispatch = useDispatch();

	const isAuth = useSelector(selectAuth);

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
						{isAuth ? (
							<ButtonLayout
								typeStyle={'sign-in-out'}
								onClicked={() => dispatch(logout())}
							>
								<IconLayout iconName={'user'} />
								<span>Log Out</span>
							</ButtonLayout>
						) : (
							<ButtonLayout typeStyle={'sign-in-out'}>
								<IconLayout iconName={'user'} />
								<span>Log In</span>
							</ButtonLayout>
						)}
					</Link>
				)}
			</nav>
			{mobile && sidebar && (
				<Sidebar sidebar={sidebar} setSideBar={setSideBar} />
			)}
		</>
	);
};
