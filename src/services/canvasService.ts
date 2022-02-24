import { samplesToSendType } from '../store/slices/samples/types';
import { base64StringtoFile } from '../utils/base64StringtoFile';

class CanvasService {
	drawingSampleCanvas(canvas: HTMLCanvasElement | null, audioCoordinatesParse: number[], percent: number) {
		const dpr = window.devicePixelRatio || 1;

		const cssCanvasWidth: number = 550;
		const cssCanvasHeight: number = 50;

		if (!canvas) return;

		canvas.width = cssCanvasWidth * dpr;
		canvas.height = cssCanvasHeight * dpr;

		const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
		if (ctx === null) return;

		ctx.scale(dpr, dpr);
		ctx.translate(0, cssCanvasHeight / dpr);

		const barWidth = canvas.offsetWidth / audioCoordinatesParse.length;

		ctx.beginPath();

		const drawLineSegment = (ctx: CanvasRenderingContext2D, x: number, barHeight: number, barWidth: number) => {
			ctx.fillStyle = '#03f';

			ctx.fillRect(x + barWidth / 2, -(barHeight / 2), 0.5, barHeight);
			ctx.stroke();
		};

		for (let i = 0; i < percent; i++) {
			const x: number = barWidth * i;
			let barHeight: number = audioCoordinatesParse[i];

			drawLineSegment(ctx, x, barHeight, barWidth);
		}
	}

	drawingCanvasForSampleCreate(
		audioFile: File,
		audioCoordinates: number[],
		packId: string | null,
		canvas: HTMLCanvasElement | null,
		fileId: string,
		duration: number,
	) {
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

		for (let i = 0; i < audioCoordinates.length; i++) {
			const x: number = barWidth * i;
			let barHeight: number = audioCoordinates[i];
			drawLineSegment(ctx, x, barHeight, barWidth);
		}

		ctx.stroke();

		const dataURL: string = canvas.toDataURL();

		function drawLineSegment(ctx: CanvasRenderingContext2D, x: number, barHeight: number, barWidth: number) {
			ctx.fillStyle = '#ADD8E6';
			ctx.fillRect(x + barWidth / 2, -(barHeight / 2), 0.6, barHeight);
		}
		console.log('Not Worker!!!!!!!!!!!!');
		return {
			imageFile: base64StringtoFile(dataURL, 'png'),
			audioFile,
			audioCoordinates,
			packId,
			fileId,
			duration,
		};
	}
}

export const canvasService = new CanvasService();
