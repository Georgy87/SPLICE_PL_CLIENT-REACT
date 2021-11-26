import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SampleList } from '../../components/SampleList/SampleList';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import { selectPackProfile } from '../../store/selectors/packsSelectors';
import { fetchGetPack } from '../../store/slices/pack/packSlice';

import styles from './ProfilePackPage.module.scss';

export const ProfilePackPage = () => {
	const params: { packId: string } = useParams();
	const refAttr = useRef<HTMLDivElement>(null);
	const packProfile = useSelector(selectPackProfile);

	const getPack = useAsyncAction<any, any>(fetchGetPack);

	useEffect(() => {
		getPack(params?.packId);
	}, []);

	// const backImage = active
	// 	? ''
	// 	: `url(http://localhost:5000/${packProfile?.picture})`;

	return (
		<div className={styles.profilePackContainer}>
			<div className={styles.infoBackground}>
				<img
					src={`/${packProfile?.picture}`}
					alt={`${packProfile?.picture}`}
				/>
			</div>
			<div className={styles.playerInner}>
				<img
					src={`/${packProfile?.picture}`}
					alt={packProfile?.picture}
				/>

				<div className={styles.packInfo}>
					<h1>{packProfile?.authorName}</h1>
					<p>{packProfile?.packInfo}</p>
				</div>
			</div>
			<SampleList />
		</div>
	);
};
