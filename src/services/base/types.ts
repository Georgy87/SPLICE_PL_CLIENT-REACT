import { AxiosResponse, Canceler, Method } from 'axios';

export const AUTH_TOKEN_TYPE = 'Bearer';

export enum HTTP_HEADER_NAME {
    ACCEPT = 'Accept',
    CONTENT_TYPE = 'Content-Type',
    AUTHORIZATION = 'Authorization',
    CACHE_CONTROL = 'Cache-Control',
}

export enum HTTP_STATUS_CODE {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    GONE = 410,
    UNEXPECTED_ERROR = 500,
}

export enum HTTP_CONTENT_TYPE {
    JSON = 'application/json',
    X_WWW_FORM_URLENCODED = 'application/x-www-form-urlencoded',
    FORM_DATA = 'multipart/form-data',
}

export enum HTTP_CACHE_CONTROL {
    NO_CACHE = 'no-cache',
}

export type AuthedHttpFetchHeaders = HttpFetchHeaders;

export type AuthedHttpFetchOwnHeaders = {
    [HTTP_HEADER_NAME.AUTHORIZATION]: string;
};

export type AuthedHttpFetchParams<
    D = undefined,
    P = undefined,
    H extends AuthedHttpFetchHeaders = undefined
> = HttpFetchParams<D, P, H>;

export type AuthedHttpFetchResult<R> = HttpFetchResult<R>;



export type AuthedJsonFetchHeaders = AuthedHttpFetchHeaders;



export type AuthedJsonFetchResult<R> = JsonFetchResult<R>;

export type HttpFetchHeaders = undefined | Record<string, string>;

export type HttpFetchOnUploadProgress = (progress: number, event: ProgressEvent) => void;

export type HttpFetchParams<D = undefined, P = undefined, H extends HttpFetchHeaders = undefined> = {
    method?: Method;
    headers?: H;
    params?: P;
    data?: D;
    onUploadProgress?: HttpFetchOnUploadProgress;
};

export type HttpFetchResponse<R> = AxiosResponse<R>;

export type HttpFetchResult<R> = {
    promise: Promise<HttpFetchResponse<R>>;
    cancel: Canceler;
};

export type JsonFetchOwnHeaders = {
    [HTTP_HEADER_NAME.ACCEPT]: string;
    [HTTP_HEADER_NAME.CONTENT_TYPE]: string;
};

export type JsonFetchHeaders = HttpFetchHeaders;

export type JsonFetchParams<D = undefined, P = undefined, H extends JsonFetchHeaders = undefined> = HttpFetchParams<
    D,
    P,
    H
>;

export type JsonFetchResult<R> = {
    promise: Promise<R>;
    cancel: Canceler;
};

// export type AuthedJsonFetchParams<
//     D = undefined,
//     P = undefined,
//     H extends AuthedJsonFetchHeaders = undefined
// > = AuthedHttpFetchParams<D, P, H>;

export type AuthedJsonFetchOwnHeaders = JsonFetchOwnHeaders;