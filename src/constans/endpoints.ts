import { BASE_URL } from './env';

export const ENDPOINTS = {
  user: {
    registration: (): string => `${BASE_URL}/registration`,
    auth: (): string => `${BASE_URL}/auth`,
    login: (): string => `${BASE_URL}/login`,
    updateEmail: (): string => `${BASE_URL}/users/email`,
    updateFullName: (): string => `${BASE_URL}/users/fullname`,
    likedSamples: (): string => `${BASE_URL}/users/liked-samples`,
    updateAvatar: (): string => `${BASE_URL}/users/avatar`,
  },
  packs: {
    create: (): string => `${BASE_URL}/packs/pack`,
    getPacks: (): string => `${BASE_URL}/packs`,
    getPack: (): string => `${BASE_URL}/packs/pack`,
    getUserPacks: (): string => `${BASE_URL}/packs/user-packs`,
    searchPacks: (): string => `${BASE_URL}/packs/search-packs`,
  },
  samples: {
    create: (): string => `${BASE_URL}/samples`,
    setLike: (): string => `${BASE_URL}/samples/like`,
    deleteLike: (): string => `${BASE_URL}/samples/like`,
    setSampleCategory: (): string => `${BASE_URL}/samples/category`,
    setSampleBpm: (): string => `${BASE_URL}/samples/bpm`,
  },
};
