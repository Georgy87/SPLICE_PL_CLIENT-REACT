import React, { useState } from 'react';

import { fetchCreatePack } from '../../store/slices/packSlice';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import { StepLayout } from '../../layouts/StepLayout/StepLayout';
import { PackInfoUpload } from '../../components/PackInfoUpload/PackInfoUpload';
import { FileUpload } from '../../components/FileUpload/FileUpload';

import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';

import styles from '../../styles/pagesStyles/CreatePackPage.module.scss';
import { IconLayout } from '../../layouts/IconLayout/IconLayout';

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
						<PackInfoUpload setInfo={setInfo} />
					</div>
				)}
				{activeStep === 1 && (
					<div className={styles.stepTwo}>
						<FileUpload setFile={setPicture} accept='image/*'>
							<ButtonLayout typeStyle='download'>
								<IconLayout iconName='upload' />
										UPLOAD IMAGE
							</ButtonLayout>
						</FileUpload>
					</div>
				)}
				{activeStep === 2 && (
					<div>
						<FileUpload setFile={setAudio} accept='audio/*'>
							<button>Загрузить аудио</button>
						</FileUpload>
					</div>
				)}
				{activeStep === 3 && (
					<div className={styles.send}>
						<div
							onClick={() =>
								createTrack({ info, picture, audio })
							}
						>
							Отправить
						</div>
					</div>
				)}
			</StepLayout>
			<div className={styles.bottomPanel}>
				<ButtonLayout
					typeStyle={activeStep === 0 ? 'blue-disabled' : 'blue'}
					disabled={activeStep === 0}
					onClicked={back}
				>
					Назад
				</ButtonLayout>
				<ButtonLayout typeStyle='blue' onClicked={next}>
					Далее
				</ButtonLayout>
			</div>
		</div>
	);
};
