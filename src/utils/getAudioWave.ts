export const getAudioWave = (
	// data: Promise<ArrayBuffer>,
	audioCoordinates: number[],
	canvas: HTMLCanvasElement | null,
) => {
	draw(audioCoordinates, canvas);
};

const draw = (audioCoordinates: number[], canvas: HTMLCanvasElement | null) => {
	const dpr = window.devicePixelRatio || 1;
	const padding = 1;

	if (canvas === null) return;

	canvas.width = canvas.offsetWidth * dpr;
	canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
	const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
	console.log(dpr)
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

	canvas.toBlob(function(blob) {

		var newImg = document.createElement('img'),
			url = URL.createObjectURL(blob);

		newImg.onload = function() {
			// больше не нужно читать blob, поэтому он отменён
			URL.revokeObjectURL(url);
		};
		newImg.src = url;
		// const base64String = canvas.toDataURL('image/png');
		// document.body.appendChild(newImg);

		// const base64StringtoFile = (base64String: string, filename: string) => {
		// 	let arr = base64String.split(','),
		// 		// mime = arr[0].match(/:(.*?);/)[1],
		// 		bstr = atob(arr[1]),
		// 		n = bstr.length,
		// 		u8arr = new Uint8Array(n);
		// 	while (n--) {
		// 		u8arr[n] = bstr.charCodeAt(n);
		// 	}
		// 	return new File([u8arr], filename, { type: 'png' });
		// };
		// const file = base64StringtoFile(base64String, 'sample-cloud');

		// console.log(file);
	});
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
	ctx.arc(x + width / 2, height, width / 2, Math.PI, 6, isEven);
	ctx.lineTo(x + width, 0);
	ctx.stroke();
};
