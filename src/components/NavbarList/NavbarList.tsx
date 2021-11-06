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
			pageName: 'HOME',
			iconName: 'home',
		},
		{
			pageName: 'LOGIN',
			iconName: 'login',
		},
		{
			pageName: 'PACKS',
			iconName: 'packs',
		},
		{
			pageName: 'GENRES',
			iconName: 'genres',
		},
		{
			pageName: 'PROFILE',
			iconName: 'profile',
		},
	];

	const menuItems: menuItemsType[] = [
		{ text: 'TRAP', href: '#' },
		{ text: 'CINEMA', href: '#' },
		{ text: 'FUTURE BASE', href: '#' },
	];

	// TODO ДОРАБОТАТЬ КОМПОНЕНТ

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
