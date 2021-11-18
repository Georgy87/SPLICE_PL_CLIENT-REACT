import React, { ReactNode } from 'react';
import {
	BankOutlined,
	LoginOutlined,
	NotificationTwoTone,
	HomeOutlined,
	UploadOutlined,
	CustomerServiceOutlined,
} from '@ant-design/icons';

import * as Icons from 'react-icons/all';

import { AccountCircleOutlined } from '@material-ui/icons';

import styles from './IconLayout.module.scss';

export const icons = {
	home: Icons.FaHome,
	login: Icons.BiLogOutCircle,
	logout: Icons.IoMdLogOut,
	packs: NotificationTwoTone,
	genres: BankOutlined,
	profile: AccountCircleOutlined,
	upload: UploadOutlined,
	user: Icons.FaUserPlus,
	music: CustomerServiceOutlined,
	likes: Icons.FaHeart,
};

export type IconLayoutProps = {
	iconName: keyof typeof icons;
	className?: string;
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
