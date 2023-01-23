import { useRef, FC, DragEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch } from '@store/types';
import { Pack } from '@store/slices/pack/types';
import { setSampleFiles } from '@slices/samples/samplesSlice';
import { useDropzone } from '@hooks/useDropzone';
import { ButtonLayout } from '@layouts/ButtonLayout';
import { IconLayout } from '@layouts/IconLayout';

import styles from './UserPackItem.module.scss';

type PackListProps = {
    pack: Pack;
    active?: boolean;
    id: string;
    index: number;
};

export const UserPackItem: FC<PackListProps> = ({ pack, index, id }) => {
    const { drag, setDrag, dragEnter, dragLeave } = useDropzone();

    const ref = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const eventData = (e as React.DragEvent).dataTransfer;
        let file = [eventData.files];
        setDrag(false);

        Object.values(file[0]).forEach((file: File) => {
            dispatch(setSampleFiles({ id: uuidv4(), file, packId: id }));
        });
    };

    const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            Object.values(e.target.files).forEach((file: File) => {
                dispatch(setSampleFiles({ id: uuidv4(), file, packId: id }));
            });
        }
    };

    return (
        <div className={`${styles.packCardWrapper} ${styles.changePage}`}>
            <div className={styles.packCard} onClick={() => navigate(`/profile-pack/${pack?._id}`)}>
                <img src={`${pack.picture}`} alt="pack-cover" />

                <div>
                    <div>{pack.genre}</div>
                    <div style={{ fontSize: 12, color: 'gray' }}>{pack.name}</div>
                </div>
            </div>

            <div className={styles.dropSamples}>
                {!drag ? (
                    <div onDragEnter={dragEnter} onDragLeave={dragLeave} onDragOver={dragEnter}>
                        DOWNLOAD SAMPLES
                    </div>
                ) : (
                    <div
                        className={styles.drop}
                        onDragEnter={dragEnter}
                        onDragLeave={dragLeave}
                        onDragOver={dragEnter}
                        onDrop={onDrop}
                    >
                        DROP FILES
                    </div>
                )}
            </div>
            <div onClick={() => ref.current?.click()} className={styles.uploadSamples}>
                <input
                    type="file"
                    accept="audio/wav"
                    style={{ display: 'none' }}
                    ref={ref}
                    multiple
                    onChange={onFileUpload}
                />
                <ButtonLayout typeStyle="download">
                    <IconLayout iconName="upload" />
                    DOWNLOAD SAMPLES
                </ButtonLayout>
            </div>
        </div>
    );
};
