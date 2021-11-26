import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGetPacks } from '../../store/slices/pack/packSlice';
import { Player } from '../../components/Player/Player';
import SearchInput from '../../components/SearchInput/SearchInput';
import { PackItem } from '../../components/PackItem/PackItem';
import { Pack } from '../../store/slices/pack/types';
import { selectPacks, selectUserPacks } from '../../store/selectors/packsSelectors';

import styles from './PacksPage.module.scss';

type PropsType = {
	pageName?: 'main-packs' | 'user-packs';
};

export const PacksPage: React.FC<PropsType> = ({ pageName }) => {
	const history = useHistory();
	const [value, setValue] = useState<string>('');

	const packs = useSelector(selectPacks);
	const userPacks = useSelector(selectUserPacks);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchGetPacks());
	}, []);

	const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation();
		setValue(e.target.value);
	};

	return (
		<>
			<SearchInput onChangeValue={onChangeValue} setValue={setValue} value={value} />
			<div className={styles.root}>
				{pageName === 'main-packs' &&
					packs
						?.filter((packs) => {
							if (
								packs.authorName.toLowerCase().includes(value.toLowerCase()) ||
								packs.genre.toLowerCase().includes(value.toLowerCase())
							) {
								return packs;
							}
						})
						.map((pack: Pack, index: number) => (
							<>
								<div className={styles.packCardContainer}>
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
				{pageName === 'user-packs' &&
					userPacks
						?.filter((packs) => {
							if (
								packs.authorName.toLowerCase().includes(value.toLowerCase()) ||
								packs.genre.toLowerCase().includes(value.toLowerCase())
							) {
								return packs;
							}
						})
						.map((pack: Pack, index: number) => (
							<>
								<div className={styles.packCardContainer}>
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
			</div>
		</>
	);
};
