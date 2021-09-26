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
	let col;

	return (
		<div className={styles.stepContainer}>
			<div className={styles.stepNames}>
				{steps.map((step, i) => {
					if (activeStep === i) {
						col = 'red';
					} else {
						col = 'black';
					}

					return (
						<div key={i}>
							<Steps step={step} color={col} />
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
