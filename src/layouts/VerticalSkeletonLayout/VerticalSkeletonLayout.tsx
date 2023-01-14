import { SKELETON_ELEMENT_TYPE } from '../../constans/skeleton';
import Shimmer from './Shimmer';
import { SkeletonElement } from './SkeletonElement';

import styles from './VerticalSkeletonLayout.module.scss';

export const VerticalSkeletonLayout: React.FC = () => {
    return (
        <div className={styles.skeleton}>
            <div className={styles.skeletonWrapper}>
                <SkeletonElement type={SKELETON_ELEMENT_TYPE.IMAGE} />
                <SkeletonElement type={SKELETON_ELEMENT_TYPE.TITLE} />
                <SkeletonElement type={SKELETON_ELEMENT_TYPE.TEXT} />
                <Shimmer />
            </div>
        </div>
    );
};
