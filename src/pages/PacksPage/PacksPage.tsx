import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Player } from '../../components/Player/Player';
import SearchInput from '../../components/SearchInput/SearchInput';
import { PackItem } from '../../components/PackItem/PackItem';
import { Pack } from '../../store/slices/pack/types';
import { selectPacks, selectTotalPages } from '../../store/selectors/packsSelectors';
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer';
import { Loader } from '../../components/Loader/Loader';
import { fetchGetPacks, fetchSearchPacks } from '../../store/slices/pack/actions';
import { selectLoading } from '../../store/selectors/packsSelectors';
import { setDefaultPackState, setLoading } from '../../store/slices/pack/packSlice';

import styles from './PacksPage.module.scss';

type PropsType = {
	pageName?: 'main-packs' | 'user-packs';
};

export const PacksPage: React.FC<PropsType> = () => {
	const packs = useSelector(selectPacks);
	const loading = useSelector(selectLoading);
	const totalPages = useSelector(selectTotalPages);
	
	let pagesCounter: number = 1;

	const pageEnd = useRef() as React.MutableRefObject<HTMLInputElement>;

	const [pageNumber, setPageNumber] = useState<number>(0);
	const [value, setValue] = useState<string>('');

	const dispatch = useDispatch();

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
		dispatch(fetchSearchPacks(e.target.value));
	};

	useEffect(() => {
		if (loading) {
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
				{ threshold: 1 },
			);

			if (pageEnd.current) {
				observer.observe(pageEnd.current);
			}
		}
	}, [loading]);

	return (
		<div className={styles.root} data-testid='packs-page'>
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
					<Loader />
				)}
				<div className={styles.loaderPagination} ref={pageEnd}>
					{''}
				</div>
				<Player />
			</div>
		</div>
	);
};
