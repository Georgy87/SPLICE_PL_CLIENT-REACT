import styles from './HorizontalSkeletonLayout.module.scss';

type PropsType = {
    type: string;
};

export const SkeletonElement: React.FC<PropsType> = ({ type }) => {
    return <div className={`${styles.skeleton} ${styles[type]}`}></div>;
};
