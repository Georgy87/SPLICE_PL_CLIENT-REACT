export default function CreateSampleWebWorker() {
	onmessage = (e) => {
		const { audioCoordinates, audioFile, canvas, packId, cssCanvasWidth, cssCanvasHeight, dpr, fileId, duration } = e.data;

		const ctx = e.data.canvas.getContext('2d');

		if (e.data.canvas === null) return;
	
		canvas.width = cssCanvasWidth * dpr;
		canvas.height = cssCanvasHeight * dpr;

		ctx?.scale(dpr, dpr);
		ctx?.translate(0, cssCanvasHeight / 2);

		const barWidth = cssCanvasWidth / audioCoordinates.length;

		ctx.strokeStyle = '#ADD8E6';
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

			postMessage({ imageFile, audioFile, audioCoordinates, packId, fileId, duration });
		}
	};

	const drawLineSegment = (ctx, x, barHeight, barWidth) => {
		ctx.fillStyle = '#ADD8E6';
		ctx.fillRect(x + barWidth / 2, -(barHeight / 2), 0.6, barHeight);
	};
}
