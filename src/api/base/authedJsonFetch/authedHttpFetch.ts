import { STORAGE_KEYS } from '@/constans/storage';
import { localStorageService } from '@services/localStorageService';
import { AUTH_TOKEN_TYPE } from '../types';
import {
  AuthedHttpFetchHeaders,
  AuthedHttpFetchOwnHeaders,
  AuthedHttpFetchParams,
  AuthedHttpFetchResult,
  HTTP_HEADER_NAME,
} from '../types';

import { httpFetch } from './httpFetch';

const _authedHttpFetch = <R, D = undefined, P = undefined, H extends AuthedHttpFetchHeaders = undefined>(
  url: string,
  params?: AuthedHttpFetchParams<D, P, H>,
): AuthedHttpFetchResult<R> => {
  const authData = localStorageService.read(STORAGE_KEYS.TOKEN);
  const accessToken = authData ?? '';

  const headers = {
    [HTTP_HEADER_NAME.AUTHORIZATION]: `${AUTH_TOKEN_TYPE} ${accessToken}`,
  };

  const nextParams = {
    ...params,
    headers: {
      ...headers,
      ...params?.headers,
    },
  };

  return httpFetch<R, D, P, AuthedHttpFetchOwnHeaders | (AuthedHttpFetchOwnHeaders & H)>(url, nextParams);
};

export const authedHttpFetch = <R, D = undefined, P = undefined, H extends AuthedHttpFetchHeaders = undefined>(
  url: string,
  params?: AuthedHttpFetchParams<D, P, H>,
): AuthedHttpFetchResult<R> => {
  const { promise, cancel } = _authedHttpFetch<R, D, P, H>(url, params);

  return {
    promise: promise,
    cancel,
  };
};
