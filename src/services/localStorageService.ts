import { ILocalStorage, ILocalStorageConstructor, ILocalStorageCustomStorage, Key } from './types';

/**
 * Local storage
 *
 * Accessing localStorage may throw an error depending on browser / device /
 * browsing mode. For instance, writing to LS throws in Safari (iOS / OS X) in
 * private mode. We ignore all storage errors.
 */

const LocalStorage: ILocalStorageConstructor = class LocalStorage implements ILocalStorage {
  private readonly _storage: ILocalStorageCustomStorage;

  constructor() {
    try {
      this._storage = localStorage;
    } catch (err) {
      this._storage = {};
      console.warn('Failed to initialize localStorage. LocalStorage initialized as {}');
    }
  }

  read(key: string) {
    if (typeof this._storage[key] !== 'string') {
      return undefined;
    }

    try {
      return this._storage[key];
    } catch (err) {
      console.warn('Failed to read from storage:', err);

      return undefined;
    }
  }

  write<T>(key: Key, value: T): void {
    try {
      this._storage[key] = value;
    } catch (err) {
      console.warn('Failed to save to storage:', err);
    }
  }

  remove(key: Key): void {
    delete this._storage[key];
  }
};

export const localStorageService = new LocalStorage();
