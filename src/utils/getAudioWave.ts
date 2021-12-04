import { instance } from '../core/axios';

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

	// const worker = new Worker(worker_script);
   	// worker.onmessage = ev => {	
    //   console.log("got data back from worker");
    //   console.log(ev);
    // };

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
	// document.body.appendChild(newImg);

	const base64StringtoFile = (base64String: string, filename: string) => {
		let arr = base64String.split(','),
			// mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, { type: 'png' });
	};

	const resultFiles: File = base64StringtoFile(base64String, 'png');

	const sendFileImages = async (file: File, profileUpdate: boolean | undefined) => {
		try {
			if (file && profileUpdate) {
				const formData = new FormData();
				formData.append('file', file);
				await instance.post(`samples/images?sampleId=${sampleId}`, formData);
			}
		} catch (e) {
			console.log(e);
		}
	};

	sendFileImages(resultFiles, profileUpdate);
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
