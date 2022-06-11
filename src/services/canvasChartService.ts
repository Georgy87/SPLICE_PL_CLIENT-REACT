import { MountType } from '../store/slices/pack/types';
import { ICanvasChart } from './types';

export class CanvasChartService implements ICanvasChart {
	HEIGHT = 300;
	width = 1000;
	padding = 80;
	dpiWidth = this.width * 2;
	dpiHeight = this.HEIGHT * 2;
	viewHeight = this.dpiHeight - this.padding * 2;
	viewWidth = this.dpiWidth;
	ROWS_COUNT = 5;
	textXWidth = 70;
	textXHeight = 20;
	textYWidth = 50;
	drawingChart(
		canvas: HTMLCanvasElement | null,
		coordsData: MountType,
		width: number,
		padding: number,
	) {

		this.width = width;
		this.padding = padding;
		this.dpiWidth = this.width * 2;
		this.dpiHeight = this.HEIGHT * 2;
		this.viewWidth = this.dpiWidth;
		this.viewHeight = this.dpiHeight - this.padding * 2;

		if (!canvas) return;

		const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
		if (!ctx) return;

		canvas.width = this.dpiWidth;
		canvas.height = this.dpiHeight;
		const mountNames: string[] = Object.keys(coordsData);
		const coordsXY: { x: number; y: number }[] = Object.values(coordsData);

		this.drawingDottedLines(ctx, coordsData, mountNames, coordsXY, canvas, padding);
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
			ctx.lineTo(x + this.padding, y);
		}
		ctx.stroke();
		ctx.closePath();
	}

	yLine(ctx: CanvasRenderingContext2D | null, yMax: number, yMin: number) {
		let { padding, dpiWidth, ROWS_COUNT, viewHeight, width, textYWidth } = this;
		if (!ctx) return;

		const step = viewHeight / ROWS_COUNT;
		const textStep = (yMax - yMin) / ROWS_COUNT;
		ctx.beginPath();
		ctx.strokeStyle = '#bbb';
		ctx.font = 'normal 20px Helvetica, sans-serif';
		ctx.fillStyle = '#96a2aa';

		for (let i = 0; i <= ROWS_COUNT; i++) {
			const y = step * i;
			const text = Math.round(yMax - textStep * i);

			if (width < 900) {
				textYWidth = 30;
			}

			if (width < 600) {
				textYWidth = 20;
			}
			ctx.fillText(text.toString(), 0, y + padding, textYWidth);
			ctx.lineWidth = 1;

			ctx.moveTo(padding - 5, y + padding);
			ctx.lineTo(dpiWidth - padding, y + padding);
		}

		ctx.stroke();
		ctx.closePath();
	}

	xLine(ctx: CanvasRenderingContext2D | null, xRatio: number, mountNames: string[], proxy: any) {
		let { padding, dpiHeight, viewHeight, width, textXWidth, textXHeight } = this;
		if (!ctx) return;
	

		ctx.beginPath();
		ctx.strokeStyle = '#bbb';
		let idx: number = -1;
		for (let key of mountNames) {
			idx++;
			const x: number = idx * xRatio;

			if (width < 900) {
				key = key.slice(0, 3);
				textXWidth = 30;
			}

			if (width < 600) {
				textXHeight = 0;
				textXWidth = 22;
			}
			ctx.fillText(key, x + padding + 5, dpiHeight - textXHeight, textXWidth);
			ctx.lineWidth = 1;
			ctx.moveTo(x + padding, padding);
			ctx.lineTo(x + padding, dpiHeight - padding + 25);
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
				ctx.moveTo(x + padding, padding);
				ctx.lineTo(x + padding, viewHeight + padding);
				// ctx.restore();
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
		this.clear(ctx);
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
		const { dpiHeight, viewHeight, viewWidth, padding, width } = this;

		this.clear(ctx);

		const [yMin, yMax]: number[] = this.computeBoundaries(coordsData);

		const yRatio: number = viewHeight / (yMax - yMin);
		const xRatio: number = viewWidth / mountNames.length - 1;

		if (!proxy) return;
		this.yLine(ctx, yMax, yMin);
		this.xLine(ctx, xRatio, mountNames, proxy);

		let coords: number[][] = coordsXY.map(({ x, y }, i) => {
			return [Math.floor(i * xRatio), Math.floor(dpiHeight - padding - y * yRatio)];
		});

		this.chartLine(ctx, coords);
	}

	clear(ctx: CanvasRenderingContext2D | null) {
		const { dpiHeight, dpiWidth } = this;
		ctx?.clearRect(0, 0, dpiWidth, dpiHeight);
	}

	isOver(proxy: any, x: number, length: number) {
		const { dpiWidth } = this;
		if (!proxy.mouse) {
			return false;
		}
		const width: number = dpiWidth / length;
		return Math.abs(x - proxy.mouse.x) < width / 2;
	}
}

export const canvasChartService = new CanvasChartService();
