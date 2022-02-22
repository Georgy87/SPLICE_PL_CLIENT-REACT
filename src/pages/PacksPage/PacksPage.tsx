import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGetPacks, fetchSearchPacks } from '../../store/slices/pack/packSlice';
import { Player } from '../../components/Player/Player';
import SearchInput from '../../components/SearchInput/SearchInput';
import { PackItem } from '../../components/PackItem/PackItem';
import { Pack } from '../../store/slices/pack/types';
import { selectPacks } from '../../store/selectors/packsSelectors';

import { Loader } from '../../components/Loader/Loader';

import styles from './PacksPage.module.scss';

type PropsType = {
	pageName?: 'main-packs' | 'user-packs';
};

export const PacksPage: React.FC<PropsType> = ({ pageName }) => {
	const packs = useSelector(selectPacks);

	const [value, setValue] = useState<string>('');

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchGetPacks());
	}, []);

	const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation();
		setValue(e.target.value);
		dispatch(fetchSearchPacks(value));
	};

	return (
		<>
			<SearchInput onChangeValue={onChangeValue} setValue={setValue} value={value} />
			<div className={styles.root}>
				{packs ? packs.map((pack: Pack, index: number) => (
					<div className={styles.packCardContainer} key={pack._id}>
						<PackItem pack={pack} id={pack._id} index={index} />
					</div>
				)) : <Loader />}
				<Player />
			</div>
		</>
	);
};
