export default function WebWorker() {
	onmessage = (e) => {
		const { audioCoordinates, sampleId, profileUpdate, cssCanvasWidth, cssCanvasHeight, dpr } = e.data;
		const ctx = e.data.canvas.getContext('2d');
		const { canvas } = e.data;
	
		if (e.data.canvas === null) return;
	
		canvas.width = cssCanvasWidth * dpr;
		canvas.height = (cssCanvasHeight * 2) * dpr;
	
		ctx?.scale(dpr, dpr);
		ctx?.translate(0, cssCanvasHeight / 2);

		const barWidth = cssCanvasWidth / audioCoordinates.length;

		ctx.strokeStyle = '#98b2d1';
		ctx.beginPath();
		
		for (let i = 0; i < audioCoordinates.length; i++) {
			const x = barWidth * i;
			let height = audioCoordinates[i];
			drawLineSegment(ctx, x, height, barWidth, (i + 1) % 2, canvas);
		}

		ctx.stroke();
		canvas.convertToBlob({ type: 'image/png' }).then((blob) => fileCreator(blob));

		function fileCreator(blob) {
			const file = new File([blob], 'png', { type: 'png' });
			postMessage({ file, sampleId, profileUpdate });
		}
	};

	const drawLineSegment = (ctx, x, height, barWidth) => {
		if (ctx === null) return;
		ctx.moveTo(x, 0);
		ctx.rect(x + barWidth / 2, -(height / 2), 2, height);
	};
}

