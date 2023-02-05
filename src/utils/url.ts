import { REGEX } from '@config/regex';

export const ensureUrlIsExternal = (url: string): boolean => {
  return REGEX.PROTOCOL.test(url);
};
