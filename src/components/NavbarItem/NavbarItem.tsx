import React from 'react';
import { useHistory } from 'react-router-dom';

import { IconLayout, icons } from '../../layouts/IconLayout/IconLayout';

import styles from './NavbarItem.module.scss';

type NavbarItemProps = {
	pageName: string;
	iconName: keyof typeof icons;
};

export const NavbarItem: React.FC<NavbarItemProps> = ({
	pageName,
	iconName,
}) => {
	const history = useHistory();

	return (
		<>
			<li className={styles.navItem}>
				<a onClick={() => history.push(`/${iconName}`)} href={`/${iconName}`}>
					<IconLayout iconName={iconName} />
					<span className={styles.linkName}>{pageName}</span>
				</a>
			</li>
		</>
	);
};
