export default () => {
	console.log('hsdhfjskdjhfs')
	self.onmessage = (e) => {
		console.log(e);
		const canvas = new OffscreenCanvas(1100, 100);
		const ctx = canvas.getContext('2d');
		postMessage('Test worker');

		// const dpr = window.devicePixelRatio || 1;
		// const padding = 1;

		// if (canvas === null) return;

		// // canvas.width = canvas.offsetWidth * dpr;
		// // canvas.height = (canvas.offsetHeight + padding * 2) * dpr;

		// ctx?.scale(dpr, dpr);
		// ctx?.translate(0, canvas.offsetHeight / 2 + padding);

		// const width = canvas.offsetWidth / audioCoordinates.length;

		// for (let i = 0; i < audioCoordinates.length; i++) {
		// 	const x = width * i;
		// 	// let height: number = audioCoordinates[i] * canvas.offsetHeight - padding;
		// 	let height = audioCoordinates[i];
		// 	if (height < 0) {
		// 		height = 0;
		// 	} else if (height > canvas.offsetHeight / 2) {
		// 		height = height - canvas.offsetHeight / 2;
		// 	}
		// 	drawLineSegment(ctx, x, height, width, (i + 1) % 2);
		// }

		// const base64String = canvas.toDataURL('image/png');
		// // document.body.appendChild(newImg);

		// const base64StringtoFile = (base64String, filename) => {
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

		// return base64StringtoFile(base64String, 'png');
	};
};

// const drawLineSegment = (
// 	ctx,
// 	x,
// 	height,
// 	width,
// 	isEven,
// ) => {
// 	if (ctx === null) {
// 		return;
// 	}
// 	ctx.lineWidth = 1;
// 	ctx.strokeStyle = '#98b2d1';
// 	ctx.beginPath();
// 	height = isEven ? height : -height;
// 	ctx.moveTo(x, 0);
// 	ctx.lineTo(x, height);
// 	ctx.arc(x + width / 2, height, width / 2, Math.PI, 6, isEven);
// 	ctx.lineTo(x + width, 0);
// 	ctx.stroke();
// };
