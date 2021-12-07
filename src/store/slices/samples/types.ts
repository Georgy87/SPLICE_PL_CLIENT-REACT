import { User } from "../user/types";

export type SampleSliceState = {
	samples: Samples[];
	loading: boolean;
	files: FileList[] | null;
	packId: string | null;
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
};

