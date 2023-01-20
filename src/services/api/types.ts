import { Pack, PackProfile } from '@/store/slices/pack/types';
import { Samples } from '@/store/slices/samples/types';
import { User } from '@slices/user/types';

// User types

export type RegistrationRequestDto = Pick<User, 'email' | 'fullname' | 'password'>;

export type AuthResponseDto = {
    user: User;
    token: string;
};

export type LoginResponseDto = {
    user: User;
    token: string;
    message: string;
};

export type LoginRequestDto = {
    email: string;
    password: string;
};

export type UpdateEmailRequestDto = {
    email?: string;
};

export type UpdateEmailResponseDto = {
    user: User;
};

export type UpdateFullNameRequestDto = {
    fullname?: string;
};

export type UpdateFullNameResponseDto = UpdateEmailResponseDto;

export type LikedSamplesResponseDto = {
    samples: Samples[];
};

export type UpdateAvatarRequestDto = FormData;

export type UpdateAvatarResponseDto = string;

// Packs types

export type CreatePackRequestDto = FormData;

export type CreatePackResponseDto = Pack[];

export type GetPacksRequestParams = {
    page: number;
};

export type GetPacksResponseDto = {
    packs: Pack[];
    totalPage: number;
};

export type GetPackRequestParams = {
    packId: string;
    tag: string | null;
};

export type GetPackResponseDto = PackProfile;

export type GetUserPacksResponseDto = Pack[];

export type SearchPacksResponseDto = Pack[];

export type  SearchPacksRequestParams = {
    search: string;
};

