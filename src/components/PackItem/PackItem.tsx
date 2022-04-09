import React from 'react';
import { useSelector } from 'react-redux';

import { IconChangeLayout } from '../../layouts/IconChangeLayout/IconChangeLayout';
import { useSound } from '../../hooks/useSound';
import { Pack } from '../../store/slices/pack/types';
import { Loader } from '../Loader/Loader';
import { selectAuth } from '../../store/selectors/userSelectors';
import { Link } from 'react-router-dom';

import styles from './PackItem.module.scss';

type PackListProps = {
	pack: Pack;
	active?: boolean;
	id: string;
	index: number;
};

export const PackItem: React.FC<PackListProps> = ({ pack, index, id }) => {
	const auth = useSelector(selectAuth);

	const { playTrack, isPlaying, currentPackId } = useSound();

	return (
		<div className={styles.packCardWrapper}>
			<Link
				className={styles.packCard}
				to={`/profile-pack/${pack?._id}`}
				data-testid='profile-pack-link'
				onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
					e.stopPropagation();
				}}
			>
				{pack ? (
					<IconChangeLayout
						onClicked={(e: Event) => {
							e.stopPropagation();
							e.preventDefault();
							playTrack(index, 'packs');
						}}
						blockStyle={styles.playPauseCircle}
						iconOneOrTwo={isPlaying}
						trackId={id}
						currentTrackId={currentPackId}
						iconOne='play'
						iconTwo='pause'
						iconStyle={{
							color: '#fff',
							fontSize: '60px',
							cursor: 'pointer',
						}}
						typeBtn='pack'
					></IconChangeLayout>
				) : (
					<Loader />
				)}

				<img src={`${pack.picture}`} alt='pack-cover' />

				<div>
					<div>{pack.genre}</div>
					<div style={{ fontSize: 12, color: 'gray' }}>{pack.name}</div>
				</div>
			</Link>
		</div>
	);
};
