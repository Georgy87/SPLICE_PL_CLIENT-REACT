import { Dislike } from '../../components/Icons/Dislike';
import { Home } from '../../components/Icons/Home';
import { Like } from '../../components/Icons/Like';
import { Likes } from '../../components/Icons/Likes';
import { Login } from '../../components/Icons/Login';
import { Logout } from '../../components/Icons/Logout';
import { Metronom } from '../../components/Icons/Metronom';
import { Profile } from '../../components/Icons/Profile';
import { Sequencer } from '../../components/Icons/Sequencer';
import { Upload } from '../../components/Icons/Upload';

import styles from './IconLayout.module.scss';

export const icons = {
	home: Home,
	login: Login,
	logout: Logout,
	packs:  Home,
	profile: Profile,
	upload: Upload,
	music: Home,
	likes: Likes,
	like: Dislike,
	dislike: Like,
	drop: Upload,
	sequencer: Sequencer,
	metronom: Metronom,
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
