import React from 'react';
import { useSelector } from 'react-redux';

import avatar from '../../assets/avatar/unnamed.jpg';
import { items } from '../../pages/UserProfilePage/ProfileItems';
import { selectUser } from '../../store/selectors/userSelectors';

import styles from './UserProfileItem.module.scss';

type PropsType = {
	profileItems: keyof typeof items;
};

export const UserProfileItem: React.FC<PropsType> = ({ profileItems }) => {
	const user = useSelector(selectUser);
	return (
		<li className={styles.profileListItem}>
			<label>{profileItems}</label>
			{profileItems === 'Photo' && (
				<div className={styles.avatar}>
					<img src={avatar} alt={avatar} />
				</div>
			)}
			{profileItems === 'Username' && <p>{user?.fullname}</p>}
		</li>
	);
};
