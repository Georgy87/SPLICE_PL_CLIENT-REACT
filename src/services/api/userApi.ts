import { authedHttpFetch } from '@services/base/authedJsonFetch/authedHttpFetch';
import {
  userAuthResponseDto,
  userLikedSamplesResponseDto,
  userLoginResponseDto,
  userUpdateAvatarResponseDto,
  userUpdateEmailResponseDto,
} from '@services/mapping/user';

import {
  AuthResponseDto,
  LikedSamplesResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  RegistrationRequestDto,
  UpdateAvatarRequestDto,
  UpdateAvatarResponseDto,
  UpdateEmailRequestDto,
  UpdateEmailResponseDto,
  UpdateFullNameRequestDto,
  UpdateFullNameResponseDto,
} from './types';

import { ENDPOINTS } from '@/constans/endpoints';

export const userApi = {
  registration(data: RegistrationRequestDto) {
    authedHttpFetch<null, RegistrationRequestDto>(ENDPOINTS.user.registration(), {
      method: 'POST',
      data,
    });
  },

  auth() {
    const { promise, cancel } = authedHttpFetch<AuthResponseDto>(ENDPOINTS.user.auth(), { method: 'GET' });
    return {
      promise: promise.then(userAuthResponseDto),
      cancel,
    };
  },

  login(data: LoginRequestDto) {
    const { promise, cancel } = authedHttpFetch<LoginResponseDto, LoginRequestDto>(ENDPOINTS.user.login(), {
      method: 'POST',
      data,
    });
    return {
      promise: promise.then(userLoginResponseDto),
      cancel,
    };
  },

  updateEmail(data?: UpdateEmailRequestDto) {
    const { promise, cancel } = authedHttpFetch<UpdateEmailResponseDto, UpdateEmailRequestDto>(
      ENDPOINTS.user.updateEmail(),
      {
        method: 'PUT',
        data,
      },
    );
    return {
      promise: promise.then(userUpdateEmailResponseDto),
      cancel,
    };
  },

  updateFullName(data: UpdateFullNameRequestDto) {
    const { promise, cancel } = authedHttpFetch<UpdateFullNameResponseDto, UpdateFullNameRequestDto>(
      ENDPOINTS.user.updateFullName(),
      {
        method: 'PUT',
        data,
      },
    );
    return {
      promise: promise.then(userUpdateEmailResponseDto),
      cancel,
    };
  },

  getLikedSamples() {
    const { promise, cancel } = authedHttpFetch<LikedSamplesResponseDto>(ENDPOINTS.user.likedSamples(), {
      method: 'GET',
    });

    return {
      promise: promise.then(userLikedSamplesResponseDto),
      cancel,
    };
  },

  updateAvatar(data: UpdateAvatarRequestDto) {
    const { promise, cancel } = authedHttpFetch<UpdateAvatarResponseDto, UpdateAvatarRequestDto>(
      ENDPOINTS.user.updateAvatar(),
      { method: 'PUT', data },
    );
    return {
      promise: promise.then(userUpdateAvatarResponseDto),
      cancel,
    };
  },
};
