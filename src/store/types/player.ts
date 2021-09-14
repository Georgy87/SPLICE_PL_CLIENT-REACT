import { Pack } from "./packs";

export interface PlayerSliceState {
    active: null | Pack;
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
    audio: any;
    test: string;
}

export enum PlayerActionTypes {
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    SET_ACTIVE = "SET_ACTIVE",
    SET_DURATION = "SET_DURATION",
    SET_CURRENT_TIME = "SET_CURRENT_TIME",
    SET_VOLUME = "SET_VOLUME",
    SET_AUDIO = "SET_AUDIO",
}

interface PlayAction {
    type: PlayerActionTypes.PLAY
}
interface PauseAction {
    type: PlayerActionTypes.PAUSE
}
interface SetActiveAction {
    type: PlayerActionTypes.SET_ACTIVE,
    payload: Pack;
}
interface SetDurationAction {
    type: PlayerActionTypes.SET_DURATION,
    payload: number;
}
interface SetVolumeAction {
    type: PlayerActionTypes.SET_VOLUME,
    payload: number;
}
interface SetCurrentTimeAction {
    type: PlayerActionTypes.SET_CURRENT_TIME,
    payload: number;
}

type SetAudio = {
    type: PlayerActionTypes.SET_AUDIO,
    payload: any;
}

export type PlayerAction =
    PlayAction
    | PauseAction
    | SetActiveAction
    | SetDurationAction
    | SetVolumeAction
    | SetCurrentTimeAction
    | SetAudio;