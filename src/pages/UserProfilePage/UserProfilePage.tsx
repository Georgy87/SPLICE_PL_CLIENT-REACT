import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { UserProfileItem } from '../../components/UserProfileItem/UserProfileItem';
import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { selectUser } from '../../store/selectors/userSelectors';
import { fetchUpdateEmail } from '../../store/slices/user/userSlice';
import { ProfileItems } from './ProfileItems';

import styles from './UserProfilePage.module.scss';

export const UserProfilePage: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const user = useSelector(selectUser);

	const [email, setEmail] = useState<string | undefined>('');
	const [name, setName] = useState<string | undefined>('');

	const onUpdateInfo = () => {
		if (user?.email != email) {
			console.log(user?.email, email);
			dispatch(fetchUpdateEmail({ email }));
		}

		if (user?.fullname != name) {
			console.log(name);
		}
	};

	useEffect(() => {
		setEmail(user?.email);
	}, [user?.email]);

	useEffect(() => {
		setName(user?.fullname);
	}, [user?.fullname]);

	return (
		<div className={styles.root}>
			<ul className={styles.userInfoList}>
				{ProfileItems.map((profileItems: ProfileItems, idx: number) => {
					return (
						<UserProfileItem
							key={idx}
							profileItems={profileItems.itemName}
							setName={setName}
							setEmail={setEmail}
						/>
					);
				})}
				<ButtonLayout typeStyle='update' onClicked={onUpdateInfo}>
					Update
				</ButtonLayout>
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
