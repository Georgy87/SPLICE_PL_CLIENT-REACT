import { Samples } from '../samples/types';

export type PacksSliceState = {
    packs: Pack[] | [];
    packProfile: null | PackProfile;
    userPacks: Pack[] | [];
    tag: string | null;
    loading: boolean;
    totalPages: number;
};

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
    name: string;
    packInfo: string;
    listens: number;
    picture: string;
    audio: string;
    userId: string;
    viewsData: ChartDataType;
};

export type PackProfile = {
    _id: string;
    genre: string;
    name: string;
    packInfo: string;
    listens: number;
    picture: string;
    audio: string;
    samples: Samples[];
    userId: string;
    viewsData: ChartDataType;
};

export type MountType = {
    January: { x: number, y: number },
    February: { x: number, y: number },
    March: { x: number, y: number },
    April: { x: number, y: number },
    May: { x: number, y: number },
    June: { x: number, y: number },
    July: { x: number, y: number },
    August: { x: number, y: number },
    September: { x: number, y: number },
    October: { x: number, y: number },
    November: { x: number, y: number },
    December: { x: number, y: number },
}

export type ChartDataType = {
    [year: string]: MountType;
}