import React from 'react';
import {
	DownOutlined,
} from '@ant-design/icons';

import { useHistory } from 'react-router-dom';
import { IconLayout } from '../../layouts/IconLayout/IconLayout';

import styles from '../Navbar/Navbar.module.scss';

type NavbarItemProps = {
	pageName: string;
	iconName: string;
};

export const NavbarItem: React.FC<NavbarItemProps> = ({
	pageName,
	iconName,
}) => {
	const history = useHistory();

	return (
		<>
			<li>
				{iconName === 'genres' ? (
					<div className={styles.iocnLink}>
						<a>
							<IconLayout iconName={iconName} />
							<span className={styles.linkName}>{pageName}</span>
						</a>
						<DownOutlined className={styles.arrow} />
					</div>
				) : (
					<a onClick={() => history.push(`/${iconName}`)}>
						<IconLayout iconName={iconName} />
						<span className={styles.linkName}>{pageName}</span>
					</a>
				)}
			</li>
		</>
	);
};
