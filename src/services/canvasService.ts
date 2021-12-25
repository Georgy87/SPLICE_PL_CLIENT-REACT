class CanvasService {
	sampleCanvas(
		canvas: HTMLCanvasElement | null,
		audioCoordinatesParse: number[],
		percent: number,
	) {
		const dpr = window.devicePixelRatio || 1;
		console.log(window.devicePixelRatio)
		const cssCanvasWidth: number = 550;
		const cssCanvasHeight: number = 50;

		if (!canvas) return;

		canvas.width = cssCanvasWidth * dpr;
		canvas.height = cssCanvasHeight * dpr;

		const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
		if (ctx === null) return;

		ctx?.scale(dpr, dpr);
		ctx?.translate(0, cssCanvasHeight / dpr);

		const barWidth = canvas.offsetWidth / audioCoordinatesParse.length;

		ctx.beginPath();

		const drawLineSegment = (
			ctx: CanvasRenderingContext2D,
			x: number,
			barHeight: number,
			barWidth: number,
		) => {
			ctx.fillStyle = '#03f';

			ctx.fillRect(x + barWidth / 2, -(barHeight / 2), 0.5, barHeight);
			ctx.stroke();
		};
	
		for (let i = 0; i < percent; i++) {
			const x = barWidth * i;
			let barHeight = audioCoordinatesParse[i];

			drawLineSegment(ctx, x, barHeight, barWidth);
		}
	}
}

export const canvasService = new CanvasService();
