import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SampleList } from '../../components/SampleList/SampleList';
import {
	SamplePlayer,
	waveSurfer,
} from '../../components/SamplePlayer/SamplePlayer';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import { useSampleSound } from '../../hooks/useSampleSound';
import { selectPackProfile } from '../../store/selectors/packsSelectors';
import { fetchGetPack } from '../../store/slices/pack/packSlice';

import styles from '../../styles/pagesStyles/ProfilePackPage.module.scss';
import { Canvas } from '../../components/Canvas/Canvas';

export const ProfilePackPage = () => {
	const params: { packId: string } = useParams();
	const packProfile = useSelector(selectPackProfile);

	const { active, samples } = useSampleSound();

	const getPack = useAsyncAction<any, any>(fetchGetPack);

	useEffect(() => {
		getPack(params?.packId);
		// waveSurfer?.load(' ');
		waveSurfer?.cancelAjax();
		waveSurfer?.toggleMute();
	}, []);

	const backImage = active
		? ''
		: `url(http://localhost:5000/${packProfile?.picture})`;

	return (
		<div className={styles.profilePackContainer}>
			<div
				className={styles.playerInner}
				style={{
					backgroundImage: backImage,
				}}
			>
				<img
					src={`http://localhost:5000/${packProfile?.picture}`}
					alt={packProfile?.picture}
				/>

				{active && samples ? (
					<div className={styles.samplePlayer}>
						<SamplePlayer />
					</div>
				) : (
					<div className={styles.packInfo}>
						<h1>{packProfile?.authorName}</h1>
						<p>{packProfile?.packInfo}</p>
					</div>
				)}
			</div>
			<SampleList />
			<Canvas />
		</div>
	);
};
