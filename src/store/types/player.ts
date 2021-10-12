import { Pack } from "./packs";

export interface PlayerSliceState {
    active: null | Pack;
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
    audio: any;
    test: string;
}
