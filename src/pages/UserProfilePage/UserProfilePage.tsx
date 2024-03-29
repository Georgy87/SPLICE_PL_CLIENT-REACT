import { useEffect, useState, FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { UserProfileItem } from '@components/UserProfileItem';
import { ButtonLayout } from '@layouts/ButtonLayout';
import { selectUser } from '@selectors/userSelectors';
import { fetchUpdateEmail, fetchUpdateFullName } from '@slices/user/actions';
import { useAppDispatch } from '@store/types';
import avatar from '@assets/avatar/unnamed.jpg';

import { ProfileItems, ProfileTriggerItems, UserInfoItems, UserInfoTriggers } from './ProfileItems';

import styles from './UserProfilePage.module.scss';

export const UserProfilePage: FC = () => {
  const dispatch = useAppDispatch();

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

  const profileItems = () => {
    return ProfileItems.map((profileItems: UserInfoItems, idx: number) => (
      <UserProfileItem
        key={idx}
        profileItems={profileItems.itemName}
        setFullName={setFullName}
        setEmail={setEmail}
        avatar={avatar}
      />
    ));
  };

  const profileTriggerItems = () =>
    ProfileTriggerItems.map((profileTriggers: UserInfoTriggers, idx: number) => {
      return (
        <div className={styles.downloadPack} key={idx}>
          <h1>{profileTriggers.itemName}</h1>
          {profileTriggers.itemName === 'Update' && (
            <ButtonLayout typeStyle="update" onClicked={onUpdateInfo}>
              {profileTriggers.itemName}
            </ButtonLayout>
          )}
          {profileTriggers.itemName === 'DownLoad' && (
            <Link to={'/profile/create'} data-testid="create-pack-link">
              <ButtonLayout typeStyle="update">{profileTriggers.itemName}</ButtonLayout>
            </Link>
          )}
          {profileTriggers.itemName === 'Packs' && (
            <Link to={'/profile/packs'} data-testid="user-packs-link">
              <ButtonLayout typeStyle="update">{profileTriggers.itemName}</ButtonLayout>
            </Link>
          )}
        </div>
      );
    });

  return (
    <div className={styles.root} data-testid="user-profile-page">
      <ul className={styles.userInfoList}>
        {profileItems()}
        {profileTriggerItems()}
      </ul>
    </div>
  );
};
