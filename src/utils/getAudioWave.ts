import { base64StringtoFile } from './base64StringtoFile';
// import { sendFileImages } from './createSamples';

export const getAudioWave = (
	// data: Promise<ArrayBuffer>,
	audioCoordinates: number[],
	canvas: HTMLCanvasElement | null,
	sampleId: string,
	profileUpdate: boolean | undefined,
) => {
	draw(audioCoordinates, canvas, sampleId, profileUpdate);
};

const draw = (
	audioCoordinates: number[],
	canvas: HTMLCanvasElement | null,
	sampleId: string,
	profileUpdate: boolean | undefined,
) => {
	const dpr = window.devicePixelRatio || 1;
	const padding = 1;

	if (canvas === null) return;

	canvas.width = canvas.offsetWidth * dpr;
	canvas.height = (canvas.offsetHeight + padding * 2) * dpr;

	const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

	ctx?.scale(dpr, dpr);
	ctx?.translate(0, canvas.offsetHeight / 2 + padding);

	const width: number = canvas.offsetWidth / audioCoordinates.length;

	for (let i = 0; i < audioCoordinates.length; i++) {
		const x: number = width * i;
		// let height: number = audioCoordinates[i] * canvas.offsetHeight - padding;
		let height: number = audioCoordinates[i];
		if (height < 0) {
			height = 0;
		} else if (height > canvas.offsetHeight / 2) {
			height = height - canvas.offsetHeight / 2;
		}
		drawLineSegment(ctx, x, height, width, (i + 1) % 2);
	}

	const base64String = canvas.toDataURL('image/png');

	const resultFiles: File = base64StringtoFile(base64String, 'png');
	
	// sendFileImages(resultFiles, profileUpdate, sampleId);
};

const drawLineSegment = (
	ctx: CanvasRenderingContext2D | null,
	x: number,
	height: number,
	width: number,
	isEven: any,
) => {
	if (ctx === null) {
		return;
	}
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#98b2d1';
	ctx.beginPath();
	height = isEven ? height : -height;
	ctx.moveTo(x, 0);
	ctx.lineTo(x, height);
	// ctx.arc(x + width / 2, height, width / 2, Math.PI, 6, isEven);
	// ctx.rect(x, height);
	ctx.lineTo(x + width, 0);
	ctx.stroke();
};
