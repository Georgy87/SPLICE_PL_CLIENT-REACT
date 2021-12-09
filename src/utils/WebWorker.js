import { createSamples } from './createSamples';

export default function WebWorker() {
	onmessage = (e) => {
		const { audioCoordinates, audioFile, canvas, packId, cssCanvasWidth, cssCanvasHeight, dpr } = e.data;
		const ctx = e.data.canvas.getContext('2d');

		if (e.data.canvas === null) return;

		canvas.width = cssCanvasWidth * dpr;
		canvas.height = cssCanvasHeight * dpr;

		ctx?.scale(dpr, dpr);
		ctx?.translate(0, cssCanvasHeight / 2);

		const barWidth = cssCanvasWidth / audioCoordinates.length;

		ctx.strokeStyle = '#98b2d1';
		ctx.beginPath();

		for (let i = 0; i < audioCoordinates.length; i++) {
			const x = barWidth * i;
			let barHeight = audioCoordinates[i];
			drawLineSegment(ctx, x, barHeight, barWidth, canvas);
		}

		ctx.stroke();
		canvas.convertToBlob({ type: 'image/png' }).then((blob) => fileCreator(blob));

		function fileCreator(blob) {
			const imageFile = new File([blob], 'png', { type: 'png' });
			postMessage({ imageFile, audioFile, audioCoordinates, packId });
		}
	};

	const drawLineSegment = (ctx, x, barHeight, barWidth, canvas) => {
		if (ctx === null) return;
		ctx.moveTo(x, 0);
		ctx.rect(x + barWidth / 2, -(barHeight / 2), 2, barHeight);
		ctx.clearRect(100, 0, 1100, 100);
	};
}
