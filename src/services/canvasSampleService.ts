import { Crop } from 'react-image-crop';
import { base64StringtoFile } from '../utils/base64StringtoFile';

class CanvasSampleService {
	drawingSampleCanvas(canvas: HTMLCanvasElement | null, audioCoordinates: number[], percent: number) {
		this.drawing({ canvas, audioCoordinates, percent, fillColor: '#03f', rectangleWidth: 0.5, drawingTarget: 'Drawing' });
	}

	drawingCanvasToImage(
		audioFile: File,
		audioCoordinates: number[],
		packId: string | null,
		canvas: HTMLCanvasElement | null,
		fileId: string,
		duration: number,
	) {
		const dataUrl = this.drawing({ canvas, audioCoordinates, percent: null, fillColor: '#ADD8E6', rectangleWidth: 0.6, drawingTarget: 'Image' });

		if (!dataUrl) return;

		return {
			imageFile: base64StringtoFile(dataUrl, 'png'),
			audioFile,
			audioCoordinates,
			packId,
			fileId,
			duration,
		};
	}

	drawing({
		canvas,
		audioCoordinates,
		percent,
		fillColor,
		rectangleWidth,
		drawingTarget,
	}: {
		canvas: HTMLCanvasElement | null;
		audioCoordinates: number[];
		percent: number | null;
		fillColor: string;
		rectangleWidth: number;
		drawingTarget: 'Image' | 'Drawing';
	}) {
		const cssCanvasWidth: number = 550;
		const cssCanvasHeight: number = 50;
		const dpr: number = 2;

		if (canvas === null) return;

		const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

		canvas.width = cssCanvasWidth * dpr;
		canvas.height = cssCanvasHeight * dpr;

		ctx?.scale(dpr, dpr);
		ctx?.translate(0, cssCanvasHeight / 2);

		const barWidth: number = cssCanvasWidth / audioCoordinates.length;

		if (ctx === null) return;

		ctx.strokeStyle = '#ADD8E6';
		ctx.beginPath();

		// if (!percent) return null;

		let cycleLimiter = 0;
		//@ts-ignore
		drawingTarget === 'Image' ? (cycleLimiter = audioCoordinates.length) : (cycleLimiter = percent);

		for (let i = 0; i < cycleLimiter; i++) {
			const x: number = barWidth * i;
			let barHeight: number = audioCoordinates[i];
			drawLineSegment(ctx, x, barHeight, barWidth, rectangleWidth);
		}

		ctx.stroke();

		function drawLineSegment(ctx: CanvasRenderingContext2D, x: number, barHeight: number, barWidth: number, rectangleWidth: number) {
			ctx.fillStyle = fillColor;
			ctx.fillRect(x + barWidth / 2, -(barHeight / 2), rectangleWidth, barHeight);
		}

		const dataUrl = canvas.toDataURL();
		
		return dataUrl;
	}
}

export const canvasSampleService = new CanvasSampleService();
