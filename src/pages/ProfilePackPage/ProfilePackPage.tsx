import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SampleList } from '../../components/SampleList/SampleList';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import { selectPackProfile } from '../../store/selectors/packsSelectors';
import { fetchGetPack } from '../../store/slices/pack/packSlice';

import styles from '../../styles/pagesStyles/ProfilePackPage.module.scss';

export const ProfilePackPage = () => {
	const params: { packId: string } = useParams();
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
			<div
				className={styles.playerInner}
				style={{
					backgroundImage: `url(http://localhost:5000/${packProfile?.picture})`,
				}}
			>
				<img
					src={`http://localhost:5000/${packProfile?.picture}`}
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
