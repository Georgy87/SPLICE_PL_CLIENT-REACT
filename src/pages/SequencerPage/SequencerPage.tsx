import React, { useEffect, useState } from 'react';

import { sequencerService } from '../../services/sequencerService';

import styles from './SequencerPage.module.scss';

export const SequencerPage = () => {
	const [pattern, setPattern] = useState<number[][]>(sequencerService.initialPattern);
	const [sequencerStep, setSequencerStep] = useState<number>(sequencerService.currentStep);

	function updatePattern({ x, y, value }: { x: number; y: number; value: number }) {
		const patternCopy: number[][] = [...pattern];
		patternCopy[y][x] = +!value;

		setPattern(patternCopy);
	}

	useEffect(() => {
		setSequencerStep(sequencerService.currentStep);
		
	}, []);
	console.log(sequencerService.currentStep);
	return (
		<div className={styles.root}>
			<button onClick={() => sequencerService.onPlay()}>Play</button>
			<button onClick={() => sequencerService.onStop()}>Stop</button>
			<div className={styles.sequencerContainer}>
				{pattern.map((row: number[], y: number) => (
					<div>
						{row.map((value: number, x: number) => (
							<button
								className={
									x === sequencerService.currentStep
										? `${styles.sampleBox} ${styles.active}`
										: `${styles.sampleBox}`
								}
								onClick={() => updatePattern({ x, y, value })}
							>
								{value}
							</button>
						))}
					</div>
				))}
			</div>
		</div>
	);
};
