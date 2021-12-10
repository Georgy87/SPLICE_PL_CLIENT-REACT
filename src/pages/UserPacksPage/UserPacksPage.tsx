import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CanvasList } from '../../components/CanvasList/CanvasList';
import { UserPackItem } from '../../components/UserPackItem/UserPackItem';
import { selectUserPacks } from '../../store/selectors/packsSelectors';
import { fetchGetUserPacks } from '../../store/slices/pack/packSlice';
import { Pack } from '../../store/slices/pack/types';
import { deleteSampleFiles } from '../../store/slices/samples/samplesSlice';
import { createSamples } from '../../utils/createSamples';
import { workerInstance } from '../../utils/WebWorkerEnabler';

import styles from './UserPacksPage.module.scss';

//@ts-ignore
workerInstance.addEventListener('message', (e: any) => {
	const { imageFile, audioFile, audioCoordinates, packId } = e.data;
	if (e.data) {
		createSamples(imageFile, audioFile, audioCoordinates, packId);
	}
});

export const UserPacksPage = () => {
	const userPacks = useSelector(selectUserPacks);

	const dispatch = useDispatch();

	useEffect(() => {
		//@ts-ignore
		workerInstance.addEventListener('message', (e: any) => {
			if (e.data) {
				dispatch(deleteSampleFiles());
			}
		});
		dispatch(fetchGetUserPacks());
	}, []);


	return (
		<>
			<div className={styles.root}>
				{userPacks.map((pack: Pack, index: number) => (
					<>
						<div className={styles.packCardContainer} key={index}>
							<UserPackItem key={pack._id} pack={pack} id={pack._id} index={index} />
						</div>
					</>
				))}
				<div></div>
				<CanvasList />
			</div>
		</>
	);
};
