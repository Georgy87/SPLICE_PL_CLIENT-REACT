import React from 'react';
import { Link } from 'react-router-dom';

import { IconLayout, icons } from '@layouts/IconLayout';

import styles from './NavbarItem.module.scss';

type NavbarItemProps = {
  pageName: string;
  iconName: keyof typeof icons;
  link: string;
};

export const NavbarItem: React.FC<NavbarItemProps> = ({ pageName, iconName, link }) => {
  return (
    <>
      <li className={styles.navItem}>
        <Link to={`/${iconName}`} data-testid={link}>
          <IconLayout iconName={iconName} />
          <span className={styles.linkName}>{pageName}</span>
        </Link>
      </li>
    </>
  );
};
