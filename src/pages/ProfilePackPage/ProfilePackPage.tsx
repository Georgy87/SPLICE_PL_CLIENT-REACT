import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SampleList } from '../../components/SampleList/SampleList';
import { defaultState } from '../../context/PlayerContextProvider/PlayerContextProvider';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import { useSound } from '../../hooks/useSound';
import { selectPackProfile, selectSamples } from '../../store/selectors/packsSelectors';
import { fetchGetPack } from '../../store/slices/pack/packSlice';

import styles from './ProfilePackPage.module.scss';

export const ProfilePackPage = () => {
	const packProfile = useSelector(selectPackProfile);
	const samples = useSelector(selectSamples);
	
	const params: { packId: string } = useParams();

	const { setState } = useSound();

	const getPack = useAsyncAction<any, any>(fetchGetPack);

	useEffect(() => {
		getPack(params?.packId);
	}, []);

	useEffect(() => {
		setState({
			...defaultState,
			samples: samples,
		});
	}, [samples]);

	return (
		<div className={styles.profilePackContainer}>
			<div className={styles.infoBackground}>
				<img src={`/${packProfile?.picture}`} alt={`${packProfile?.picture}`} />
			</div>
			<div className={styles.playerInner}>
				<img src={`/${packProfile?.picture}`} alt={packProfile?.picture} />

				<div className={styles.packInfo}>
					<h1>{packProfile?.name}</h1>
					<p>{packProfile?.packInfo}</p>
				</div>
			</div>
			<SampleList />
		</div>
	);
};
