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

export class CanvasChartService implements ICanvasChart {
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
		let { DPI_WIDTH, PADDING } = this;

		this.WIDTH = width;
		this.PADDING = padding;
		this.DPI_WIDTH = this.WIDTH * 2;
		this.DPI_HEIGHT = this.HEIGHT * 2;
		this.VIEW_WIDTH = DPI_WIDTH;
		this.VIEW_HEIGHT = this.DPI_HEIGHT - this.PADDING * 2;

		if (!canvas) return;

		const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
		if (!ctx) return;

		canvas.width = this.DPI_WIDTH;
		canvas.height = this.DPI_HEIGHT;
		const mountNames: string[] = Object.keys(coordsData);
		const coordsXY: { x: number; y: number }[] = Object.values(coordsData);

		this.drawingDottedLines(
			ctx,
			coordsData,
			mountNames,
			coordsXY,
			canvas,
			PADDING,
		) 
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
		ctx.strokeStyle = 'red';
		ctx.lineWidth = 3;
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

	drawingDottedLines(
		ctx: CanvasRenderingContext2D | null,
		coordsData: MountType,
		mountNames: string[],
		coordsXY: { x: number; y: number }[],
		canvas: HTMLCanvasElement | null,
		PADDING: number,
	) {
		let request_id: number = 0;
		const proxy: any = new Proxy(
			{},
			{
				set(...args) {
					const result = Reflect.set(...args);

					request_id = requestAnimationFrame(pointTest);
					return result;
				},
			},
		);

		this.paint(ctx, coordsData, mountNames, coordsXY, proxy);

		const pointTest = () => {
			this.paint(ctx, coordsData, mountNames, coordsXY, proxy);
			return () => {
				cancelAnimationFrame(request_id);
				canvas?.removeEventListener('mousemove', mousemove);
			};
		};

		canvas?.addEventListener('mousemove', mousemove);
	
		function mousemove(event: MouseEvent) {
			if (!canvas) return;
			const { left } = canvas.getBoundingClientRect();
			//@ts-ignore
			proxy.mouse = {
				x: (event.clientX - left) * 2 - PADDING,
			};
		}
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

		const [yMin, yMax]: number[] = this.computeBoundaries(coordsData);

		const yRatio: number = VIEW_HEIGHT / (yMax - yMin);
		const xRatio: number = VIEW_WIDTH / mountNames.length - 1;

		if (!proxy) return;
		this.yLine(ctx, yMax, yMin, proxy);
		this.xLine(ctx, xRatio, mountNames, proxy);

		let coords: number[][] = coordsXY.map(({ x, y }, i) => {
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
		const width: number = DPI_WIDTH / length;
		return Math.abs(x - proxy.mouse.x) < width / 2;
	}
}

export const canvasChartService = new CanvasChartService();
