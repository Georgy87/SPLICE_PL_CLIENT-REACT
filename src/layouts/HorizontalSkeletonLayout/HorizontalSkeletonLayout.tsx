import Shimmer from './Shimmer';
import { SkeletonElement } from './SkeletonElement';
import { SKELETON_ELEMENT_TYPE } from '../../constans/skeleton';

import styles from './HorizontalSkeletonLayout.module.scss';

export const HorizontalSkeletonLayout: React.FC = () => {
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
