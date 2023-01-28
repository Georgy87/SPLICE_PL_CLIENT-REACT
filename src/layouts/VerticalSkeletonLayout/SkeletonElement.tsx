import styles from './VerticalSkeletonLayout.module.scss';

type PropsType = {
  type: 'image' | 'title' | 'text' | 'time' | 'wave';
};

export const SkeletonElement: React.FC<PropsType> = ({ type }) => {
  return <div className={`${styles.skeleton} ${styles[type]}`}></div>;
};
