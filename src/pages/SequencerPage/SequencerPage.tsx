import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useSequencer } from '../../hooks/useSequencer';
import { getColumnColor } from '../../utils/getColumnColor';
import kick from '../../assets/drums-images/png-transparent-drums-bass-drum-snare-drum-snare-snare-product-drum.png';
import snare from '../../assets/drums-images/png-transparent-snare-drums-musical-instruments-drum-stick-metal-drum-bass-drum.png';
import hihat from '../../assets/drums-images/png-transparent-hi-hats-avedis-zildjian-company-cymbal-drums-musical-instruments-drums-hat-drum-cymbal.png';
import bass from '../../assets/drums-images/bass-guitar-electric-guitar-rickenbacker-4003-bass-guitar-png-clip-art.png';
import smpl from '../../assets/drums-images/png-transparent-digital-audio-wav-audio-file-format-audio-interchange-file-format-mp4-icon-text-trademark-logo.png';

import styles from './SequencerPage.module.scss';
import { IconLayout } from '../../layouts/IconLayout/IconLayout';

export const SequencerPage = () => {
	const { onPlay, onStop, initialPattern, step } = useSequencer();

	const [pattern, setPattern] = useState<number[][]>(initialPattern);

	function updatePattern({ x, y, value }: { x: number; y: number; value: number }) {
		const patternCopy: number[][] = [...pattern];
		patternCopy[y][x] = +!value;

		setPattern(patternCopy);
	}

	const samplesBoxs = [kick, snare, hihat, bass, smpl];

	return (
		<div className={styles.root}>
			<button onClick={() => onPlay()}>Play</button>
			<button onClick={() => onStop()}>Stop</button>
			<div className={styles.sequencerContainer}>
				<div className={styles.dropBoxes}>
					{samplesBoxs.map((src: string) => {
						return <button ><IconLayout iconName='drop'>

						</IconLayout></button>;
					})}
				</div>
				<div className={styles.sequencerSteps}>
					{pattern.map((row: number[], y: number) => (
						<div>
							{row.map((value: number, x: number) => (
								<button
									className={x === step - 1 ? `${styles.sampleBox} ${styles.active}` : `${styles.sampleBox}`}
									style={{ backgroundColor: getColumnColor(x), background: value === 1 ? 'blue' : getColumnColor(x) }}
									onClick={() => updatePattern({ x, y, value })}
								></button>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
