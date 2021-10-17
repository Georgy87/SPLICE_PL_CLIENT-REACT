export type SamplesPlayerStateType = {
	ready: boolean;
	samples?: Samples[];
	isPlaying: boolean;
	currentIndex: number;
	active: null | string;
};

export type Samples = {
	_id: string;
	audio: string;
	packId: string;
	sampleName: string;
};
