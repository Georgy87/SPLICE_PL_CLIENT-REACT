import { Crop } from "react-image-crop";

class AvatarService {
	constructor() {}

	extractImageFileExtensionFromBase64(base64Data: string | ArrayBuffer | null) {
		if (base64Data && typeof base64Data === 'string') {
			return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'));
		}
	}

	image64toCanvasRef(canvasRef: HTMLCanvasElement | null, image64: string, pixelCrop: Crop) {
		if (canvasRef === null) return;

		const canvas = canvasRef;
		canvas.width = pixelCrop.width;
		canvas.height = pixelCrop.height;
	
		const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
		const image = new Image();
		image.src = image64;
		image.onload = function() {
			ctx?.drawImage(
				image,
				pixelCrop.x,
				pixelCrop.y,
				pixelCrop.width,
				pixelCrop.height,
				0,
				0,
				pixelCrop.width,
				pixelCrop.height
			);
		};
	};
}

export const avatarService = new AvatarService();
