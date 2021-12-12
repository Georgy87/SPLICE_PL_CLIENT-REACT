import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';

import { useDropzone } from '../../hooks/useDropzone';
import { avatarService } from '../../utils/avatarService';

import './UserProfilePhoto.css';

export const AvatarEditorPage = () => {
	const imgRef = useRef<HTMLImageElement | HTMLCanvasElement | null>(null);
	const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

	const [avatarState, setAvatarState] = useState<{
		imgSrc: any;
		imgSrcExt: string | ArrayBuffer | null | undefined;
	}>({
		imgSrc: null,
		imgSrcExt: null,
	});

	const [crop, setCrop] = useState<any>({ unit: '%', width: 30, aspect: 1 / 1 });
	const [completedCrop, setCompletedCrop] = useState(null);

	const { drag, setDrag, dragEnter, dragLeave } = useDropzone();

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

					setAvatarState({
						imgSrc: myResult,
						imgSrcExt: avatarService.extractImageFileExtensionFromBase64(myResult),
					});
				},
				false,
			);
			reader.readAsDataURL(currentFile[0]);
		}
	};

	const onLoad = useCallback((img) => {
		imgRef.current = img;
	}, []);

	useEffect(() => {
		if (!completedCrop || !previewCanvasRef.current || !imgRef) {
			return;
		}

		const image: any = imgRef.current;

		if (!image) return;
		
		const canvas = previewCanvasRef.current;
		const crop: any = completedCrop;

		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		
		const ctx: CanvasRenderingContext2D | null  = canvas.getContext('2d');
		const pixelRatio = window.devicePixelRatio;

		canvas.width = crop.width * pixelRatio * scaleX;
		canvas.height = crop.height * pixelRatio * scaleY;

		if (!ctx) return;

		ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		ctx.imageSmoothingQuality = 'high';

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width * scaleX,
			crop.height * scaleY,
		);
	}, [completedCrop]);

	return (
		<div>
			<div className='photo-add-container'>
				{avatarState.imgSrc ? (
					<>
						<ReactCrop
							src={avatarState.imgSrc}
							crop={crop}
							onImageLoaded={onLoad}
							onChange={(c) => setCrop(c)}
							onComplete={(c: any) => setCompletedCrop(c)}
						/>
						<br />
						<p
							style={{
								textAlign: 'center',
								fontFamily: 'var(--myFontFamily)',
							}}
						>
							Предпросмотр аватара
						</p>
						<canvas
							ref={previewCanvasRef}
							style={{
								width: '200px',
								height: '200px',
								display: 'block',
								margin: '0 auto',
								borderRadius: '100%',
							}}
						></canvas>
					</>
				) : (
					<div
						style={{
							borderStyle: 'none',
							width: '500px',
							height: '300px',
							borderRadius: '4px',
							textAlign: 'center',
							margin: '0 auto',
							marginTop: '80px',
							cursor: 'pointer',
							boxShadow: 'inset 2px 3px 10px rgb(228, 241, 244)',
							// backgroundColor: "rgb(243, 245, 244)"
						}}
						onDragEnter={dragEnter}
						onDragLeave={dragLeave}
						onDragOver={dragEnter}
						onDrop={handleOnDrop}
					>
						<p>Download Image</p>
					</div>
				)}
			</div>
		</div>
	);
};
