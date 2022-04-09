import { BankOutlined, NotificationTwoTone, UploadOutlined, CustomerServiceOutlined, HeartOutlined } from '@ant-design/icons';
import { FaHome, FaUserPlus, FaHeart } from 'react-icons/fa';
import { BiLogOutCircle } from 'react-icons/bi';
import { IoMdLogOut } from 'react-icons/io';
import { BsUpload } from 'react-icons/bs';
import { CgMusic } from 'react-icons/cg';
import { GiMetronome } from 'react-icons/gi';

import { AccountCircleOutlined } from '@material-ui/icons';

import styles from './IconLayout.module.scss';

export const icons = {
	home: FaHome,
	login: BiLogOutCircle,
	logout: IoMdLogOut,
	packs: NotificationTwoTone,
	genres: BankOutlined,
	profile: AccountCircleOutlined,
	upload: UploadOutlined,
	user: FaUserPlus,
	music: CustomerServiceOutlined,
	likes: FaHeart,
	like: FaHeart,
	dislike: HeartOutlined,
	drop: BsUpload,
	sequencer: CgMusic,
	metronom: GiMetronome,
};

export type IconLayoutProps = {
	iconName: keyof typeof icons;
	className?: string;
	width?: string;
	height?: string;
	onClicked?: () => void;
};

export const IconLayout: React.FC<IconLayoutProps> = ({ iconName, onClicked }) => {
	const Icon = icons[iconName];

	return (
		<>
			<div className={styles.iconContainer} onClick={onClicked}>
				<Icon />
			</div>
		</>
	);
};
