import { ChangeEvent, FC, useEffect, useRef, useState, MutableRefObject, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Player } from '@components/Player';
import { SearchInput } from '@components/SearchInput';
import { selectPacks, selectTotalPages, selectPackLoading } from '@selectors/packsSelectors';
import { VideoPlayer } from '@components/VideoPlayer';
import { fetchGetPacks, fetchSearchPacks } from '@slices/pack/actions';
import { setDefaultPackState } from '@slices/pack/packSlice';
import { useAppDispatch } from '@store/types';
import { intersectionObserverService } from '@services/intersectionObserverService';
import { useDebounce } from '@hooks/useDebounce';
import { PackListItem } from '@components/PackListItem/PackListItem';

import styles from './PacksPage.module.scss';
import { PACKS_SKELETON_ITEMS } from '@/constans/skeleton';
import { VerticalSkeletonLayout } from '@/layouts';

type PropsType = {
    pageName?: 'main-packs' | 'user-packs';
};

export const PacksPage: FC<PropsType> = () => {
    const loading = useSelector(selectPackLoading);
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

    const debouncedCallback = useDebounce((value: string) => {
        dispatch(fetchSearchPacks(value));
    }, 500);

    // TODO add packs for app

    // useEffect(() => {
    //     if (loading && totalPages !== pagesCounter) {  
    //         intersectionObserverService.isObserver(totalPages, pageEnd, pagesCounter, onLongMore);
    //     }
    // }, [loading]);

    return (
        <div className={styles.root} data-testid="packs-page">
            <VideoPlayer />
            <SearchInput onChangeValue={onChangeValue} value={value} />
            <PackListItem pageEnd={pageEnd} packs={packs} />
            <Player />
        </div>
    );
};
