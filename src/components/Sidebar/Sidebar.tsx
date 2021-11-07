import React from 'react';
import * as Icons from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { SidebarList } from '../SidebarList/SidebarList';

import styles from './Sidebar.module.scss';

type PropsType = {
    sidebar: boolean;
}

export const Sidebar: React.FC<PropsType> = ({ sidebar }) => {

	return (
		<>
			<div className={sidebar ? 'sidebar active' : `${styles.sidebar}`}>
				<SidebarList />
				{/* <Button onClick={() => setSideBar(false)} /> */}
				<Link to='signup'>
					<button className='btn'>
						<Icons.FaUserPlus />
						<span>Sign Up</span>
					</button>
				</Link>
			</div>
		</>
	);
};
