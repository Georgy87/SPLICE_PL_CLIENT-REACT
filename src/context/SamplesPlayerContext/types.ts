export type SamplesPlayerStateType = {
	ready: boolean;
	samples?: Samples[];
	isPlaying: boolean;
	currentId: number;
	active: null | Samples;
};

export type Samples = {
	_id: string;
	audio: string;
	packId: string;
	sampleName: string;
};
