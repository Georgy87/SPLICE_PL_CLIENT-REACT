import { Samples } from "../../../context/PlayerContextProvider/types";

export type PacksSliceState = {
    packs: Pack[] | [];
    packProfile: null | Pack;
    userPacks: Pack[] | [];
}

export type createPackType = {
	info: {
		genre: string;
		authorName: string;
		packInfo: string;
	};
	picture: File;
	audio: File;
};

export type Pack = {
    _id: string;
    genre: string;
    authorName: string;
    packInfo: string;
    text: string;
    listens: number;
    picture: string;
    audio: string;
    pause: boolean;
    samples: Samples[];
    userId: string;
}


