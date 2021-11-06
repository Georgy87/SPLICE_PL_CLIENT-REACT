import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { IconLayout, icons } from '../../layouts/IconLayout/IconLayout';

import styles from '../Navbar/Navbar.module.scss';

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
			<li>
				<a onClick={() => history.push(`/${iconName}`)}>
					<IconLayout iconName={iconName} />
					<span className={styles.linkName}>{pageName}</span>
				</a>
			</li>
		</>
	);
};
