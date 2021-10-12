import React, { ReactNode } from 'react';
import {
	BankOutlined,
	LoginOutlined,
	NotificationTwoTone,
	HomeOutlined,
	UploadOutlined,
} from '@ant-design/icons';

import { AccountCircleOutlined } from '@material-ui/icons';

import styles from './IconLayout.module.scss';

export const icons = {
	home: HomeOutlined,
	login: LoginOutlined,
	packs: NotificationTwoTone,
	genres: BankOutlined,
	profile: AccountCircleOutlined,
	upload: UploadOutlined,
};

export type IconLayoutProps = {
	iconName: keyof typeof icons;
};

export const IconLayout: React.FC<IconLayoutProps> = ({ iconName }) => {
	const Icon = icons[iconName];

	return (
		<>
			<div className={styles.iconContainer}>
				<Icon />
			</div>
		</>
	);
};
