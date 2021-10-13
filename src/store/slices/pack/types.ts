export type PacksSliceState = {
    packs: Pack[] | [];
}

export type createPackType = {
	info: {
		trackName: string;
		authorName: string;
		packInfo: string;
	};
	picture: File;
	audio: File;
};

export type Pack = {
    _id: string;
    trackName: string;
    authorName: string;
    packInfo: string;
    text: string;
    listens: number;
    picture: string;
    audio: string;
    pause: boolean;
}


