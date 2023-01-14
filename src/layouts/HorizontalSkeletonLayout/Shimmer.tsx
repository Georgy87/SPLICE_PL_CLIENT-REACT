import styles from './HorizontalSkeletonLayout.module.scss';

export const Shimmer = () => {
    return (
      <div className={styles.shimmerWrapper}>
        <div className={styles.shimmer}></div>
      </div>
    )
  }
  
  export default Shimmer;