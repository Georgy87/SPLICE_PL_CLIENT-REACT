import React from 'react';

import { NavbarItem } from '../NavbarItem/NavbarItem';

import { navbarListItems } from './navbarListItems';

import styles from './NavbarList.module.scss';

export const NavbarList: React.FC = () => {
  return (
    <>
      <ul className={styles.navItems}>
        {navbarListItems.map(({ pageName, iconName, link }, i: number) => (
          <NavbarItem key={i} pageName={pageName} iconName={iconName} link={link} />
        ))}
      </ul>
    </>
  );
};
