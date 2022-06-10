import { MountType } from '../store/slices/pack/types';

export interface ICanvasChart {
	width: number;
	HEIGHT: number;
	padding: number;
	dpiWidth: number;
	dpiHeight: number;
	ROWS_COUNT: number;
	viewHeight: number;
	viewWidth: number;
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
	drawingDottedLines(
		ctx: CanvasRenderingContext2D | null,
		coordsData: MountType,
		mountNames: string[],
		coordsXY: { x: number; y: number }[],
		canvas: HTMLCanvasElement | null,
		PADDING: number,
	): void;
	paint(
		ctx: CanvasRenderingContext2D | null,
		coordsData: MountType,
		mountNames: string[],
		coordsXY: { x: number; y: number }[],
		proxy: any,
	): void;
	clear(ctx: CanvasRenderingContext2D | null): void;
    isOver(proxy: any, x: number, length: number): boolean;
}
