import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { IconChangeLayout } from '@layouts/IconChangeLayout/IconChangeLayout';
import { useSound } from '@hooks/useSound';
import { Pack } from '@slices/pack/types';
import { selectAuth } from '@selectors/userSelectors';
import { QUERY_PARAM } from 'constans/routing';
import { Image } from '@components/Kit/Image';

import styles from './PackItem.module.scss';

type PackListProps = {
  pack: Pack;
  active?: boolean;
  id: string;
  index: number;
};

export const PackItem: React.FC<PackListProps> = ({ pack, index, id }) => {
  const { playTrack, isPlaying, currentPackId } = useSound();
  const auth = useSelector(selectAuth);
  return (
    <div className={styles.packCardWrapper}>
      <Link
        className={styles.packCard}
        to={auth ? `/profile-pack/${pack?._id}` : QUERY_PARAM.LOGIN}
        data-testid="profile-pack-link"
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          e.stopPropagation();
        }}
      >
        <IconChangeLayout
          onClicked={(e: Event) => {
            e.stopPropagation();
            e.preventDefault();
            playTrack(index, 'packs');
          }}
          blockStyle={styles.playPauseCircle}
          iconOneOrTwo={isPlaying}
          trackId={id}
          size="100px"
          color="#fff"
          currentTrackId={currentPackId}
        />

        <Image src={pack.picture} alt={'pack-cover'} />
        <div>
          <div>{pack.genre}</div>
          <div style={{ fontSize: 12, color: 'gray' }}>{pack.name}</div>
        </div>
      </Link>
    </div>
  );
};
