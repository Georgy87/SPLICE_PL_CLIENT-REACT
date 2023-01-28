import { createContext } from 'react';

import { PlayerStateType } from './types';

export type ContextProps = [PlayerStateType, (state: any) => void];

export const defaultPlayerState = {
  audioPlayer: new Audio(),
  packs: [],
  samples: [],
  currentTrackIndex: null,
  isPlaying: false,
  currentTrackId: null,
  active: null,
  duration: 0,
  currentTime: 0,
  packCurrentTime: 0,
  volume: 90,
  percent: 0,
  packPercent: 0,
  onload: false,
};

export const PlayerContext = createContext<ContextProps>([defaultPlayerState, () => {}]);
