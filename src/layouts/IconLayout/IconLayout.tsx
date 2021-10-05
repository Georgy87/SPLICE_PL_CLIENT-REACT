import React from 'react';
import {
	BankOutlined,
	LoginOutlined,
	NotificationTwoTone,
	HomeOutlined,
	UploadOutlined,
} from '@ant-design/icons';

import { AccountCircleOutlined } from '@material-ui/icons';

import styles from './IconLayout.module.scss';

type IconLayoutProps = {
	iconName: string;
};

export const IconLayout: React.FC<IconLayoutProps> = ({ iconName }) => {
	let icon = null;
	const Icon = {
		login: LoginOutlined,
	}
	switch (iconName) {
		case '':
			icon = <HomeOutlined />;
			break;
		case 'login':
			icon = <LoginOutlined />;
			break;
		case 'packs':
			icon = <NotificationTwoTone />;
			break;
		case 'genres':
			icon = <BankOutlined />;
			break;
		case 'profile':
			icon = <AccountCircleOutlined />;
			break;
		case 'upload':
			icon = <UploadOutlined />;
			break;
	}

	return (
		<>
			<div className={styles.iconContainer}>{icon}</div>
		</>
	);
};
