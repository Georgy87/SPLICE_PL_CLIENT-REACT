import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Player } from '../../components/Player/Player';
import SearchInput from '../../components/SearchInput/SearchInput';
import { PackItem } from '../../components/PackItem/PackItem';
import { Pack } from '../../store/slices/pack/types';
import { selectPacks } from '../../store/selectors/packsSelectors';
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer';
import { Loader } from '../../components/Loader/Loader';
import { fetchGetPacks, fetchSearchPacks } from '../../store/slices/pack/actions';

import styles from './PacksPage.module.scss';

type PropsType = {
	pageName?: 'main-packs' | 'user-packs';
};

export const PacksPage: React.FC<PropsType> = () => {
	const packs = useSelector(selectPacks);

	const [value, setValue] = useState<string>('');

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchGetPacks());
	}, []);

	const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation();
		setValue(e.target.value);
		dispatch(fetchSearchPacks(e.target.value));
	};

	return (
		<div className={styles.root}>
			<VideoPlayer />
			<SearchInput onChangeValue={onChangeValue} setValue={setValue} value={value} />
			<div className={styles.root}>
				{packs?.length ? packs.map((pack: Pack, index: number) => (
					<div className={styles.packCardContainer} key={pack._id}>
						<PackItem pack={pack} id={pack._id} index={index} />
					</div>
				)) : <Loader />}
				<Player />
			</div>
		</div>
	);
};
