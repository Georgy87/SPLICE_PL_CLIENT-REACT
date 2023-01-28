import React from 'react';

import styles from './MainLayout.module.scss';

export const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <div className={styles.PagesWrapper}>{children}</div>
    </>
  );
};
