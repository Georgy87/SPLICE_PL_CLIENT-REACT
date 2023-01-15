import { FC, ChangeEvent  } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userInfoItems } from '@pages/UserProfilePage/ProfileItems';
import { selectUser } from '@selectors/userSelectors';

import styles from './UserProfileItem.module.scss';

type PropsType = {
	profileItems: string;
	setEmail: (value: string | undefined) => void;
	setFullName: (value: string) => void;
	avatar: string;
};

export const UserProfileItem: FC<PropsType> = ({ profileItems, setEmail, setFullName, avatar }) => {
	const user = useSelector(selectUser);

	const navigate = useNavigate();

	return (
		<>
			<li className={styles.profileListItem}>
				<label>{profileItems}</label>
				{profileItems === 'Photo' && (
					<div className={styles.avatar} onClick={() => navigate('avatar')}>
					<img src={avatar} alt={avatar} />
				</div>
				)}
				{profileItems === 'Username' && <p>{user?.fullname}</p>}
				{profileItems === 'Email' && (
					<input
						defaultValue={user?.email}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setEmail(e.target.value);
						}}
					/>
				)}
				{profileItems === 'Name' && (
					<input
						defaultValue={user?.fullname}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setFullName(e.target.value)
						}
					/>
				)}
			</li>
		</>
	);
};
