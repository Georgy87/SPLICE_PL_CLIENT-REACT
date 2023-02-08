import { MutableRefObject } from 'react';
import { MountType } from '@slices/pack/types';

export interface ICanvasChart {
  width: number;
  height: number;
  padding: number;
  dpiWidth: number;
  dpiHeight: number;
  rowsCount: number;
  viewHeight: number;
  viewWidth: number;
  textXWidth: number;
  textXHeight: number;
  textYWidth: number;
  circleRadius: number;
  drawingChart(
    canvas: HTMLCanvasElement | null,
    coordsData: MountType | undefined,
    width: number,
    padding: number
  ): void;
  computeBoundaries(coordsData: MountType): number[];
  chartLine(ctx: CanvasRenderingContext2D | null, coords: number[][], proxy: any): void;
  yLine(ctx: CanvasRenderingContext2D | null, rowsCount: number, step: number, yMax: number, textStep: number): void;
  xLine(ctx: CanvasRenderingContext2D | null, xRatio: number, mountNames: string[], proxy: any): void;
  drawingElements(
    ctx: CanvasRenderingContext2D | null,
    coordsData: MountType,
    mountNames: string[],
    coordsXY: { x: number; y: number }[],
    canvas: HTMLCanvasElement | null,
    PADDING: number
  ): void;
  paint(
    ctx: CanvasRenderingContext2D | null,
    coordsData: MountType,
    mountNames: string[],
    coordsXY: { x: number; y: number }[],
    proxy: any,
    canvas: HTMLCanvasElement | null,
    requestId: number,
    mousemove: (e: MouseEvent) => void,
    mouseleave: (e: MouseEvent) => void
  ): void;
  clear(ctx: CanvasRenderingContext2D | null): void;
  isOver(proxy: any, x: number, length: number): boolean;
}

export interface IIntersectionObserver {
  isObserver(
    totalPages: number,
    pageEnd: MutableRefObject<HTMLInputElement>,
    pagesCounter: number,
    onLongMore: () => void
  ): void;
}

// LOCAL STORAGE

export type Key = string;

export type Value = unknown;

export type ILocalStorageCustomStorage = Storage | Record<Key, Value>;

export interface ILocalStorage {
  read<T>(key: string): undefined | T;
  write<T>(key: string, value: T): void;
  remove(key: string): void;
}

export interface ILocalStorageConstructor {
  new (): ILocalStorage;
}