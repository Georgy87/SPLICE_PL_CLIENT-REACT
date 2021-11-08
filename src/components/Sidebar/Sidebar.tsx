import React from 'react';
import * as Icons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { IconLayout } from '../../layouts/IconLayout/IconLayout';

import { SidebarList } from '../SidebarList/SidebarList';

import styles from './Sidebar.module.scss';

type PropsType = {
	sidebar: boolean;
	setSideBar: (value: boolean) => void;
};

export const Sidebar: React.FC<PropsType> = ({ sidebar, setSideBar }) => {
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
					<ButtonLayout typeStyle={'sign-in-out'}>
						<IconLayout iconName={'user'} />
						<span>Log In</span>
					</ButtonLayout>
				</Link>
			</div>
		</>
	);
};
