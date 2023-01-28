import { MutableRefObject, FC } from 'react';
import { useSelector } from 'react-redux';

import { Pack } from '@store/slices/pack/types';
import { PackItem } from '@components/PackItem';
import { VerticalSkeletonLayout } from '@layouts/VerticalSkeletonLayout';

import { selectPackLoading } from '@store/selectors/packsSelectors';

import styles from './PacksPage.module.scss';

import { PACKS_SKELETON_ITEMS } from '@/constans/skeleton';

type PropsType = {
  pageEnd: MutableRefObject<HTMLInputElement>;
  packs: Pack[];
};

export const PackListItem: FC<PropsType> = ({ pageEnd, packs }) => {
  const loading = useSelector(selectPackLoading);

  const renderContent = () => {
    if (loading) {
      return PACKS_SKELETON_ITEMS.map((_, index) => (
        <div className={styles.packCardContainer} key={index}>
          <VerticalSkeletonLayout />
        </div>
      ));
    }

    return packs.map((pack: Pack, index: number) => (
      <div className={styles.packCardContainer} key={pack._id}>
        <PackItem pack={pack} id={pack._id} index={index} />
      </div>
    ));
  };

  return (
    <div className={styles.root}>
      {renderContent()}
      <div className={styles.loaderPagination} ref={pageEnd}>
        {''}
      </div>
    </div>
  );
};
