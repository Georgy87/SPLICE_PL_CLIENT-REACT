import React from 'react';
import {
	BankOutlined,
	LoginOutlined,
	DownOutlined,
	NotificationTwoTone,
} from '@ant-design/icons';

type IconLayoutProps = {
	iconName: string;
};

export const IconLayout: React.FC<IconLayoutProps> = ({ iconName }) => {
	let icon = null;
	switch (iconName) {
		case 'login':
			icon = <LoginOutlined />;
			break;
		case 'packs':
			icon = <NotificationTwoTone />;
			break;
		case 'genres':
			icon = <BankOutlined />;
			break;
	}

	return <><div>{icon}</div></>;
};
