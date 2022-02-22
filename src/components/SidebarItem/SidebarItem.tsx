import React from 'react';
import { useHistory } from 'react-router-dom';

import { IconLayout, icons } from '../../layouts/IconLayout/IconLayout';

import styles from './SidebarItem.module.scss';

type SidebarItemProps = {
	pageName: string;
	iconName: keyof typeof icons;
	setSideBar: (value: boolean) => void;
};

export const SidebarItem: React.FC<SidebarItemProps> = ({
	pageName,
	iconName,
	setSideBar,
}) => {
	const history = useHistory();

	return (
		<>
			<li className={styles.sidebarItem}>
				<a
					onClick={() => {
						history.push(`/${iconName}`);
						setSideBar(false);
					}}
				>
					<IconLayout iconName={iconName} />
					<span>{pageName}</span>
				</a>
			</li>
		</>
	);
};
