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

// export enum TrackActionTypes {
//     FETCH_TRACKS = 'FETCH_TRACKS',
//     FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
// }

// interface FetchTracksAction {
//     type: TrackActionTypes.FETCH_TRACKS;
//     payload:  Pack[];
// }

// interface FetchTracksErrorAction {
//     type: TrackActionTypes.FETCH_TRACKS_ERROR;
//     payload: string;
// }

// export type TrackAction = FetchTracksAction | FetchTracksErrorAction;