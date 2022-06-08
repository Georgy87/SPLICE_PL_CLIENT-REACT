import { MountType } from '../store/slices/pack/types';

interface ICanvasChart {
	WIDTH: number;
	HEIGHT: number;
	PADDING: number;
	DPI_WIDTH: number;
	DPI_HEIGHT: number;
	ROWS_COUNT: number;
	VIEW_HEIGHT: number;
	VIEW_WIDTH: number;
	drawingChart(
		canvas: HTMLCanvasElement | null,
		coordsData: MountType | undefined,
		width: number,
		padding: number,
	): void;
	computeBoundaries(coordsData: MountType): number[];
	chartLine(ctx: CanvasRenderingContext2D | null, coords: number[][]): void;
	yLine(
		ctx: CanvasRenderingContext2D | null,
		ROWS_COUNT: number,
		step: number,
		yMax: number,
		textStep: number,
	): void;
	xLine(
		ctx: CanvasRenderingContext2D | null,
		xRatio: number,
		mountNames: string[],
		proxy: any,
	): void;
}

class CanvasChartService implements ICanvasChart {
	WIDTH = 1000;
	HEIGHT = 300;
	PADDING = 80;
	ROWS_COUNT = 5;
	DPI_WIDTH = this.WIDTH * 2;
	DPI_HEIGHT = this.HEIGHT * 2;
	VIEW_HEIGHT = this.DPI_HEIGHT - this.PADDING * 2;
	VIEW_WIDTH = this.DPI_WIDTH;

	drawingChart(
		canvas: HTMLCanvasElement | null,
		coordsData: MountType,
		width: number,
		padding: number,
	) {
		let { DPI_WIDTH, DPI_HEIGHT, PADDING, WIDTH, VIEW_HEIGHT, VIEW_WIDTH } = this;

		WIDTH = width;
		PADDING = padding;

		if (!canvas) return;
		let REQUEST_ID: number = 0;
		const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
		if (!ctx) return;

		canvas.width = DPI_WIDTH;
		canvas.height = DPI_HEIGHT;
		const mountNames: string[] = Object.keys(coordsData);
		const coordsXY: { x: number; y: number }[] = Object.values(coordsData);
		//@ts-ignore
		const proxy: any = new Proxy(
			{},
			{
				set(...args) {
					const result = Reflect.set(...args);

					REQUEST_ID = requestAnimationFrame(pointTest);
					return result;
				},
			},
		);

		const pointTest = () => {
			this.paint(ctx, coordsData, mountNames, coordsXY, proxy);
			console.log(proxy.mouse, WIDTH);
			// return () => {
			// 	cancelAnimationFrame(REQUEST_ID);
			// 	canvas.removeEventListener('mousemove', mousemove);
			// };
		};

		this.init(ctx, coordsData, mountNames, coordsXY);
		canvas.addEventListener('mousemove', mousemove);

		function mousemove(event: MouseEvent) {
			if (!canvas) return;
			const { left } = canvas.getBoundingClientRect();
			//@ts-ignore
			proxy.mouse = {
				x: (event.clientX - left) * 2 - PADDING,
			};
		}
	}

	computeBoundaries(coordsData: MountType) {
		return [0, 1000];
	}

	chartLine(ctx: CanvasRenderingContext2D | null, coords: number[][]) {
		if (!ctx) return;

		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.strokeStyle = 'red';
		for (const [x, y] of coords) {
			ctx.lineTo(x + this.PADDING, y);
		}
		ctx.stroke();
		ctx.closePath();
	}

