import Shimmer from '../../components/Shimmer/Shimmer';
import { SKELETON_ELEMENT_TYPE } from '../../constans/skeleton';
import { SkeletonElement } from './SkeletonElement';

import styles from './VerticalSkeletonLayout.module.scss';

export const VerticalSkeletonLayout = () => {
    return (
        <div className={styles.skeleton}>
            <div className={styles.skeletonWrapper} data-testid="vertical-skeleton">
                <SkeletonElement type={SKELETON_ELEMENT_TYPE.IMAGE} />
                <SkeletonElement type={SKELETON_ELEMENT_TYPE.TITLE} />
                <SkeletonElement type={SKELETON_ELEMENT_TYPE.TEXT} />
                <Shimmer />
            </div>
        </div>
    );
};
