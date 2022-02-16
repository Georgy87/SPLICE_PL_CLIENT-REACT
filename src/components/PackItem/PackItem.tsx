import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { IconChangeLayout } from '../../layouts/IconChangeLayout/IconChangeLayout';
import { useSound } from '../../hooks/useSound';
import { Pack } from '../../store/slices/pack/types';

import styles from './PackItem.module.scss';

type PackListProps = {
	pack: Pack;
	active?: boolean;
	id: string;
	index: number;
};

export const PackItem: React.FC<PackListProps> = ({ pack, index, id }) => {
	const { playTrack, isPlaying, currentPackId } = useSound();
	const history = useHistory();
	
	return (
		<div className={styles.packCardWrapper}>
			<div
				className={styles.packCard}
				onClick={() => history.push(`/profile-pack/${pack?._id}`)}
			>
				<IconChangeLayout
					onClicked={(e: Event) => {
						e.stopPropagation();
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

				<img src={`${pack.picture}`} />

				<div>
					<div>{pack.genre}</div>
					<div style={{ fontSize: 12, color: 'gray' }}>{pack.name}</div>
				</div>
			</div>
		</div>
	);
};
