import { User } from '../user/types';

type FileListType = {
	id: string;
	file: File;
};

export type samplesToSendType = {
	imageFile: File;
	audioFile: File;
	audioCoordinates: number[];
	packId: string | null;
	fileId: string;
	duration: number;
};

export type SampleSliceState = {
	samples: Samples[];
	loading: boolean;
	files: FileListType[] | [];
	packId: string | null;
	currentStep: number;
	samplesToSend: samplesToSendType | null;
};

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
	packPicture: string;
};
