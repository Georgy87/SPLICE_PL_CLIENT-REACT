import React, { useEffect, useState } from 'react';
import * as Icons from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';

import { IconLayout, icons } from '../../layouts/IconLayout/IconLayout';
import { SidebarItem } from '../SidebarItem/SidebarItem';

import styles from './SidebarList.module.scss';

type sidebarListItemsType = {
	pageName: string;
	iconName: keyof typeof icons;
};

const navbarListItems: sidebarListItemsType[] = [
	// {
	// 	pageName: 'PACKS',
	// 	iconName: 'packs',
	// },
	{
		pageName: 'LIKES',
		iconName: 'likes',
	},
	{
		pageName: 'HOME',
		iconName: 'home',
	},
];

type PropsType = {
	setSideBar: (value: boolean) => void;
}

export const SidebarList: React.FC<PropsType> = ({ setSideBar }) => {
	return (
		<>
			<ul className={styles.sidebarItems}>
				{navbarListItems.map(({ pageName, iconName }, i: number) => (
					<SidebarItem
						key={i}
						pageName={pageName}
						iconName={iconName}
						setSideBar={setSideBar}
					/>
				))}
			</ul>
		</>
	);
};
