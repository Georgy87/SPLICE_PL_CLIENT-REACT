import React, { useState } from 'react';

import { sequencerService } from '../../services/sequencerService';

import styles from './SequencerPage.module.scss';

export const SequencerPage = () => {
	const [pattern, setPattern] = useState(sequencerService.initialPattern);

	function updatePattern({ x, y, value }: { x: number; y: number; value: number }) {
		console.log(x, y, value);
		const patternCopy = [...pattern];
		console.log(patternCopy);
		patternCopy[y][x] = +!value;

		setPattern(patternCopy);
	}

	return (
		<div className={styles.root}>
			<button onClick={() => sequencerService.onPlay()}>Play</button>
			<button onClick={() => sequencerService.onStop()}>Stop</button>
			<div className={styles.sequencerContainer}>
				{pattern.map((row: number[], y: number) => (
					<div>
						{row.map((value: number, x: number) => (
							<button
								className={styles.sampleBox}
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
