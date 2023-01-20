import { Pack, PackProfile } from '@store/slices/pack/types';
import { Samples } from '@store/slices/samples/types';
import { User } from '@store/slices/user/types';

// User

export type AuthResponseData = {
    data: {
        user: User;
        token: string;
    };
};

export type LoginResponseData = {
    data: {
        message: string;
        user: User;
        token: string;
    };
};

export type UpdateEmailResponseData = {
    data: {
        user: User;
    };
};

export type UpdateFullNameResponseData = UpdateEmailResponseData;

export type LikedSamplesResponseData = {
    data: {
        samples: Samples[];
    };
};

export type UpdateAvatarResponseData = {
    data: string;
};

// Packs

export type CreatePackResponseData = {
    data: Pack[];
};

export type GetPacksResponseData = {
    data: { packs: Pack[]; totalPage: number };
};

export type GetPackResponseData = {
    data: PackProfile;
};

export type GetUserPacksResponseData = {
    data: Pack[];
};

export type SearchPacksResponseData = {
    data: Pack[];
};
