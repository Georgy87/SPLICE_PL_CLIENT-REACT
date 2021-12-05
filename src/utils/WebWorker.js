export default function WebWorker() {
	onmessage = (e) => {
		const { audioCoordinates, sampleId, profileUpdate, cssCanvasWidth, cssCanvasHeight, dpr } = e.data;
		const ctx = e.data.canvas.getContext('2d');
		const { canvas } = e.data;
	
		const padding = 1;

		if (e.data.canvas === null) return;
	
		canvas.width = cssCanvasWidth * dpr;
		canvas.height = (cssCanvasHeight + padding * 2) * dpr;
	
		ctx?.scale(dpr, dpr);
		ctx?.translate(0, cssCanvasHeight / 2 + padding);

		const width = cssCanvasWidth / audioCoordinates.length;

		ctx.lineWidth = 1;
		ctx.strokeStyle = '#98b2d1';
		ctx.beginPath();
		
		for (let i = 0; i < audioCoordinates.length; i++) {
			const x = width * i;
			let height = audioCoordinates[i];
			if (height < 0) {
				height = 0;
			} else if (height > cssCanvasHeight / 2) {
				height = height - cssCanvasHeight / 2;
			}
			drawLineSegment(ctx, x, height, width, (i + 1) % 2, canvas);
		}

		ctx.stroke();

		canvas.convertToBlob({ type: 'image/png' }).then((blob) => fileCreator(blob));

		function fileCreator(blob) {
			const file = new File([blob], 'png', { type: 'png' });
			postMessage({ file, sampleId, profileUpdate });
		}
	};

	const drawLineSegment = (ctx, x, height, width, isEven) => {
		// if (ctx === null) return;
		
		height = isEven ? height : -height;
		ctx.moveTo(x, 0);
		ctx.lineTo(x, height);
		ctx.arc(x + width / 2, height, width / 2, Math.PI, 6, isEven);
		
		ctx.lineTo(x + width, 0);
	};
}

