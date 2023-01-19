import { Samples } from '@/store/slices/samples/types';
import { User } from '@store/slices/user/types';

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


