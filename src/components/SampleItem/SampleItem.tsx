import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useAppDispatch } from '@store/types';
import { useSound } from '@hooks/useSound';
import { IconChangeLayout } from '@layouts/IconChangeLayout';
import { SampleSliderLayout } from '@layouts/SampleSliderLayout';
import { formatTime } from '@utils/formatTime';
import { Samples } from '@slices/samples/types';
import { IconLayout } from '@layouts/IconLayout';
import { canvasSampleService } from '@services/canvasSampleService';
import { AddSampleInfoModal } from '@components/AddSampleInfoModal';
import { fetchDeleteLike, fetchSetLike } from '@slices/samples/actions';
import { Image } from '@components/Kit/Image';

import styles from './SampleItem.module.scss';

type PropsType = {
    sample: Samples;
    idx: number;
};

export const SampleItem: React.FC<PropsType> = ({ sample, idx }) => {
    const { _id, audioCoordinates, duration, likes, canvasImage, bpm, sampleName } = sample;

    const [like, setLike] = useState<boolean>(false);
    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [canvasOffsetLeft, setCanvasOffsetLeft] = useState<number>(0);

    const activeModalMemo = useMemo(() => activeModal, [activeModal]);
    const idMemo = useMemo(() => _id, [_id]);

    const { playTrack, isPlaying, currentSampleId, currentTime, percent } = useSound();

    const dispatch = useAppDispatch();

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const canvas: HTMLCanvasElement | null = canvasRef.current;

    const audioCoordinatesParse: number[] = JSON.parse(audioCoordinates);

    useEffect(() => {
        setLike(likes.length >= 1);
    }, [likes.length]);

    useEffect(() => {
        if (currentSampleId === _id) {
            canvasSampleService.drawingSampleCanvas(canvas, audioCoordinatesParse, percent);
        }
    }, [canvas, currentTime]);

    useEffect(() => {
        if (!canvasRef.current) return;
        setCanvasOffsetLeft(canvasRef.current?.getBoundingClientRect().left);
    }, [canvas]);

    const onOpenModal = useCallback(() => {
        setActiveModal(() => false);
    }, [activeModal]);

    const renderCanvasContent = () => {
        return (
            currentSampleId === _id && (
                <canvas
                    ref={canvasRef}
                    style={{
                        width: '550px',
                        height: '35px',
                        zIndex: 50,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                />
            )
        );
    };

    const isChangeLike = () => {
        if (!like) {
            return (
                <IconLayout
                    iconName="dislike"
                    onClicked={() => {
                        dispatch(fetchSetLike({ sampleId: _id }));
                        setLike(!like);
                    }}
                />
            );
        }

        return (
            <IconLayout
                iconName="like"
                onClicked={() => {
                    dispatch(fetchDeleteLike({ sampleId: _id }));
                    setLike(!like);
                }}
            />
        );
    };

    return (
        <>
            <ul className={styles.listItem}>
                <li>
                    <Image src={`${sample.packPicture}`} alt="pack-cover" />
                    <div className={styles.iconChangeWrap}>
                        <p className={styles.sampleTime}>{formatTime(+duration)}</p>
                        <IconChangeLayout
                            onClicked={(e: Event) => {
                                e.stopPropagation();
                                playTrack(idx, 'sample');
                            }}
                            iconOneOrTwo={isPlaying}
                            currentTrackId={currentSampleId}
                            blockStyle={styles.playPauseSample}
                            trackId={_id}
                            size="65px"
                            color="#03f"
                        ></IconChangeLayout>
                    </div>
                    <SampleSliderLayout
                        canvasOffSetLeft={canvasOffsetLeft}
                        trackId={_id}
                        currentSampleId={currentSampleId}
                    >
                        {renderCanvasContent()}

                        <div
                            className={styles.backgroundWave}
                            style={{
                                backgroundImage: `url(${canvasImage})`,
                                width: '550px',
                            }}
                        />
                    </SampleSliderLayout>

                    <p className={styles.sampleName}>{sampleName}</p>

                    <div className={styles.rightWrap}>
                        <div className={styles.sampleBpm}>{bpm}</div>
                        {isChangeLike()}

                        <div className={styles.addInfo} onClick={() => setActiveModal(true)}>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                    </div>
                </li>
            </ul>
            {activeModal && <AddSampleInfoModal setActive={onOpenModal} active={activeModalMemo} sampleId={idMemo} />}
        </>
    );
};
