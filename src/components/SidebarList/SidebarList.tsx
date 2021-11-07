import React, { useEffect, useState } from 'react';
import * as Icons from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';

import { IconLayout, icons } from '../../layouts/IconLayout/IconLayout';

import styles from './SidebarList.module.scss';

type sidebarListItemsType = {
	pageName: string;
	iconName: keyof typeof icons;
}

const navbarListItems: sidebarListItemsType[]  = [
	{
		pageName: 'PACKS',
		iconName: 'packs',
	},
	{
		pageName: 'LIKES',
		iconName: 'likes',
	},
];

export const SidebarList = () => {
	const [mobile, setModile] = useState(false);
	const [sidebar, setSideBar] = useState(false);

	const history = useHistory();

	return (
		<>
			<ul className={styles.sidebarItems}>
			<li className={styles.navItem}>
				<a onClick={() => history.push(`/${iconName}`)}>
					<IconLayout iconName={iconName} />
					<span className={styles.linkName}>{pageName}</span>
				</a>
			</li>
            </ul>
			{/* <Button onClick={() => setSideBar(false)} /> */}
		</>
	);
};
