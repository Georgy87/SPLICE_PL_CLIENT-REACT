import { useCallback, useRef } from 'react';

export const useDebounce = (callback: any, delay: number) => {
    const timer = useRef<NodeJS.Timeout>();

    const debouncedCallback = useCallback(
        (...args) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }

            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );

    return debouncedCallback;
};
