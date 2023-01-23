import { useCallback, useEffect, useRef, useState, DragEvent } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import { useSelector } from 'react-redux';

import { selectUserLoading } from '@selectors/userSelectors';
import { useAppDispatch } from '@store/types';
import { useDropzone } from '@hooks/useDropzone';
import { ButtonLayout } from '@layouts/ButtonLayout';
import { IconLayout } from '@layouts/IconLayout';
import { canvasAvatarService } from '@services/canvasAvatarService';
import { fileService } from '@services/fileService';
import { fetchUpdateAvatar } from '@slices/user/actions';
import { Loader } from '@components/Kit/Loader';

import './UserProfilePhoto.css';

export const AvatarEditorPage = () => {
    const loading = useSelector(selectUserLoading);
    const imgRef = useRef<HTMLImageElement | HTMLCanvasElement | null>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();

    const [avatarState, setAvatarState] = useState<{
        imgSrc: string;
        imgSrcExt: string;
    }>({
        imgSrc: '',
        imgSrcExt: '',
    });

    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        width: 30,
        height: 0,
        aspect: 1 / 1,
        x: 0,
        y: 0,
    });
    const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
    const [avatar, setAvatar] = useState<File | null>(null);

    const { dragEnter, dragLeave } = useDropzone();

    const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const eventData = (e as DragEvent).dataTransfer;
        const files = [eventData.files];

        fileService.fileUpload({ files, setAvatarState, onDrop: true });
    };

    const onLoad = useCallback((img: HTMLImageElement) => {
        imgRef.current = img;
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef) {
            return;
        }

        const image: any = imgRef.current;

        if (!image) return;

        const canvas = previewCanvasRef.current;
        const crop: Crop = completedCrop;
        const canvasResult = canvasAvatarService.drawingAvatar(image, canvas, crop);

        canvasResult?.toBlob(function (blob: Blob | null) {
            if (!blob) return;
            setAvatar(new File([blob], blob?.type.split('/')[1], { type: blob.type }));
        });
    }, [completedCrop]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();

        fileService.fileUpload({ files: e.target.files, setAvatarState, onDrop: false });
    };

    const onUploadAvatar = () => {
        dispatch(fetchUpdateAvatar(avatar));
    };

    const imageCropBox = () => {
        return (
            <>
                <ReactCrop
                    src={avatarState.imgSrc}
                    crop={crop}
                    onImageLoaded={onLoad}
                    onChange={(c: Crop) => setCrop(c)}
                    onComplete={(c: Crop) => setCompletedCrop(c)}
                />
                <div className="preview-avatar">
                    <p>Preview Avatar</p>
                    <canvas
                        ref={previewCanvasRef}
                        style={{
                            width: '200px',
                            height: '200px',
                            display: 'block',
                            margin: '0 auto',
                            borderRadius: '100%',
                            marginBottom: '30px',
                        }}
                    ></canvas>
                    <ButtonLayout onClicked={onUploadAvatar} typeStyle="blue">
                        Download
                    </ButtonLayout>
                </div>
            </>
        );
    };

    const imageDropBox = () => {
        return (
            <>
                <div
                    className="download-image"
                    onDragEnter={dragEnter}
                    onDragLeave={dragLeave}
                    onDragOver={dragEnter}
                    onDrop={handleOnDrop}
                >
                    <p>Download Image</p>
                </div>
                <div className="download-file-image" onClick={() => inputRef.current?.click()}>
                    <input type="file" ref={inputRef} onChange={onChange} style={{ display: 'none' }} />
                    <ButtonLayout typeStyle="download">
                        <IconLayout iconName="upload" />
                        UPLOAD AVATAR
                    </ButtonLayout>
                </div>
            </>
        );
    };

    const renderContent = () => {
        if (loading) {
            return <Loader />;
        }

        if (avatarState.imgSrc) {
            return imageCropBox();
        }

        return imageDropBox();
    };

    return (
        <div className="root" data-testid="avatar-editor-page">
            {renderContent()}
        </div>
    );
};
