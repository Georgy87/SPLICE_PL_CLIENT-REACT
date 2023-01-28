import { FC } from 'react';

import { icons } from '@layouts/IconLayout';
import { SidebarItem } from '@components/SidebarItem';

import styles from './SidebarList.module.scss';

type sidebarListItemsType = {
  pageName: string;
  iconName: keyof typeof icons;
};

const navbarListItems: sidebarListItemsType[] = [
  {
    pageName: 'LIKES',
    iconName: 'likes',
  },
  {
    pageName: 'PROFILE',
    iconName: 'profile',
  },
  {
    pageName: 'SEQUENCER',
    iconName: 'sequencer',
  },
];

type PropsType = {
  setSideBar: (value: boolean) => void;
};

export const SidebarList: FC<PropsType> = ({ setSideBar }) => {
  return (
    <>
      <ul className={styles.sidebarItems}>
        {navbarListItems.map(({ pageName, iconName }, i: number) => (
          <SidebarItem key={i} pageName={pageName} iconName={iconName} setSideBar={setSideBar} />
        ))}
      </ul>
    </>
  );
};
