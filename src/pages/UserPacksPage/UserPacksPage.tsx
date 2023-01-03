import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CanvasList } from '../../components/CanvasList/CanvasList';
import { UserPackItem } from '../../components/UserPackItem/UserPackItem';
import { selectUserPacks } from '../../store/selectors/packsSelectors';
import { selectFiles } from '../../store/selectors/samplesSelectors';

import { Pack } from '../../store/slices/pack/types';
import { deleteSampleFiles } from '../../store/slices/samples/samplesSlice';
import { createSamples } from '../../utils/createSamples';
import { workerInstanceCreateSample } from '../../workers/WebWorkerEnabler';
import { Loader } from '../../components/Loader/Loader';
import Modal from '../../layouts/ModalLayout/ModalLayout';
import { fetchGetUserPacks } from '../../store/slices/pack/actions';
import { useAppDispatch } from '../../store/types';

import styles from './UserPacksPage.module.scss';

export const UserPacksPage = () => {
	const userPacks = useSelector(selectUserPacks);
	const files = useSelector(selectFiles);

	const [activeModal, setActiveModal] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (files?.length) {
			setActiveModal(true);
		} else {
			setActiveModal(false);
		}
	}, [files]);

	useEffect(() => {
		async function create(e: any) {
			const { imageFile, audioFile, audioCoordinates, packId, fileId, duration } = e.data;

			const id = await createSamples({ imageFile, audioFile, audioCoordinates, packId, fileId, duration });

			dispatch(deleteSampleFiles(id));
		}

		workerInstanceCreateSample.addEventListener('message', create);

		dispatch(fetchGetUserPacks());

		return () => {
			workerInstanceCreateSample.removeEventListener('message', create);
		};
	}, []);

	return (
		<div data-testid='user-packs-page'>
			<div className={styles.root}>
				<Modal setActive={setActiveModal} active={activeModal}>
					<Loader customColor='secondary' />
				</Modal>

				{userPacks.map((pack: Pack, index: number) => (
					<div className={styles.packCardContainer} key={pack._id}>
						<UserPackItem pack={pack} id={pack._id} index={index} />
					</div>
				))}

				<div></div>
				<CanvasList />
			</div>
		</div>
	);
};
