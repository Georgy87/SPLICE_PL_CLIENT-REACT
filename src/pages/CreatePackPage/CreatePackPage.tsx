import React, { useState } from 'react';

// import { StepWrapper } from '../../components/StepWrapper/StepWrapper';
// import FileUpload from '../../components/FileUpload/FileUpload';
// import { TrackInfoUpload } from '../../components/TrackInfoUpload/TrackInfoUpload';
import { fetchCreatePack } from '../../store/slices/packSlice';
import { useAsyncAction } from '../../hooks/useAsyncAction';

import styles from '../../layouts/StepLayout/StepLayout.module.scss';

import { StepLayout } from '../../layouts/StepLayout/StepLayout';

export const CreatePackPage = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [info, setInfo] = useState({});
	const [picture, setPicture] = useState(null);
	const [audio, setAudio] = useState(null);

	const createTrack = useAsyncAction<any, any>(fetchCreatePack);

	const next = () => {
		if (activeStep != 3) {
			setActiveStep((prev) => prev + 1);
		}

		if (activeStep === 2) {
			console.log(picture, audio);
		}
	};

	const back = () => {
		setActiveStep((prev) => prev - 1);
	};

	return (
		<div>
			<StepLayout activeStep={activeStep}>
				{activeStep === 0 && (
					<div className={styles.stepOne}>
						{/* <TrackInfoUpload setInfo={setInfo} /> */}
					</div>
				)}
				{activeStep === 1 && (
					<div>
						{/* <FileUpload setFile={setPicture} accept='image/*'>
							<button>Загрузить изображение</button>
						</FileUpload> */}
					</div>
				)}
				{activeStep === 2 && (
					<div>
						{/* <FileUpload setFile={setAudio} accept='audio/*'>
							<button>Загрузить аудио</button>
						</FileUpload> */}
					</div>
				)}
				{activeStep === 3 && (
					<div className={styles.send}>
						<button onClick={() => createTrack({ info, picture, audio })}>
							Отправить
						</button>
					</div>
				)}
			</StepLayout>
			<div className={styles.bottomPanel}>
				<button disabled={activeStep === 0} onClick={back}>
					Назад
				</button>
				<button onClick={next}>Далее</button>
			</div>
		</div>
	);
};
