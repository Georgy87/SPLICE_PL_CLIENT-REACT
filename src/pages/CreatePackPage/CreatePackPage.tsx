import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useAppDispatch } from '@store/types';
import { StepLayout } from '@layouts/StepLayout';
import { PackInfoUpload } from '@components/PackInfoUpload';
import { FileUpload } from '@components/FileUpload';
import { IconLayout } from '@layouts/IconLayout';
import { PacksPage } from '@pages/PacksPage/PacksPage';

import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { fetchCreatePack } from '../../store/slices/pack/actions';

import styles from './CreatePackPage.module.scss';

export const CreatePackPage = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [info, setInfo] = useState<{
    genre: string;
    authorName: string;
    packInfo: string;
  } | null>(null);
  const [picture, setPicture] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const next = () => {
    if (activeStep !== 3) {
      setActiveStep((prev) => prev + 1);
    }

    if (activeStep === 2) {
      navigate('/profile/packs');
      if (info && picture && audio) {
        dispatch(fetchCreatePack({ info, picture, audio }));
      }
    }
  };

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <div className={styles.root} data-testid="create-pack-page">
      <StepLayout activeStep={activeStep}>
        {activeStep === 0 && (
          <div className={styles.stepOne}>
            <PackInfoUpload setInfo={setInfo} />
          </div>
        )}
        {activeStep === 1 && (
          <div className={styles.stepTwo}>
            <FileUpload setFile={setPicture} accept="image/*">
              <ButtonLayout typeStyle="download">
                <IconLayout iconName="upload" />
                UPLOAD IMAGE
              </ButtonLayout>
            </FileUpload>
          </div>
        )}
        {activeStep === 2 && (
          <div>
            <FileUpload setFile={setAudio} accept="audio/*">
              <ButtonLayout typeStyle="download">
                <IconLayout iconName="upload" />
                UPLOAD AUDIO
              </ButtonLayout>
            </FileUpload>
          </div>
        )}
        {activeStep === 3 && (
          <div className={styles.userPack}>
            <PacksPage pageName="user-packs" />
          </div>
        )}
      </StepLayout>
      {activeStep !== 3 && (
        <div className={styles.bottomPanel}>
          <ButtonLayout
            typeStyle={activeStep === 0 ? 'blue-disabled' : 'blue'}
            disabled={activeStep === 0}
            onClicked={back}
          >
            PREV
          </ButtonLayout>
          <ButtonLayout typeStyle="blue" onClicked={next}>
            NEXT
          </ButtonLayout>
        </div>
      )}
    </div>
  );
};
