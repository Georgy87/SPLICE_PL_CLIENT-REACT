import React from 'react';
import { useHistory } from 'react-router-dom';

import { ProfileItems } from './ProfileItems';

import styles from './UserProfilePage.module.scss';

export const ProfilePage: React.FC = () => {
	const history = useHistory();

	return (
		<div className={styles.root}>
			<ul className={styles.userInfoList}>
				{ProfileItems.map((profileItems: string) => {
					return <li>{profileItems}</li>;
				})}
			</ul>
			<button
				style={{ color: 'green', height: '100px', marginTop: '300px' }}
				onClick={() => history.push('/profile/create')}
			>
				DOWNLOAD PACK
			</button>
		</div>
	);
};
