import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useActions } from '../../hooks/useAction';
import { Pack } from '../../store/types/packs';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { selectPacks } from '../../store/selectors/packsSelectors';
import { selectAudio } from '../../store/selectors/playerSelectors';
import { pausePack, playPack } from '../../store/slices/packSlice';
import { IconChangeLayout } from '../../layouts/IconChangeLayout/IconChangeLayout';

import styles from './PackItem.module.scss';

type PackListProps = {
	pack: Pack;
	active?: boolean;
	id: string;
};

export const PackItem: React.FC<PackListProps> = ({ pack, id }) => {
	const [packId, setPackId] = useState<string>('');

	const audio = useSelector(selectAudio);

	const { active, pause, volume } = useTypedSelector((state) => state.player);

	const dispatch = useDispatch();

	const router = useHistory();

	const {
		playTrack,
		pauseTrack,
		setActiveTrack,
		setAudioPlay,
		setAudioPause,
		setAudioSrc,
	} = useActions();

	const play = async (id: string) => {
		if (pack.pause) {
			setActiveTrack({ pack, flag: true });
			await setAudioSrc('http://localhost:5000/' + active?.audio);

			dispatch(playPack(id));
			setAudioPlay();
			playTrack();
		} else {
			dispatch(pausePack(id));
			setAudioPause();
			pauseTrack();
		}
	};

	return (
		<div className={styles.packCard}>
			<IconChangeLayout
				onClicked={() => play(pack._id)}
				blockStyle={styles.playPauseCircle}
				iconOneOrTwo={pack.pause}
				iconOne='play'
				iconTwo='pause'
				iconStyle={{
					color: '#fff',
					fontSize: '60px',
					cursor: 'pointer',
				}}
			>
			</IconChangeLayout>
			<img src={`http://localhost:5000/${pack.picture}`} />

			<div>
				<div>{pack.name}</div>
				<div style={{ fontSize: 12, color: 'gray' }}>{pack.artist}</div>
			</div>

			{/* {packId === active?._id && <div>02:42 / 03:22</div>} */}
		</div>
	);
};
