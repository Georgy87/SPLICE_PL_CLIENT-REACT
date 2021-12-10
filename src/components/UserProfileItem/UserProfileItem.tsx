import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import avatar from '../../assets/avatar/unnamed.jpg';
import { userInfoItems } from '../../pages/UserProfilePage/ProfileItems';
import { selectUser } from '../../store/selectors/userSelectors';

import styles from './UserProfileItem.module.scss';

type PropsType = {
	profileItems: keyof typeof userInfoItems;
	setEmail: (value: string | undefined) => void;
	setFullName: (value: string) => void;
};

export const UserProfileItem: React.FC<PropsType> = ({ profileItems, setEmail, setFullName }) => {
	const user = useSelector(selectUser);

	const history = useHistory();

	return (
		<>
			<li className={styles.profileListItem}>
				<label>{profileItems}</label>
				{profileItems === 'Photo' && (
					<div className={styles.avatar} onClick={() => history.push('profile/avatar')}>
						<img src={avatar} alt={avatar} />
					</div>
				)}
				{profileItems === 'Username' && <p>{user?.fullname}</p>}
				{profileItems === 'Email' && (
					<input
						defaultValue={user?.email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setEmail(e.target.value);
						}}
					/>
				)}
				{profileItems === 'Name' && (
					<input
						defaultValue={user?.fullname}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
					/>
				)}
			</li>
		</>
	);
};