	yLine(
		ctx: CanvasRenderingContext2D | null,
		yMax: number,
		yMin: number,
		proxy: {} | { mouse: { x: number } },
	) {
		const { PADDING, DPI_WIDTH, ROWS_COUNT, VIEW_HEIGHT } = this;
		if (!ctx) return;

		const step = VIEW_HEIGHT / ROWS_COUNT;
		const textStep = (yMax - yMin) / ROWS_COUNT;
		ctx.beginPath();
		ctx.strokeStyle = '#bbb';
		ctx.font = 'normal 20px Helvetica, sans-serif';
		ctx.fillStyle = '#96a2aa';

		for (let i = 0; i <= ROWS_COUNT; i++) {
			const y = step * i;
			const text = Math.round(yMax - textStep * i);
			ctx.fillText(text.toString(), PADDING / 5, y + PADDING);
			ctx.lineWidth = 1;

			ctx.moveTo(PADDING - 5, y + PADDING);
			ctx.lineTo(DPI_WIDTH - PADDING, y + PADDING);
		}

		ctx.stroke();
		ctx.closePath();
	}

	xLine(ctx: CanvasRenderingContext2D | null, xRatio: number, mountNames: string[], proxy: any) {
		const { PADDING, DPI_HEIGHT } = this;
		if (!ctx) return;

		ctx.beginPath();
		ctx.strokeStyle = '#bbb';
		let idx: number = -1;
		for (let key of mountNames) {
			idx++;
			const x: number = idx * xRatio;
			ctx.fillText(key, x + PADDING, DPI_HEIGHT - 20, 80);
			ctx.lineWidth = 1;
			ctx.moveTo(x + PADDING, PADDING);
			ctx.lineTo(x + PADDING, DPI_HEIGHT - PADDING + 25);
		}
		ctx.stroke();
		ctx.closePath();

		let idx1: number = -1;
		ctx.beginPath();
		ctx.strokeStyle = 'yellow';
		ctx.lineWidth = 2;
		for (let key of mountNames) {
			idx1++;
			const x: number = idx1 * xRatio;

			if (this.isOver(proxy, x, mountNames.length)) {
			
				// ctx.save();
				ctx.moveTo(x + PADDING, PADDING * 2);
				ctx.lineTo(x + PADDING, DPI_HEIGHT - PADDING);
				// ctx.restore();
				// ctx.stroke();
				// ctx.closePath();
			}
		}
		ctx.stroke();
		ctx.closePath();
	}

	paint(
		ctx: CanvasRenderingContext2D | null,
		coordsData: MountType,
		mountNames: string[],
		coordsXY: { x: number; y: number }[],
		proxy: any,
	) {
		const { DPI_HEIGHT, VIEW_HEIGHT, VIEW_WIDTH, PADDING } = this;

		this.clear(ctx);
		//@ts-ignore

		const [yMin, yMax] = this.computeBoundaries(coordsData);

		const yRatio = VIEW_HEIGHT / (yMax - yMin);
		const xRatio = VIEW_WIDTH / mountNames.length - 1;

		if (!proxy) return;
		this.yLine(ctx, yMax, yMin, proxy);
		this.xLine(ctx, xRatio, mountNames, proxy);

		let coords = coordsXY.map(({ x, y }, i) => {
			return [Math.floor(i * xRatio), Math.floor(DPI_HEIGHT - PADDING - y * yRatio)];
		});

		this.chartLine(ctx, coords);
	}

	clear(ctx: CanvasRenderingContext2D | null) {
		const { DPI_HEIGHT, DPI_WIDTH } = this;
		ctx?.clearRect(0, 0, DPI_WIDTH, DPI_HEIGHT);
	}

	isOver(proxy: any, x: number, length: number) {
		const { DPI_HEIGHT, DPI_WIDTH } = this;
		if (!proxy.mouse) {
			return false;
		}
		const width = DPI_WIDTH / length;
		// console.log( this.DPI_WIDTH , 'width');
		// console.log(x, 'x', proxy.mouse.x, 'mouse x', Math.abs(x - proxy.mouse.x) < width / 2);
		//@ts-ignore
		return Math.abs(x - proxy.mouse.x) < width / 2;
	}

	init(
		ctx: CanvasRenderingContext2D | null,
		coordsData: MountType,
		mountNames: string[],
		coordsXY: { x: number; y: number }[],
	) {
		this.paint(ctx, coordsData, mountNames, coordsXY, {});
	}
}

export const canvasChartService = new CanvasChartService();
