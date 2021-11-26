import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { fetchCreatePack, fetchGetUserPacks } from '../../store/slices/pack/packSlice';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import { StepLayout } from '../../layouts/StepLayout/StepLayout';
import { PackInfoUpload } from '../../components/PackInfoUpload/PackInfoUpload';
import { FileUpload } from '../../components/FileUpload/FileUpload';
import { IconLayout } from '../../layouts/IconLayout/IconLayout';
import { PacksPage } from '../PacksPage/PacksPage';
import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';

import styles from './CreatePackPage.module.scss';

export const CreatePackPage = () => {
	const history = useHistory();

	const [activeStep, setActiveStep] = useState<number>(0);
	const [info, setInfo] = useState<{
		trackName: string;
		authorName: string;
		packInfo: string;
	} | {}>({});

	const [picture, setPicture] = useState<File | null>(null);
	const [audio, setAudio] = useState<File | null>(null);

	const createTrack = useAsyncAction<any, any>(fetchCreatePack);

	const next = () => {
		if (activeStep != 3) {
			setActiveStep((prev) => prev + 1);
		}

		if (activeStep === 2) {
			history.push('/profile/packs');
			createTrack({ info, picture, audio });
		}
	};

	const back = () => {
		setActiveStep((prev) => prev - 1);
	};

	return (
		<div className={styles.root}>
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
							<ButtonLayout typeStyle='download'>
								<IconLayout iconName='upload' />
								UPLOAD AUDIO
							</ButtonLayout>
						</FileUpload>
					</div>
				)}
				{activeStep === 3 && (
					<div className={styles.userPack}>
						<PacksPage pageName='user-packs' />
					</div>
				)}
			</StepLayout>
			{activeStep != 3 && (
				<div className={styles.bottomPanel}>
					<ButtonLayout
						typeStyle={activeStep === 0 ? 'blue-disabled' : 'blue'}
						disabled={activeStep === 0}
						onClicked={back}
					>
						PREV
					</ButtonLayout>
					<ButtonLayout typeStyle='blue' onClicked={next}>
						NEXT
					</ButtonLayout>
				</div>
			)}
		</div>
	);
};
