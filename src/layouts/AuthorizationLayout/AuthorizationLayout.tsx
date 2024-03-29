import React from 'react';

import styles from './AuthorizationLayout.module.scss';

type PropsType = {
  children?: React.ReactNode;
};

export const AuthorizationLayout: React.FC<PropsType> = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.bgAuthImage}></div>
      {children}
    </div>
  );
};
