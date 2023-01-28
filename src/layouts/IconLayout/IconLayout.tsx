import { Dislike } from '@components/Kit/Icons/Dislike';
import { Home } from '@components/Kit/Icons/Home';
import { Like } from '@components/Kit/Icons/Like';
import { Likes } from '@components/Kit/Icons/Likes';
import { Login } from '@components/Kit/Icons/Login';
import { Logout } from '@components/Kit/Icons/Logout';
import { Metronom } from '@components/Kit/Icons/Metronom';
import { Profile } from '@components/Kit/Icons/Profile';
import { Sequencer } from '@components/Kit/Icons/Sequencer';
import { Upload } from '@components/Kit/Icons/Upload';
import { memo } from 'react';

import styles from './IconLayout.module.scss';

export const icons = {
  home: Home,
  login: Login,
  logout: Logout,
  packs: Home,
  profile: Profile,
  upload: Upload,
  music: Home,
  likes: Likes,
  like: Dislike,
  dislike: Like,
  drop: Upload,
  sequencer: Sequencer,
  metronom: Metronom,
};

export type IconLayoutProps = {
  iconName: keyof typeof icons;
  className?: string;
  width?: string;
  height?: string;
  onClicked?: () => void;
};

const IconLayoutMemo: React.FC<IconLayoutProps> = ({ iconName, onClicked }) => {
  const Icon = icons[iconName];
  return (
    <>
      <div className={styles.iconContainer} onClick={onClicked}>
        <Icon />
      </div>
    </>
  );
};

export const IconLayout = memo(IconLayoutMemo);
