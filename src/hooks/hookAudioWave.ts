window.AudioContext = window.AudioContext;
const audioContext = new AudioContext();

export const hookAudioWave = (
	data: Promise<ArrayBuffer>,
	canvas: HTMLCanvasElement | null,
) => {
	data.then((data) =>
		audioContext.decodeAudioData(data),
	).then((data: AudioBuffer) =>
		draw(normalizeData(filterData(data)), canvas),
	);
};

const filterData = (audioBuffer: AudioBuffer) => {
	const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data

	const samples = 20000; // Number of samples we want to have in our final data set
	const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
	const filteredData = [];

	for (let i = 0; i < samples; i++) {
		let blockStart = blockSize * i; // the location of the first sample in the block
	
		let sum = 0;
		for (let j = 0; j < blockSize; j++) {
			sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
		}
		filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
	}
	return filteredData;
};

const normalizeData = (filteredData: number[]) => {
	const multiplier = Math.pow(Math.max(...filteredData), -1);
	return filteredData.map((n: number) => n * multiplier);
};

const draw = (normalizedData: number[], canvas: HTMLCanvasElement | null) => {
	const dpr = window.devicePixelRatio || 1;
	const padding = 1;
	if (canvas != null) {
		canvas.width = canvas.offsetWidth * dpr;
		canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
		const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
		ctx?.scale(dpr, dpr);
		ctx?.translate(0, canvas.offsetHeight / 2 + padding); // set Y = 0 to be in the middle of the canvas

		// draw the line segments
		const width: number = canvas.offsetWidth / normalizedData.length;
		for (let i = 0; i < normalizedData.length; i++) {
			const x: number = width * i;
			let height: number =
				normalizedData[i] * canvas.offsetHeight - padding;
			if (height < 0) {
				height = 0;
			} else if (height > canvas.offsetHeight / 2) {
				height = height - canvas.offsetHeight / 2;
			}
			drawLineSegment(ctx, x, height, width, (i + 1) % 2);
		}
	}
};

const drawLineSegment = (
	ctx: CanvasRenderingContext2D | null,
	x: number,
	height: number,
	width: number,
	isEven: any,
) => {
	if (ctx != null) {
		ctx.lineWidth = 1; // how thick the line is
		ctx.strokeStyle = '#98b2d1'; // what color our line is
		ctx.beginPath();
		height = isEven ? height : -height;
		ctx.moveTo(x, 0);
		ctx.lineTo(x, height);
		ctx.arc(x + width / 2, height, width / 2, Math.PI, 6, isEven);
		ctx.lineTo(x + width, 0);
		ctx.stroke();
	}
};
