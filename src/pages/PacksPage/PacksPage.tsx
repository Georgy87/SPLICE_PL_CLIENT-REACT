import { ChangeEvent, FC, useEffect, useRef, useState, MutableRefObject, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Player } from '@components/Player';
import { SearchInput } from '@components/SearchInput';
import { selectPacks, selectTotalPages, selectLoading } from '@selectors/packsSelectors';
import { VideoPlayer } from '@components/VideoPlayer';
import { fetchGetPacks, fetchSearchPacks } from '@slices/pack/actions';
import { setDefaultPackState, setLoading } from '@slices/pack/packSlice';
import { useAppDispatch } from '@store/types';
import { intersectionObserverService } from '@services/intersectionObserverService';
import { useDebounce } from '@hooks/useDebounce';
import { PackListItem } from '@components/PackListItem/PackListItem';

import styles from './PacksPage.module.scss';

type PropsType = {
    pageName?: 'main-packs' | 'user-packs';
};

export const PacksPage: FC<PropsType> = () => {
    const loading = useSelector(selectLoading);
    const totalPages = useSelector(selectTotalPages);
    const packs = useSelector(selectPacks);

    let pagesCounter: number = 1;

    const pageEnd = useRef() as MutableRefObject<HTMLInputElement>;

    const [pageNumber, setPageNumber] = useState<number>(0);
    const [value, setValue] = useState<string>('');

    const dispatch = useAppDispatch();

    const onLongMore = () => {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
    };

    useEffect(() => {
        dispatch(fetchGetPacks(pageNumber));
        dispatch(setLoading(true));
    }, [pageNumber]);

    useEffect(() => {
        dispatch(setDefaultPackState());
    }, []);

    const onChangeValue = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            e.stopPropagation();
            setValue(e.target.value);
            debouncedCallback(e.target.value);
        },
        [value]
    );

    const setDefultValue = useCallback(
        (value: string) => {
            dispatch(fetchSearchPacks(value));
        },
        [value]
    );

    const debouncedCallback = useDebounce((value: string) => {
        dispatch(fetchSearchPacks(value));
    }, 500);

    useEffect(() => {
        if (loading) {
            intersectionObserverService.isObserver(totalPages, pageEnd, pagesCounter, onLongMore);
        }
    }, [loading]);

    return (
        <div className={styles.root} data-testid="packs-page">
            <VideoPlayer />
            <SearchInput onChangeValue={onChangeValue} setDefultValue={setDefultValue} value={value} />
            <PackListItem pageEnd={pageEnd} packs={packs} />
            <Player />
        </div>
    );
};
