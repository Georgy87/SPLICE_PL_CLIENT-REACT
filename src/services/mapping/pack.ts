import {
  CreatePackResponseDto,
  GetPackResponseDto,
  GetPacksResponseDto,
  GetUserPacksResponseDto,
  SearchPacksResponseDto,
} from '@services/api/types';

import {
  CreatePackResponseData,
  GetPackResponseData,
  GetPacksResponseData,
  GetUserPacksResponseData,
  SearchPacksResponseData,
} from './types';

export const packCreatePackResponseDto = (dto: CreatePackResponseData): CreatePackResponseDto => {
  return dto.data;
};

export const packGetPacksResponseDto = (dto: GetPacksResponseData): GetPacksResponseDto => {
  return dto.data;
};

export const packGetPackResponseDto = (dto: GetPackResponseData): GetPackResponseDto => {
  return dto.data;
};

export const packGetUserPacksResponseDto = (dto: GetUserPacksResponseData): GetUserPacksResponseDto => {
  return dto.data;
};

export const packSearchPacksResponseDto = (dto: SearchPacksResponseData): SearchPacksResponseDto => {
  return dto.data;
};
