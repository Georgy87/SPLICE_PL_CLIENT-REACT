import { CreateSampleResponseDto } from '@services/api/types';

import { CreateSampleResponseData } from './types';

export const sampleCreateSampleResponseDto = (dto: CreateSampleResponseData): CreateSampleResponseDto => {
  return dto.data;
};
