import React from 'react';
import { useNavigate } from 'react-router-dom';

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
	const navigate = useNavigate();

	return (
		<>
			<li className={styles.sidebarItem}>
				<a
					onClick={() => {
						navigate(`/${iconName}`);
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
