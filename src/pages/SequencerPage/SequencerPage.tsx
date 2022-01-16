import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useSequencer } from '../../hooks/useSequencer';
import { selectCurrentStep } from '../../store/selectors/samplesSelectors';

import styles from './SequencerPage.module.scss';

export const SequencerPage = () => {
	const { onPlay, onStop, initialPattern, step, sequencerState } = useSequencer();

	const [pattern, setPattern] = useState<number[][]>(initialPattern);


	function updatePattern({ x, y, value }: { x: number; y: number; value: number }) {

		const patternCopy: number[][] = [...pattern];
		patternCopy[y][x] = +!value;
	
		setPattern(patternCopy);
	}


	return (
		<div className={styles.root}>
			<button onClick={() => onPlay()}>Play</button>
			<button onClick={() => onStop()}>Stop</button>
			<div className={styles.sequencerContainer}>
				{pattern.map((row: number[], y: number) => (
					<div>
						{row.map((value: number, x: number) => (
							<button
								className={
									x === step - 1
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
