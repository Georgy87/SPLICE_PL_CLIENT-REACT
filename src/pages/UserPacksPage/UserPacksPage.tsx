import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CanvasList } from '../../components/CanvasList/CanvasList';
import { UserPackItem } from '../../components/UserPackItem/UserPackItem';
import { selectUserPacks } from '../../store/selectors/packsSelectors';
import { fetchGetUserPacks } from '../../store/slices/pack/packSlice';
import { Pack } from '../../store/slices/pack/types';
import { deleteSampleFiles } from '../../store/slices/samples/samplesSlice';
import { createSamples } from '../../utils/createSamples';
import { workerInstanceCreateSample } from '../../workers/WebWorkerEnabler';


import styles from './UserPacksPage.module.scss';

export const UserPacksPage = () => {
	const userPacks = useSelector(selectUserPacks);

	const dispatch = useDispatch();

	useEffect(() => {
		const create = async (e: any) => {
			const { imageFile, audioFile, audioCoordinates, packId } = e.data;

			await createSamples(imageFile, audioFile, audioCoordinates, packId);

			setTimeout(() => {
				// dispatch(deleteSampleFiles());
				workerInstanceCreateSample.removeEventListener('message', create);
			}, 5000);
		};

		workerInstanceCreateSample.addEventListener('message', create);

		dispatch(fetchGetUserPacks());
	}, []);

	return (
		<>
			<div className={styles.root}>
				{userPacks.map((pack: Pack, index: number) => (
					<>
						<div className={styles.packCardContainer} key={index}>
							<UserPackItem key={index} pack={pack} id={pack._id} index={index} />
						</div>
					</>
				))}
				<div></div>
				<CanvasList />
			</div>
		</>
	);
};
