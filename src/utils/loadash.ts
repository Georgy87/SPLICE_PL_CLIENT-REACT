import { default as omitBy } from 'lodash/omitBy';

export const isNullable = (value: unknown): value is null | undefined => {
    return value == null;
};

export const omitNullish = <T extends object>(object: T): Partial<T> => {
    return omitBy<T>(object, isNullable);
};
