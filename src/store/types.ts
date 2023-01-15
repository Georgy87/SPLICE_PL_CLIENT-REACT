import { useDispatch } from 'react-redux';

import { store } from '@/store';
import { PacksSliceState } from './slices/pack/types';
import { SampleSliceState } from './slices/samples/types';
import { UserSliceState } from './slices/user/types';

export type RootState = {
	packs: PacksSliceState;
	user: UserSliceState;
	samples: SampleSliceState;
};

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()