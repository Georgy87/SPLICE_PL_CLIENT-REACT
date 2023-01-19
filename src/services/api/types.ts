import { Samples } from '@/store/slices/samples/types';
import { User } from '@slices/user/types';

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

export type RegistrationRequestDto = Pick<User, 'email' | 'fullname' | 'password'>;
