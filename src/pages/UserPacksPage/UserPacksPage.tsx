import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CanvasList } from '../../components/CanvasList/CanvasList';
import { UserPackItem } from '../../components/UserPackItem/UserPackItem';
import { selectUserPacks } from '../../store/selectors/packsSelectors';
import { selectSamplesFiles } from '../../store/selectors/samplesSelectors';
import { fetchGetUserPacks } from '../../store/slices/pack/packSlice';
import { Pack } from '../../store/slices/pack/types';
import { deleteSampleFiles } from '../../store/slices/samples/samplesSlice';
import { createSamples } from '../../utils/createSamples';
import { workerInstanceCreateSample } from '../../workers/WebWorkerEnabler';

import styles from './UserPacksPage.module.scss';

export const UserPacksPage = () => {
	const userPacks = useSelector(selectUserPacks);
	const sampleFiles = useSelector(selectSamplesFiles);

	const dispatch = useDispatch();

	useEffect(() => {
		async function create(e: any) {
			const { imageFile, audioFile, audioCoordinates, packId, fileId } = e.data;

			const id = await createSamples(imageFile, audioFile, audioCoordinates, packId, fileId);
			console.log(id);
			dispatch(deleteSampleFiles(id));
		}

		workerInstanceCreateSample.addEventListener('message', create);

		dispatch(fetchGetUserPacks());
		return () => {
			workerInstanceCreateSample.removeEventListener('message', create);
		}
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
