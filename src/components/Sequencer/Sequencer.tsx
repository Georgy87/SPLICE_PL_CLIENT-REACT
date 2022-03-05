import React from 'react';

import { useDropzone } from '../../hooks/useDropzone';
import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { IconLayout } from '../../layouts/IconLayout/IconLayout';
import { getColumnColor } from '../../utils/getColumnColor';

import styles from './Sequencer.module.scss';

type PropsType = {
	step: number;
	pattern: number[][];
    setIndexBox: (value: number) => void;
    setActiveModal: (value: boolean) => void;
	updatePattern: ({ x, y, value }: { x: number; y: number; value: number }) => void;
	onDropHandler: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
}

export const Sequencer: React.FC<PropsType> = ({ setIndexBox, setActiveModal, step, pattern, updatePattern, onDropHandler }) => {
	const samplesBoxs: string[] = ['kick', 'snare', 'hihat', 'bass', 'smpl', 'voc', 'pad', 'arp', 'string'];
	
	const { dragEnter } = useDropzone();

	return (
		<div className={styles.sequencerContainer}>
			<div className={styles.dropBoxes}>
				{samplesBoxs.map((src: string, index: number) => {
					return (
						<div
							key={index}
							onDragOver={dragEnter}
							onDrop={(e: React.DragEvent<HTMLDivElement>) => onDropHandler(e, index)}
							onClick={() => {
								setIndexBox(index);
								setActiveModal(true);
							}}
						>
							<ButtonLayout typeStyle='sequencer'>
								<IconLayout iconName='drop'></IconLayout>
							</ButtonLayout>
						</div>
					);
				})}
			</div>
			<div className={styles.sequencerSteps}>
				{pattern.map((row: number[], y: number) => (
					<div key={y}>
						{row.map((value: number, x: number) => (
							<button
								key={x}
								className={x === step - 1 ? `${styles.sampleBox} ${styles.active}` : `${styles.sampleBox}`}
								style={{ backgroundColor: getColumnColor(x), background: value === 1 ? 'blue' : getColumnColor(x) }}
								onClick={() => updatePattern({ x, y, value })}
							></button>
						))}
					</div>
				))}
			</div>
		</div>
	);
};
