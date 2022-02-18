import { Crop } from 'react-image-crop';

class AvatarService {
	extractImageFileExtensionFromBase64(base64Data: string | ArrayBuffer | null) {
		if (base64Data && typeof base64Data === 'string' && base64Data) {
			return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'));
		}
	}

	fileUpload({ files, setAvatarState, onDrop }: { files: any; setAvatarState: any; onDrop: boolean }) {
		if (files && files.length > 0) {
			let currentFile;

			if (onDrop) {
				currentFile = files[0];
			} else {
				currentFile = files;
			}

			const reader = new FileReader();

			reader.addEventListener(
				'load',
				() => {
					const myResult = reader.result;
					const resultAvatarImg = this.extractImageFileExtensionFromBase64(myResult);

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
	}

	avatarCreator(image: any, canvas: HTMLCanvasElement, crop: Crop) {
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;

		const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
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

		return canvas;
	}
}

export const avatarService = new AvatarService();
