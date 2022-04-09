import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { UserProfileItem } from '../../components/UserProfileItem/UserProfileItem';
import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { selectUser } from '../../store/selectors/userSelectors';
import { fetchUpdateEmail, fetchUpdateFullName } from '../../store/slices/user/actions';
import { ProfileItems, ProfileTriggerItems, UserInfoItems, UserInfoTriggers } from './ProfileItems';
import avatar from '../../assets/avatar/unnamed.jpg';

import styles from './UserProfilePage.module.scss';

export const UserProfilePage: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const user = useSelector(selectUser);

	const [email, setEmail] = useState<string | undefined>('');
	const [fullname, setFullName] = useState<string | undefined>('');

	useEffect(() => {
		setEmail(user?.email);
	}, [user?.email]);

	useEffect(() => {
		setFullName(user?.fullname);
	}, [user?.fullname]);

	const onUpdateInfo = () => {
		if (user?.email !== email) {
			dispatch(fetchUpdateEmail({ email }));
		}

		if (user?.fullname !== fullname) {
			dispatch(fetchUpdateFullName({ fullname }));
		}
	};

	return (
		<div className={styles.root} data-testid='user-profile-page'>
			<ul className={styles.userInfoList}>
				{ProfileItems.map((profileItems: UserInfoItems, idx: number) => {
					return (
						<UserProfileItem
							key={idx}
							profileItems={profileItems.itemName}
							setFullName={setFullName}
							setEmail={setEmail}
							avatar={avatar}
						/>
					);
				})}

				{ProfileTriggerItems.map((profileTriggers: UserInfoTriggers, idx: number) => {
					return (
						<div className={styles.downloadPack} key={idx}>
							<h1>{profileTriggers.itemName}</h1>
							{profileTriggers.itemName === 'Update' && (
								<ButtonLayout typeStyle='update' onClicked={onUpdateInfo}>
									{profileTriggers.itemName}
								</ButtonLayout>
							)}
							{profileTriggers.itemName === 'DownLoad' && (
								<Link to={'/profile/create'} data-testid='create-pack-link'>
									<ButtonLayout typeStyle='update'>
										{profileTriggers.itemName}
									</ButtonLayout>
								</Link>
							)}
							{profileTriggers.itemName === 'Packs' && (
								<Link to={'/profile/packs'} data-testid='user-packs-link'>
									<ButtonLayout typeStyle='update'>
										{profileTriggers.itemName}
									</ButtonLayout>
								</Link>
							)}
						</div>
					);
				})}
			</ul>
		</div>
	);
};
