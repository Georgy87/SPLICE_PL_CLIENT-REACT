import React from 'react';
import {
	BankOutlined,
	LoginOutlined,
	NotificationTwoTone,
	HomeOutlined,
} from '@ant-design/icons';

import { AccountCircleOutlined } from '@material-ui/icons';

type IconLayoutProps = {
	iconName: string;
};

export const IconLayout: React.FC<IconLayoutProps> = ({ iconName }) => {
	let icon = null;
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
	}

	return (
		<>
			<div>{icon}</div>
		</>
	);
};
