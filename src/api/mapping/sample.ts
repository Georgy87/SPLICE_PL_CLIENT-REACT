import { CreateSampleResponseDto } from '@/api/types';

import { CreateSampleResponseData } from './types';

export const sampleCreateSampleResponseDto = (dto: CreateSampleResponseData): CreateSampleResponseDto => {
  return dto.data;
};
