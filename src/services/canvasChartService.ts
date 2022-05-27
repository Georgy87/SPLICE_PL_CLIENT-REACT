import { MountType } from "../store/slices/pack/types";

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
		coordsData: MountType | undefined
	): void;
	computeBoundaries(coordsData: MountType): number[];
	chartLine(
		ctx: CanvasRenderingContext2D | null,
		coords: number[][],
	): void;
	xLine(
		ctx: CanvasRenderingContext2D | null,
		ROWS_COUNT: number,
		step: number,
		yMax: number,
		textStep: number,
	): void;
	yLine(
		ctx: CanvasRenderingContext2D | null,
		xRatio: number,
		mountNames: string[]
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

	drawingChart(canvas: HTMLCanvasElement | null, coordsData: MountType) {
		const {
			WIDTH,
			HEIGHT,
			DPI_WIDTH,
			DPI_HEIGHT,
			VIEW_HEIGHT,
			VIEW_WIDTH,
			ROWS_COUNT,
			PADDING
		} = this;
		const [yMin, yMax] = this.computeBoundaries(coordsData);

		const mountNames = Object.keys(coordsData);
		const coordsXY = Object.values(coordsData);

		const yRatio = VIEW_HEIGHT / (yMax - yMin);
		const xRatio = VIEW_WIDTH / mountNames.length - 1;

		const step = VIEW_HEIGHT / ROWS_COUNT;

		const textStep = (yMax - yMin) / ROWS_COUNT;

		if (!canvas) return;

		const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
		if (!ctx) return;

		canvas.style.width = WIDTH + "px";
		canvas.style.height = HEIGHT + "px";
		canvas.width = DPI_WIDTH;
		canvas.height = DPI_HEIGHT;

		this.xLine(ctx, ROWS_COUNT, step, yMax, textStep);

		let coords = coordsXY.map(({ x, y }, i) => {
			return [
				Math.floor(i * xRatio),
				Math.floor(DPI_HEIGHT - PADDING - y * yRatio)
			];
		});

		this.chartLine(ctx, coords);
		this.yLine(ctx, xRatio, mountNames);
	}

	computeBoundaries(coordsData: MountType) {
		let min;
		let max;
		for (let { x, y } of Object.values(coordsData)) {
			if (typeof min !== "number") min = y;
			if (typeof max !== "number") max = y;

			if (min > y) min = y;
			if (max < y) max = y;
		}

		if (min == undefined || max == undefined) {
			return [0, 0];
		} else {
			return [min, max];
		}
	}

	chartLine(ctx: CanvasRenderingContext2D | null, coords: number[][]) {
		const { PADDING } = this;

		if (!ctx) return;

		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.strokeStyle = "red";
		for (const [x, y] of coords) {
			ctx.lineTo(x + this.PADDING, y);
		}
		ctx.stroke();
		ctx.closePath();
	}

	xLine(
		ctx: CanvasRenderingContext2D | null,
		ROWS_COUNT: number,
		step: number,
		yMax: number,
		textStep: number
	) {
		const { PADDING, DPI_WIDTH } = this;
		if (!ctx) return;

		ctx.beginPath();
		ctx.strokeStyle = "#bbb";
		ctx.font = "normal 20px Helvetica, sans-serif";
		ctx.fillStyle = "#96a2aa";

		for (let i = 0; i <= ROWS_COUNT; i++) {
			const y = step * i;
			const text = Math.round(yMax - textStep * i);
			ctx.fillText(text.toString(), PADDING / 5, y + PADDING);
			ctx.lineWidth = 1;

			ctx.moveTo(PADDING - 15, y + PADDING);
			ctx.lineTo(DPI_WIDTH - PADDING, y + PADDING);
		}

		ctx.stroke();
		ctx.closePath();
	}

	yLine(
		ctx: CanvasRenderingContext2D | null,
		xRatio: number,
		mountNames: string[]
	) {
		const { PADDING, DPI_HEIGHT } = this;
		if (!ctx) return;

		ctx.beginPath();
		ctx.strokeStyle = "#bbb";
		let idx: number = -1;
		for (let key of mountNames) {
			idx++;
			const x: number = idx * xRatio;
			ctx.fillText(key, x + PADDING, DPI_HEIGHT - 25);
			ctx.lineWidth = 1;
			ctx.moveTo(x + PADDING, 80);
			ctx.lineTo(x + PADDING, DPI_HEIGHT - PADDING + 15);
		}
		ctx.stroke();
		ctx.closePath();
	}
}

export const canvasChartService = new CanvasChartService();
