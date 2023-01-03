export enum ERROR_CODE {
    AUTH_ERROR = '401',
}

export const ERROR_TEXTS_BY_CODE = {
    [ERROR_CODE.AUTH_ERROR]: 'Ошибка авторизации',
};

class ErrorsService {
    getMessageTextByCode(message: string): string {
        const code = message.replace(/[^0-9]/g, '');
        if (code in ERROR_TEXTS_BY_CODE) {
            return ERROR_TEXTS_BY_CODE[code as keyof typeof ERROR_TEXTS_BY_CODE];
        }
        return code;
    }
}

export const errorsService = new ErrorsService();
