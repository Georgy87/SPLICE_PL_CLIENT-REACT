import { FC } from 'react';

import { useDropzone } from '@hooks/useDropzone';
import { ButtonLayout } from '@layouts/ButtonLayout';
import { IconLayout } from '@layouts/IconLayout';
import { getColumnColor } from '@utils/getColumnColor';

import styles from './Sequencer.module.scss';

type PropsType = {
    step: number;
    pattern: number[][];
    setIndexBox: (value: number) => void;
    setActiveModal: (value: boolean) => void;
    updatePattern: ({ x, y, value }: { x: number; y: number; value: number }) => void;
    onDropHandler: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
};

export const Sequencer: FC<PropsType> = ({
	step,
    pattern,
    setIndexBox,
    setActiveModal,
    updatePattern,
    onDropHandler,
}) => {
    const samplesBoxs: string[] = ['kick', 'snare', 'hihat', 'bass', 'smpl'];

    const { dragEnter } = useDropzone();

    const dropBoxs = () =>
        samplesBoxs.map((src: string, index: number) => (
            <div
                key={index}
                onDragOver={dragEnter}
                onDrop={(e: React.DragEvent<HTMLDivElement>) => onDropHandler(e, index)}
                onClick={() => {
                    setIndexBox(index);
                    setActiveModal(true);
                }}
            >
                <ButtonLayout typeStyle="sequencer">
                    <IconLayout iconName="drop"></IconLayout>
                </ButtonLayout>
            </div>
        ));

    const sequencerSteps = () =>
        pattern.map((row: number[], y: number) => (
            <div key={y}>
                {row.map((value: number, x: number) => (
                    <button
                        key={x}
                        className={x === step - 1 ? `${styles.sampleBox} ${styles.active}` : `${styles.sampleBox}`}
                        style={{
                            backgroundColor: getColumnColor(x),
                            background: value === 1 ? 'blue' : getColumnColor(x),
                        }}
                        onClick={() => updatePattern({ x, y, value })}
                    ></button>
                ))}
            </div>
        ));

    return (
        <div className={styles.sequencerContainer}>
            <div className={styles.dropBoxes}>{dropBoxs()}</div>
            <div className={styles.sequencerSteps}>{sequencerSteps()}</div>
        </div>
    );
};
