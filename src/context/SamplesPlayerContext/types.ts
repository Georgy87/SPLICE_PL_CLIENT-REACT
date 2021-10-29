export type SamplesPlayerStateType = {
	ready: boolean;
	samples?: Samples[];
	isPlaying: boolean;
	currentId: number;
	active: null | Samples;
	loading: boolean;
};

export type Samples = {
	_id: string;
	audio: string;
	packId: string;
	sampleName: string;
	percentBpm: number;
};
