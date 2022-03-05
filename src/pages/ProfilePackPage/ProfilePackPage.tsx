import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';

import { SampleList } from '../../components/SampleList/SampleList';
import { defaultState } from '../../context/PlayerContextProvider/PlayerContextProvider';
import { useSound } from '../../hooks/useSound';
import { selectLoading, selectPackProfile, selectSamples, selectTag } from '../../store/selectors/packsSelectors';
import { fetchGetPack } from '../../store/slices/pack/packSlice';

import styles from './ProfilePackPage.module.scss';

export const ProfilePackPage = () => {
	const packProfile = useSelector(selectPackProfile);
	const samples = useSelector(selectSamples);
	const loading = useSelector(selectLoading);
	const tag = useSelector(selectTag);

	const dispatch = useDispatch();

	const params: { packId: string } = useParams();
	const { setPlayerState } = useSound();

	useEffect(() => {
		dispatch(fetchGetPack({ packId: params?.packId, tag: null }));
	}, []);

	useEffect(() => {
		dispatch(fetchGetPack({ packId: params?.packId, tag }));
	}, [tag]);

	useEffect(() => {
		setPlayerState({
			...defaultState,
			samples: samples,
			packs: [packProfile],
		});
	}, [packProfile]);

	return (
		<>
			{loading ? (
				<div className={styles.profilePackContainer}>
					<div className={styles.infoBackground}>
						<img src={`${packProfile?.picture}`} alt={`${packProfile?.picture}`} />
					</div>
					<div className={styles.playerInner}>
						<img src={`${packProfile?.picture}`} alt={packProfile?.picture} />

						<div className={styles.packInfo}>
							<h1>{packProfile?.name}</h1>
							<p>{packProfile?.packInfo}</p>
						</div>
					</div>
					<div className={styles.sampleList}>
						<SampleList samples={samples} />
					</div>
				</div>
			) : (
				<Loader />
			)}
		</>
	);
};
