import {
    UpdateEmailResponseDto,
    UpdateFullNameResponseDto,
    AuthResponseDto,
    LoginResponseDto,
    LikedSamplesResponseDto,
    UpdateAvatarResponseDto,
} from '@services/api/types';

import {
    AuthResponseData,
    LikedSamplesResponseData,
    LoginResponseData,
    UpdateAvatarResponseData,
    UpdateEmailResponseData,
    UpdateFullNameResponseData,
} from './types';

export const userAuthResponseDto = (dto: AuthResponseData): AuthResponseDto => {
    return dto.data;
};

export const userLoginResponseDto = (dto: LoginResponseData): LoginResponseDto => {
    return dto.data;
};

export const userUpdateEmailResponseDto = (dto: UpdateEmailResponseData): UpdateEmailResponseDto => {
    return dto.data;
};

export const userUpdateFullNameResponseDto = (dto: UpdateFullNameResponseData): UpdateFullNameResponseDto => {
    return dto.data;
};

export const userLikedSamplesResponseDto = (dto: LikedSamplesResponseData): LikedSamplesResponseDto => {
    return dto.data;
};

export const userUpdateAvatarResponseDto = (dto: UpdateAvatarResponseData): UpdateAvatarResponseDto => {
    return dto.data;
};
