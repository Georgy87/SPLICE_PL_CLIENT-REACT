import { PacksSliceState } from './slices/pack/types';
import { SampleSliceState } from './slices/samples/types';
import { UserSliceState } from './slices/user/types';

export type RootState = {
	packs: PacksSliceState;
	user: UserSliceState;
	samples: SampleSliceState;
};
