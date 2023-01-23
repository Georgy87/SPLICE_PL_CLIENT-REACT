import { Samples } from '../samples/types';

export type User = {
    password: string;
	avatar: string;
	confirm_hash: string;
	createdAt: string;
	email: string;
	fullname: string;
	updatedAt: string;
	_id: string;
};

export type UserSliceState = {
	user: User | null;
	token: string | null;
	isAuth: boolean;
	samples: Samples[] | null;
	avatar: null | string;
	errorMessage: null | string;
	loading: boolean;
};
