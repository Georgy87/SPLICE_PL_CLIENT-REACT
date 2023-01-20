import { ChangeEvent, FC, useEffect, useRef, useState, MutableRefObject } from 'react';
import { useSelector } from 'react-redux';

import { Player } from '@components/Player';
import { SearchInput } from '@components/SearchInput';
import { PackItem } from '@components/PackItem';
import { Pack } from '@slices/pack/types';
import { selectPacks, selectTotalPages, selectLoading } from '@selectors/packsSelectors';
import { VideoPlayer } from '@components/VideoPlayer';
import { fetchGetPacks, fetchSearchPacks } from '@slices/pack/actions';
import { setDefaultPackState, setLoading } from '@slices/pack/packSlice';
import { useAppDispatch } from '@store/types';
import { intersectionObserverService } from '@services/intersectionObserverService';
import { PACKS_SKELETON_ITEMS } from '@/constans/skeleton';
import { VerticalSkeletonLayout } from '@layouts/VerticalSkeletonLayout';
import { useDebounce } from '@hooks/useDebounce';

import styles from './PacksPage.module.scss';

type PropsType = {
    pageName?: 'main-packs' | 'user-packs';
};

export const PacksPage: FC<PropsType> = () => {
    const packs = useSelector(selectPacks);
    const loading = useSelector(selectLoading);
    const totalPages = useSelector(selectTotalPages);

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

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setValue(e.target.value);
        debouncedCallback(e.target.value);
    };

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
            <SearchInput onChangeValue={onChangeValue} setValue={setValue} value={value} />
            <div className={styles.root}>
                {packs?.length ? (
                    packs.map((pack: Pack, index: number) => (
                        <div className={styles.packCardContainer} key={pack._id}>
                            <PackItem pack={pack} id={pack._id} index={index} />
                        </div>
                    ))
                ) : (
                    <>
                        {PACKS_SKELETON_ITEMS.map((_, index) => (
                            <div className={styles.packCardContainer} key={index}>
                                <VerticalSkeletonLayout />
                            </div>
                        ))}
                    </>
                )}
                <div className={styles.loaderPagination} ref={pageEnd}>
                    {''}
                </div>
                <Player />
            </div>
        </div>
    );
};
