import { MutableRefObject } from 'react';
import React from 'react';
import { IIntersectionObserver } from './types';

class IntersectionObserverService implements IIntersectionObserver {
    public isObserver(
        totalPages: number,
        pageEnd: MutableRefObject<HTMLInputElement>,
        pagesCounter: number,
        onLongMore: () => void
    ) {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    pagesCounter++;
                    onLongMore();
                    if (pagesCounter >= totalPages) {
                        observer.unobserve(pageEnd.current);
                    }
                }
            },
            { threshold: 1 }
        );
        if (pageEnd?.current) {
            observer.observe(pageEnd.current);
        }
    }
}

export const intersectionObserverService = new IntersectionObserverService();
