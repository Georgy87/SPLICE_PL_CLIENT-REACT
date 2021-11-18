import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { IconLayout } from '../../layouts/IconLayout/IconLayout';
import { selectAuth } from '../../store/selectors/userSelectors';
import { logout } from '../../store/slices/user/userSlice';
import { SidebarList } from '../SidebarList/SidebarList';

import styles from './Sidebar.module.scss';

type PropsType = {
	sidebar: boolean;
	setSideBar: (value: boolean) => void;
};

export const Sidebar: React.FC<PropsType> = ({ sidebar, setSideBar }) => {
	const isAuth = useSelector(selectAuth);
	const dispatch = useDispatch();
	return (
		<>
			<div
				className={
					sidebar
						? `${styles.sidebar} ${styles.active}`
						: `${styles.sidebar}`
				}
			>
				<SidebarList setSideBar={setSideBar} />
				<Link to='/login' onClick={() => setSideBar(!sidebar)}>
				{isAuth ? (
							<ButtonLayout
								typeStyle={'sign-in-out'}
								onClicked={() => dispatch(logout())}
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
			</div>
		</>
	);
};
