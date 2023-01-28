import {
  packCreatePackResponseDto,
  packGetPackResponseDto,
  packGetPacksResponseDto,
  packGetUserPacksResponseDto,
  packSearchPacksResponseDto,
} from '@services/mapping/pack';
import { authedHttpFetch } from '@services/base/authedJsonFetch/authedHttpFetch';

import {
  CreatePackRequestDto,
  CreatePackResponseDto,
  GetPackRequestParams,
  GetPackResponseDto,
  GetPacksRequestParams,
  GetPacksResponseDto,
  GetUserPacksResponseDto,
  SearchPacksRequestParams,
  SearchPacksResponseDto,
} from './types';

import { ENDPOINTS } from '@/constans/endpoints';

export const packsApi = {
  createPack(data: CreatePackRequestDto) {
    const { promise, cancel } = authedHttpFetch<CreatePackResponseDto, CreatePackRequestDto>(ENDPOINTS.packs.create(), {
      method: 'POST',
      data,
    });
    return {
      promise: promise.then(packCreatePackResponseDto),
      cancel,
    };
  },

  getPacks(data: number) {
    const { promise, cancel } = authedHttpFetch<GetPacksResponseDto, undefined, GetPacksRequestParams>(
      ENDPOINTS.packs.getPacks(),
      {
        method: 'GET',
        params: {
          page: data,
        },
      },
    );
    return {
      promise: promise.then(packGetPacksResponseDto),
      cancel,
    };
  },

  getPack(data: GetPackRequestParams) {
    const { promise, cancel } = authedHttpFetch<GetPackResponseDto, undefined, GetPackRequestParams>(
      ENDPOINTS.packs.getPack(),
      {
        method: 'GET',
        params: {
          packId: data.packId,
          tag: String(data.tag),
        },
      },
    );
    return {
      promise: promise.then(packGetPackResponseDto),
      cancel,
    };
  },

  getUserPacks() {
    const { promise, cancel } = authedHttpFetch<GetUserPacksResponseDto>(ENDPOINTS.packs.getUserPacks(), {
      method: 'GET',
    });
    return {
      promise: promise.then(packGetUserPacksResponseDto),
      cancel,
    };
  },

  searchPacks(data: string) {
    const { promise, cancel } = authedHttpFetch<SearchPacksResponseDto, undefined, SearchPacksRequestParams>(
      ENDPOINTS.packs.searchPacks(),
      {
        method: 'GET',
        params: {
          search: data,
        },
      },
    );
    return {
      promise: promise.then(packSearchPacksResponseDto),
      cancel,
    };
  },
};
