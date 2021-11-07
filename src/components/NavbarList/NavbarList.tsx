import React from 'react';
import { useHistory } from 'react-router-dom';

import { NavbarItem } from '../NavbarItem/NavbarItem';
import { icons } from '../../layouts/IconLayout/IconLayout';

import styles from './NavbarList.module.scss';

type PacksListProps = {};

export const NavbarList: React.FC<PacksListProps> = () => {
	const history = useHistory();

	type navbarListItemsType = {
		pageName: string;
		iconName: keyof typeof icons;
	}

	type menuItemsType = {
		text: string;
		href: string;
	}

	const navbarListItems: navbarListItemsType[]  = [
		{
			pageName: 'PACKS',
			iconName: 'packs',
		},
		{
			pageName: 'LIKES',
			iconName: 'likes',
		},
	];

	return (
		<>
			<ul className={styles.navItems}>
				{navbarListItems.map(({ pageName, iconName }, i: number) => (
					<NavbarItem key={i} pageName={pageName} iconName={iconName} />
				))}
			</ul>
		</>
	);
};
