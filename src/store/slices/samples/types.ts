import { User } from "../user/types";

export type Samples = {
	_id: string;
	audio: string;
	packId: string;
	sampleName: string;
	audioCoordinates: string;
	// audioCoordinatesParse: number[] ;
    duration: number;
    likes: User[];
};

