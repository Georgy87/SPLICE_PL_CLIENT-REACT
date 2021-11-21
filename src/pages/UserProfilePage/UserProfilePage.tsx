import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { UserProfileItem } from '../../components/UserProfileItem/UserProfileItem';
import { selectUser } from '../../store/selectors/userSelectors';
import { items, ProfileItems } from './ProfileItems';

import styles from './UserProfilePage.module.scss';

export const ProfilePage: React.FC = () => {
	const history = useHistory();

	return (
		<div className={styles.root}>
			<ul className={styles.userInfoList}>
				{ProfileItems.map((profileItems: ProfileItems) => {
					return <UserProfileItem profileItems={profileItems.itemName} />;
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
