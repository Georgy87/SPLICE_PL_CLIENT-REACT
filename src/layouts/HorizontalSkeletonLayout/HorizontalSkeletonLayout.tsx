import Shimmer from '@components/Shimmer/Shimmer';

import { SkeletonElement } from './SkeletonElement';

import styles from './HorizontalSkeletonLayout.module.scss';

import { SKELETON_ELEMENT_TYPE } from '@/constans/skeleton';

export const HorizontalSkeletonLayout = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonWrapper}>
        <SkeletonElement type={SKELETON_ELEMENT_TYPE.IMAGE} />
        <SkeletonElement type={SKELETON_ELEMENT_TYPE.TIME} />
        <SkeletonElement type={SKELETON_ELEMENT_TYPE.WAVE} />
        <SkeletonElement type={SKELETON_ELEMENT_TYPE.TITLE} />
        <SkeletonElement type={SKELETON_ELEMENT_TYPE.TEXT} />
        <Shimmer />
      </div>
    </div>
  );
};
