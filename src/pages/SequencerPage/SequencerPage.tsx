import { useEffect, useState, DragEvent, ChangeEvent, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useSequencer } from '@hooks/useSequencer';
import { IconLayout } from '@layouts/IconLayout';
import { ButtonLayout } from '@layouts/ButtonLayout';
import { selectLikedSamples } from '@selectors/userSelectors';
import { useDropzone } from '@hooks/useDropzone';
import { IconChangeLayout } from '@layouts/IconChangeLayout';
import { Modal } from '@layouts/ModalLayout';
import { Sequencer } from '@components/Sequencer';
import { fetchGetLikedSamples } from '@slices/user/actions';
import { SequencerSampleList } from '@components/SequencerSampleList';
import Kick from '@assets/samplesSequenser/Kick.wav';
import Clap from '@assets/samplesSequenser/Clap.wav';
import Hat from '@assets/samplesSequenser/Hat.wav';
import Open_Hat from '@assets/samplesSequenser/Open-Hat.wav';
import { useAppDispatch } from '@store/types';

import styles from './SequencerPage.module.scss';

export const SequencerPage = () => {
    const likedSamples = useSelector(selectLikedSamples);

    const dispatch = useAppDispatch();

    const { initialPattern, step, requestId, loadSamples, setTempo, onPlay, onStop } = useSequencer();

    const { dragStart } = useDropzone();

    const [pattern, setPattern] = useState<number[][]>(initialPattern);

    const [newSampleSrc, setNewSampleSrc] = useState<string>('');
    const [sampleList, setSampleList] = useState<string[]>([Kick, Clap, Hat, Open_Hat]);

    const [valueBpm, setValueBpm] = useState<number>(120);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);
    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [indexBox, setIndexBox] = useState<number>(0);

    const onOpenModal = useCallback(() => setActiveModal(() => false), [activeModal]);

    const activeModalMemo = useMemo(() => {
        return activeModal;
    }, [activeModal]);

    function updatePattern({ x, y, value }: { x: number; y: number; value: number }) {
        const patternCopy: number[][] = [...pattern];
        patternCopy[y][x] = +!value;
        setPattern(patternCopy);
    }

    useEffect(() => {
        dispatch(fetchGetLikedSamples());
        window.cancelAnimationFrame(requestId);
    }, []);

    useEffect(() => {
        loadSamples(sampleList);
    }, [sampleList]);

    const onDropHandler = (e: DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();

        let sampleListCopy = [...sampleList];
        sampleListCopy[index] = newSampleSrc;
        setSampleList(sampleListCopy);
    };

    const setSampleHandler = (src: string) => {
        let sampleListCopy = [...sampleList];
        sampleListCopy[indexBox] = src;
        setSampleList(sampleListCopy);
    };

    const onChangeBpm = (e: ChangeEvent<HTMLInputElement>) => {
        setValueBpm(+e.target.value);
    };

    const { size, color } = useMemo(() => {
        return {
            size: '70px',
            color: '#000000',
        };
    }, []);

    const isPlayMemo = useMemo(() => {
        if (isPlaying) {
            onStop();
        }
        return isPlaying;
    }, [isPlaying]);

    const onChangeIconLayout = useCallback(
        (e: Event) => {
            e.stopPropagation();
            setTempo(valueBpm);
            setIsPlaying(!isPlaying);
            if (isPlaying === true) {
                onPlay(sampleList);
            } else {
                onStop();
            }
        },
        [isPlaying]
    );

    const ModalChildren = useMemo(() => {
        return (
            <div className={styles.mobileModalWrapper}>
                <SequencerSampleList onClicked={setSampleHandler} />
            </div>
        );
    }, [likedSamples, indexBox]);

    const setTempoBpm = useCallback(() => {
        onStop();
        setTempo(valueBpm);
        onPlay(sampleList);
        if (isPlaying === true) {
            onStop();
            setTempo(valueBpm);
        }
    }, [valueBpm, isPlaying, sampleList, onStop]);

    return (
        <div className={styles.root} data-testid="sequencer-page">
            <div className={styles.sequencerControls}>
                <IconChangeLayout onClicked={onChangeIconLayout} iconOneOrTwo={!isPlayMemo} size={size} color={color} />
                <div className={styles.bpmControls}>
                    <IconLayout iconName="metronom" />
                      <input
                        type="text"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeBpm(e)}
                        defaultValue={valueBpm}
                    />
                    <ButtonLayout typeStyle={"update-bpm"} onClicked={setTempoBpm}>
                        bpm
                    </ButtonLayout>
                </div>
            </div>

            <Sequencer
                step={step}
                pattern={pattern}
                setIndexBox={setIndexBox}
                setActiveModal={setActiveModal}
                updatePattern={updatePattern}
                onDropHandler={onDropHandler}
            />

            <Modal setActive={onOpenModal} active={activeModalMemo}>
                {ModalChildren}
            </Modal>
        </div>
    );
};
