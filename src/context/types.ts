import { Pack } from "../store/types/packs";

export type PlayerStateType = {
    audioPlayer: HTMLAudioElement;
    packs: Pack[];
    currentTrackIndex: null | number;
    isPlaying: boolean;
    currentTrackId: null | string;
    active: null,
}
