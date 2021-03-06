import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Loader } from '../../components/Loader/Loader';
import { SampleList } from '../../components/SampleList/SampleList';
import { defaultState } from '../../context/PlayerContextProvider/PlayerContextProvider';
import { useSound } from '../../hooks/useSound';
import Modal from '../../layouts/ModalLayout/ModalLayout';
import { canvasChartService } from '../../services/canvasChartService';
import {
	selectLoading,
	selectPackProfile,
	selectSamples,
	selectTag,
	selectViewsData,
} from '../../store/selectors/packsSelectors';
import { fetchGetPack } from '../../store/slices/pack/actions';
import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { useWindowSize } from '../../hooks/useWIndowSize';

import styles from './ProfilePackPage.module.scss';

export const ProfilePackPage = () => {
	const packProfile = useSelector(selectPackProfile);
	const samples = useSelector(selectSamples);
	const loading = useSelector(selectLoading);
	const tag = useSelector(selectTag);
	const packViews = useSelector(selectViewsData);

	const [activeModal, setActiveModal] = useState<boolean>(false);
	const [year, setYear] = useState<string>(new Date().getFullYear().toString());

	const { width } = useWindowSize();

	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const dispatch = useDispatch();
	//@ts-ignore
	const params: { packId: string } = useParams();
	const { setPlayerState } = useSound();

	useEffect(() => {
		dispatch(fetchGetPack({ packId: params?.packId, tag: null }));
	}, []);

	useEffect(() => {
		if (!packViews) return;

		if (width < 900 && width > 600) {
			canvasChartService.drawingChart(canvasRef.current, packViews[year], 600, 55);
		}

		if (width > 900) {
			canvasChartService.drawingChart(canvasRef.current, packViews[year], 1000, 80);
		}

		if (width < 600) {
			canvasChartService.drawingChart(canvasRef.current, packViews[year], 350, 35);
		}
	}, [width, packProfile, year]);

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
		<div data-testid='profile-pack-page'>
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
						<div className={styles.openChart}>
							<ButtonLayout
								key={year}
								typeStyle={'auth'}
								onClicked={() => setActiveModal(true)}
							>Views</ButtonLayout>
						</div>
					</div>

					<div className={styles.sampleList}>
					
						<SampleList samples={samples} />
					</div>
				</div>
			) : (
				<Loader />
			)}
			<Modal setActive={setActiveModal} active={activeModal}>
				<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
					<div>
						<canvas ref={canvasRef} />
					</div>
					<div className={styles.changeYears}>
						{packViews &&
							Object.keys(packViews).map((year: string) => (
								<ButtonLayout
									key={year}
									typeStyle={'auth'}
									onClicked={() => setYear(year)}
								>
									{year}
								</ButtonLayout>
							))}
					</div>
				</div>
			</Modal>
		</div>
	);
};
