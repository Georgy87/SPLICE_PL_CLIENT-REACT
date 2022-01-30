import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';

import { useDropzone } from '../../hooks/useDropzone';
import { avatarService } from '../../services/avatarService';
import { ButtonLayout } from '../../layouts/ButtonLayout/ButtonLayout';
import { useDispatch } from 'react-redux';
import { fetchUpdateAvatar } from '../../store/slices/user/userSlice';

import './UserProfilePhoto.css';

export const AvatarEditorPage = () => {
	const imgRef = useRef<HTMLImageElement | HTMLCanvasElement | null>(null);
	const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

	const dispatch = useDispatch();

	const [avatarState, setAvatarState] = useState<{
		imgSrc: string;
		imgSrcExt: string;
	}>({
		imgSrc: '',
		imgSrcExt: '',
	});
	const [crop, setCrop] = useState<Crop>({ unit: '%', width: 30, height: 0, aspect: 1 / 1, x: 0, y: 0 });
	const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
	const [avatar, setAvatar] = useState<File | null>(null);

	const { dragEnter, dragLeave } = useDropzone();

	const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();

		const eventData = (e as React.DragEvent).dataTransfer;
		const files = [eventData.files];

		if (files && files.length > 0) {
			const currentFile = files[0];

			const reader = new FileReader();

			reader.addEventListener(
				'load',
				() => {
					const myResult = reader.result;
					const resultAvatarImg = avatarService.extractImageFileExtensionFromBase64(myResult);
					if (typeof myResult === 'string' && resultAvatarImg) {
						setAvatarState({
							imgSrc: myResult,
							imgSrcExt: resultAvatarImg,
						});
					}
				},
				false,
			);
			reader.readAsDataURL(currentFile[0]);
		}
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

		const canvasResult = avatarService.avatarCreator(image, canvas, crop);

		canvasResult?.toBlob(function(blob: Blob | null) {
			if (!blob) return;
			setAvatar(new File([blob], blob?.type.split('/')[1], { type: blob.type }));
		});
	}, [completedCrop]);

	return (
		<div className='root'>
			{avatarState.imgSrc ? (
				<>
					<ReactCrop
						src={avatarState.imgSrc}
						crop={crop}
						onImageLoaded={onLoad}
						onChange={(c: Crop) => setCrop(c)}
						onComplete={(c: Crop) => setCompletedCrop(c)}
					/>
					<div className='preview-avatar'>
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
						<ButtonLayout onClicked={() => dispatch(fetchUpdateAvatar(avatar))} typeStyle="blue">Download</ButtonLayout>
					</div>
				</>
			) : (
				<div className='download-image' onDragEnter={dragEnter} onDragLeave={dragLeave} onDragOver={dragEnter} onDrop={handleOnDrop}>
					<p>Download Image</p>
				</div>
			)}
		</div>
	);
};
