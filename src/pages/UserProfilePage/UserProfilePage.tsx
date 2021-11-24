import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { UserProfileItem } from '../../components/UserProfileItem/UserProfileItem';
import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { selectUser } from '../../store/selectors/userSelectors';
import { fetchUpdateEmail, fetchUpdateFullName } from '../../store/slices/user/userSlice';
import { ProfileItems } from './ProfileItems';

import styles from './UserProfilePage.module.scss';

export const UserProfilePage: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const user = useSelector(selectUser);

	const [email, setEmail] = useState<string | undefined>('');
	const [fullname, setFullName] = useState<string | undefined>('');

	const onUpdateInfo = () => {
		if (user?.email != email) {
			console.log(user?.email, email);
			dispatch(fetchUpdateEmail({ email }));
		}

		if (user?.fullname != fullname) {
			dispatch(fetchUpdateFullName({ fullname }));
		}
	};

	useEffect(() => {
		setEmail(user?.email);
	}, [user?.email]);

	useEffect(() => {
		setFullName(user?.fullname);
	}, [user?.fullname]);

	return (
		<div className={styles.root}>
			<ul className={styles.userInfoList}>
				{ProfileItems.map((profileItems: ProfileItems, idx: number) => {
					return (
						<UserProfileItem
							key={idx}
							profileItems={profileItems.itemName}
							setFullName={setFullName}
							setEmail={setEmail}
						/>
					);
				})}
				<div className={styles.downloadPack}>
					<h1>Update</h1>
					<ButtonLayout typeStyle='update' onClicked={onUpdateInfo}>
						Update
					</ButtonLayout>
				</div>

				<div className={styles.downloadPack}>
					<h1>DOWNLOAD PACK</h1>
					<ButtonLayout
						onClicked={() => history.push('/profile/create')}
						typeStyle='update'
					>
						Download
					</ButtonLayout>
				</div>
			</ul>
		</div>
	);
};
