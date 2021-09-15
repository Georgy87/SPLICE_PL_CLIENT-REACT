import { RootState } from '../types';

export const selectAudio = (state: RootState) => state.player.audio;
