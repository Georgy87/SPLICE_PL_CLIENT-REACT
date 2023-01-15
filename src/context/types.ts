import { Pack } from "../store/slices/pack/types";
import { Samples } from "../store/slices/samples/types";

export type PlayerStateType = {
    audioPlayer: HTMLMediaElement;
    packs: Pack[];
    samples: Samples[];
    currentTrackIndex: null | number;
    isPlaying: boolean;
    currentTrackId: null | string;
    active: null;
    duration: number;
    currentTime: number;
    packCurrentTime: number;
    volume: number;
    percent: number;
    packPercent: number;
    onload: boolean;
}
