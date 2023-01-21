import { MutableRefObject, FC } from 'react';
import { Pack } from '@store/slices/pack/types';
import { PackItem } from '@components/PackItem';
import { VerticalSkeletonLayout } from '@layouts/VerticalSkeletonLayout';
import { PACKS_SKELETON_ITEMS } from '@/constans/skeleton';

import styles from './PacksPage.module.scss';

type PropsType = {
    pageEnd: MutableRefObject<HTMLInputElement>;
    packs: Pack[];
};

export const PackListItem: FC<PropsType> = ({ pageEnd, packs }) => {
    return (
        <div className={styles.root}>
            {packs?.length ? (
                packs.map((pack: Pack, index: number) => (
                    <div className={styles.packCardContainer} key={pack._id}>
                        <PackItem pack={pack} id={pack._id} index={index} />
                    </div>
                ))
            ) : (
                <>
                    {PACKS_SKELETON_ITEMS.map((_, index) => (
                        <div className={styles.packCardContainer} key={index}>
                            <VerticalSkeletonLayout />
                        </div>
                    ))}
                </>
            )}
            <div className={styles.loaderPagination} ref={pageEnd}>
                {''}
            </div>
        </div>
    );
};
