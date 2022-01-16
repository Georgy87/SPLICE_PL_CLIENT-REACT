import { User } from "../user/types";

type FileListType = {
	id: string;
	file: File;
}

export type SampleSliceState = {
	samples: Samples[];
	loading: boolean;
	files: FileListType[] | [];
	packId: string | null;
	currentStep: number;
}

export type Samples = {
	_id: string;
	audio: string;
	packId: string;
	sampleName: string;
	audioCoordinates: string;
	// audioCoordinatesParse: number[];
    duration: number;
    likes: User[];
	canvasImage: string;
	bpm: number;
	category: string;
};

