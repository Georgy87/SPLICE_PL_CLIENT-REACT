import React from 'react';

import { Steps } from '../../components/Steps/Steps';

import styles from './StepLayout.module.scss';

interface StepWrapperProps {
	activeStep: number;
}

const steps = [
	'Информация о пакете',
	'Загрузите обложку для пакета',
	'Загрузка сэмплов для пакета',
	'Результат',
];

export const StepLayout: React.FC<StepWrapperProps> = ({
	activeStep,
	children,
}) => {
	let typeStyle;

	return (
		<div className={styles.stepContainer}>
			<div className={styles.stepNames}>
				{steps.map((step, i) => {
					if (activeStep === i) {
						typeStyle = 'step-red';
					} else {
						typeStyle = 'step-blue';
					}

					return (
						<div key={i} className={styles.step}>
							<Steps step={step} typeStyle={typeStyle} />
						</div>
					);
				})}
			</div>
			<div className={styles.stepUploadInfo}>
				<div>{children}</div>
			</div>
		</div>
	);
};
