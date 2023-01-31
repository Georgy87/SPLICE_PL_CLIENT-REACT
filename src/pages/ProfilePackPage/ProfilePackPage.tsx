import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Loader } from '@components/Kit/Loader';
import { SampleList } from '@components/SampleList';
import { defaultState } from '@context/PlayerContextProvider';
import { useSound } from '@hooks/useSound';
import { Modal } from '@layouts/ModalLayout';
import { canvasChartService } from '@services/canvasChartService';
import {
  selectPackLoading,
  selectPackProfile,
  selectSamples,
  selectTag,
  selectViewsData,
} from '@selectors/packsSelectors';
import { fetchGetPack } from '@slices/pack/actions';
import { ButtonLayout } from '@layouts/ButtonLayout';

import { useAppDispatch } from '@store/types';

import styles from './ProfilePackPage.module.scss';

import { useWindowSize } from '@/hooks/useWindowSize';
import { Player } from '@/components';

export const ProfilePackPage = () => {
  const packProfile = useSelector(selectPackProfile);
  const samples = useSelector(selectSamples);
  const loading = useSelector(selectPackLoading);
  const tag = useSelector(selectTag);
  const packViews = useSelector(selectViewsData);

  const [activeModal, setActiveModal] = useState<boolean>(false);

  /*	 Поправить на сервере данные по годам
        Пока моковые данные
	*/
  const [year, setYear] = useState<string>('2022');

  const { width } = useWindowSize();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const dispatch = useAppDispatch();
  //@ts-ignore
  const params: { packId: string } = useParams();
  const { setPlayerState } = useSound();

  const activeModalMemo = useMemo(() => {
    return activeModal;
  }, [activeModal]);

  const onOpenModal = useCallback(() => setActiveModal(() => false), [setActiveModal]);

  useEffect(() => {
    dispatch(fetchGetPack({ packId: params?.packId, tag: null }));
  }, [dispatch, params?.packId]);

  useEffect(() => {
    if (!packViews) return;

    if (width < 768 && width > 540) {
      canvasChartService.drawingChart(canvasRef.current, packViews[year], 600, 55);
    }

    if (width > 768) {
      canvasChartService.drawingChart(canvasRef.current, packViews[year], 1000, 80);
    }

    if (width < 540) {
      canvasChartService.drawingChart(canvasRef.current, packViews[year], 350, 35);
    }
  }, [width, packProfile, year, activeModal, packViews]);

  useEffect(() => {
    dispatch(fetchGetPack({ packId: params?.packId, tag }));
  }, [tag, params?.packId, dispatch]);

  useEffect(() => {
    setPlayerState({
      ...defaultState,
      samples: samples,
      packs: [packProfile],
    });
  }, [packProfile,  setPlayerState, samples]);

  const ModalChildren = useMemo(() => {
    return (
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div>
          <canvas ref={canvasRef} />
        </div>
        <div className={styles.changeYears}>
          {packViews
            ? Object.keys(packViews).map((year: string) => (
              <ButtonLayout key={year} typeStyle={'auth'} onClicked={() => setYear(year)}>
                {year}
              </ButtonLayout>
            ))
            : null}
        </div>
      </div>
    );
  }, [packViews]);

  const renderContent = () => {
    if (!loading) {
      return <Loader />;
    }

    return (
      <div className={styles.profilePackContainer} data-testid="profile-pack">
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
            <ButtonLayout key={year} typeStyle={'auth'} onClicked={() => setActiveModal(true)}>
              Views
            </ButtonLayout>
          </div>
        </div>

        <div className={styles.sampleList}>
          <SampleList samples={samples} />
        </div>
      </div>
    );
  };

  return (
    <div data-testid="profile-pack-page">
      {renderContent()}
      <Player />
      {activeModal && (
        <Modal setActive={onOpenModal} active={activeModalMemo}>
          {ModalChildren}
        </Modal>
      )}
    </div>
  );
};
