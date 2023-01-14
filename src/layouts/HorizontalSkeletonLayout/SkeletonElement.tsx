import React from 'react';

import styles from './HorizontalSkeletonLayout.module.scss';

type PropsType = {
    type: 'image' | 'title' | 'text' | 'time' | 'wave';
};

export const SkeletonElement: React.FC<PropsType> = ({ type }) => {
    return <div className={`${styles.skeleton} ${styles[type]}`}></div>;
};
