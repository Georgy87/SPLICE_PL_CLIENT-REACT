import { authedHttpFetch } from '@/api/base/authedJsonFetch/authedHttpFetch';
import { sampleCreateSampleResponseDto } from '@/api/mapping/sample';

import {
  DeleteLikeSampleRequestParams,
  SetLikeSampleRequestParams,
  SetSampleCategoryRequestParams,
  SetSampleBpmRequestParams,
  CreateSampleRequestParams,
  CreateSampleResponseDto,
  CreateSampleRequestDto,
} from './types';

import { ENDPOINTS } from '@/constans/endpoints';

export const samplesApi = {
  create(params: CreateSampleRequestParams, data: CreateSampleRequestDto) {
    const { packId, fileId } = params;
    const { promise, cancel } = authedHttpFetch<
      CreateSampleResponseDto,
      CreateSampleRequestDto,
      CreateSampleRequestParams
    >(ENDPOINTS.samples.create(), {
      method: 'POST',
      data,
      params: {
        packId,
        fileId,
      },
    });
    return {
      promise: promise.then(sampleCreateSampleResponseDto),
      cancel,
    };
  },

  setLike(data: SetLikeSampleRequestParams) {
    const { sampleId } = data;
    authedHttpFetch<undefined, undefined, SetLikeSampleRequestParams>(ENDPOINTS.samples.setLike(), {
      method: 'POST',
      params: {
        sampleId,
      },
    });
  },

  deleteLike(data: DeleteLikeSampleRequestParams) {
    const { sampleId } = data;
    authedHttpFetch<undefined, undefined, DeleteLikeSampleRequestParams>(ENDPOINTS.samples.deleteLike(), {
      method: 'DELETE',
      params: {
        sampleId,
      },
    });
  },

  setSampleCategory(data: SetSampleCategoryRequestParams) {
    const { sampleId, category } = data;
    authedHttpFetch<undefined, undefined, SetSampleCategoryRequestParams>(ENDPOINTS.samples.setSampleCategory(), {
      method: 'POST',
      params: {
        sampleId,
        category,
      },
    });
  },

  setSampleBpm(data: SetSampleBpmRequestParams) {
    const { sampleId, bpm } = data;
    authedHttpFetch<undefined, undefined, SetSampleBpmRequestParams>(ENDPOINTS.samples.setSampleBpm(), {
      method: 'POST',
      params: {
        sampleId,
        bpm,
      },
    });
  },
};
