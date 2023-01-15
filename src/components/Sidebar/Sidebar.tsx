import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ButtonLayout } from '@layouts/ButtonLayout';
import { IconLayout } from '@layouts/IconLayout';
import { selectAuth } from '@selectors/userSelectors';
import { logout } from '@slices/user/userSlice';
import { useAppDispatch } from '@store/types';
import { SidebarList } from '@components/SidebarList';

import styles from './Sidebar.module.scss';

type PropsType = {
	sidebar: boolean;
	setSideBar: (value: boolean) => void;
};

export const Sidebar: React.FC<PropsType> = ({ sidebar, setSideBar }) => {
	const isAuth = useSelector(selectAuth);

	const dispatch = useAppDispatch();
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
								typeStyle={'sign-in-out-sidebar'}
								onClicked={() => dispatch(logout())}
							>
								<IconLayout iconName={'login'} />
								<span>Log Out</span>
							</ButtonLayout>
						) : (
							<ButtonLayout typeStyle={'sign-in-out-sidebar'}>
								<IconLayout iconName={'logout'} />
								<span>Log In</span>
							</ButtonLayout>
						)}
				</Link>
			</div>
		</>
	);
};
