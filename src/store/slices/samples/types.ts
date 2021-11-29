import { User } from "../user/types";

export type Samples = {
	_id: string;
	audio: string;
	packId: string;
	sampleName: string;
	audioCoordinates: number[];
    duration: number;
    likes: User[];
};

