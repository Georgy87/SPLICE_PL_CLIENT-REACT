import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpFetchHeaders, HttpFetchParams, HttpFetchResult, HTTP_CACHE_CONTROL, HTTP_HEADER_NAME } from '../types';

export const httpOwnHeaders = {
    [HTTP_HEADER_NAME.CACHE_CONTROL]: HTTP_CACHE_CONTROL.NO_CACHE,
};

export const httpFetch = <R, D = undefined, P = undefined, H extends HttpFetchHeaders = undefined>(
    url: string,
    params?: HttpFetchParams<D, P, H>
): HttpFetchResult<R> => {
    const nextParams = {
        ...params,
        headers: {
            ...httpOwnHeaders,
            ...params?.headers,
        },
    };

    const source = axios.CancelToken.source();
    const { token: cancelToken } = source;

    const config: AxiosRequestConfig = {
        cancelToken,
        //   paramsSerializer: (params) => encode(omitNullish(params)),
        ...nextParams,
        url,
        onUploadProgress: (event) => {
            if (!nextParams?.onUploadProgress) {
                return;
            }

            const progress = Math.round((event.loaded * 100) / event.total);
            nextParams?.onUploadProgress?.(progress, event);
        },
    };

    return {
        promise: axios //
            .request<R>(config)
            .catch((error: AxiosError<R, D>): never => {
                if (axios.isCancel(error)) {
                    console.warn(`Request canceled: ${error.message}`);
                    throw error.response;
                }

                throw error.response;
            }),
        // .catch((response: undefined | AxiosResponse<R, D>) => {
        // //   if (!response) {
        // //     throw new BaseNetError(
        // //       HTTP_STATUS_CODE.UNEXPECTED_ERROR,
        // //       'Response is empty',
        // //       unexpectedNetErrorBody
        // //     );
        // //   }

        // //   const { status, statusText, data } = response;

        // //   throw new BaseNetError(status, statusText, netErrorBodyFromDto(data));
        // }),
        cancel: source.cancel,
    };
};
