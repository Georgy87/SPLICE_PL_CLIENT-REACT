import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	fetchGetPacks,
	fetchSearchPacks,
	setDefaultPackState,
} from '../../store/slices/pack/packSlice';
import { Player } from '../../components/Player/Player';
import SearchInput from '../../components/SearchInput/SearchInput';
import { PackItem } from '../../components/PackItem/PackItem';
import { Pack } from '../../store/slices/pack/types';
import { selectPacks, selectUserPacks } from '../../store/selectors/packsSelectors';
import { selectSamplesFiles } from '../../store/selectors/samplesSelectors';

import styles from './PacksPage.module.scss';
import { CanvasRender } from '../../components/Canvas/Canvas';

type PropsType = {
	pageName?: 'main-packs' | 'user-packs';
};

export const PacksPage: React.FC<PropsType> = ({ pageName }) => {
	const packs = useSelector(selectPacks);
	const userPacks = useSelector(selectUserPacks);

	const [value, setValue] = useState<string>('');

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchGetPacks());
		dispatch(setDefaultPackState());
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
				{pageName === 'main-packs' &&
					packs.map((pack: Pack, index: number) => (
						<>
							{!pack.update && (
								<div className={styles.packCardContainer}>
									<PackItem
										key={pack._id}
										pack={pack}
										id={pack._id}
										pageName={pageName}
										index={index}
									/>
								</div>
							)}
						</>
					))}
				{pageName === 'user-packs' &&
					userPacks.map((pack: Pack, index: number) => (
						<>
							<div className={styles.packCardContainer} key={index}>
								<PackItem
									key={pack._id}
									pack={pack}
									id={pack._id}
									pageName={pageName}
									index={index}
								/>
							</div>
						</>
					))}
				<Player />
				<CanvasRender />
			</div>
		</>
	);
};
