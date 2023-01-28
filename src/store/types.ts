import { useDispatch } from 'react-redux';

import { PacksSliceState } from './slices/pack/types';
import { SampleSliceState } from './slices/samples/types';
import { UserSliceState } from './slices/user/types';

import { store } from '@/store';

export type RootState = {
  packs: PacksSliceState;
  user: UserSliceState;
  samples: SampleSliceState;
};

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
