import { Pack } from "../../store/slices/pack/types";

export type PlayerStateType = {
    audioPlayer: HTMLAudioElement;
    packs: Pack[];
    samples: Samples[];
    currentTrackIndex: null | number;
    isPlaying: boolean;
    currentTrackId: null | string;
    active: null;
    duration: number;
    currentTime: number;
    volume: number;
    percent: number;
}

export type Samples = {
	_id: string;
	audio: string;
	packId: string;
	sampleName: string;
	percentBpm: number;
};

