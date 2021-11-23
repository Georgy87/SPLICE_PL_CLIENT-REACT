import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import avatar from '../../assets/avatar/unnamed.jpg';
import { items } from '../../pages/UserProfilePage/ProfileItems';
import { selectUser } from '../../store/selectors/userSelectors';
import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';

import styles from './UserProfileItem.module.scss';

type PropsType = {
	profileItems: keyof typeof items;
	setEmail: (value: string | undefined) => void;
	setFullName: (value: string) => void;
};

export const UserProfileItem: React.FC<PropsType> = ({ profileItems, setEmail, setFullName }) => {
	const user = useSelector(selectUser);

	return (
		<>
			<li className={styles.profileListItem}>
				<label>{profileItems}</label>
				{profileItems === 'Photo' && (
					<div className={styles.avatar}>
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
