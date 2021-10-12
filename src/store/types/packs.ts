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

export type PacksSliceState = {
    packs: Pack[] | [];
}
