import React, { ChangeEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGetPacks, fetchSearchPacks } from '../../store/slices/pack/packSlice';
import { Player } from '../../components/Player/Player';
import SearchInput from '../../components/SearchInput/SearchInput';
import { PackItem } from '../../components/PackItem/PackItem';
import { Pack } from '../../store/slices/pack/types';
import { selectPacks, selectUserPacks } from '../../store/selectors/packsSelectors';

import styles from './PacksPage.module.scss';
import { defaultState } from '../../context/PlayerContextProvider/PlayerContextProvider';
import { useSound } from '../../hooks/useSound';

type PropsType = {
	pageName?: 'main-packs' | 'user-packs';
};

export const PacksPage: React.FC<PropsType> = ({ pageName }) => {
	const packs = useSelector(selectPacks);
	const userPacks = useSelector(selectUserPacks);

	const [value, setValue] = useState<string>('');

	const history = useHistory();

	const { state, setState } = useSound();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchGetPacks());
		// setState({
		// 	...defaultState,
		// 	samples: [],
		// });
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
					packs
						// ?.filter((packs) => {
						// 	if (
						// 		packs.name.toLowerCase().includes(value.toLowerCase()) ||
						// 		packs.genre.toLowerCase().includes(value.toLowerCase())
						// 	) {
						// 		return packs;
						// 	}
						// })
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
								packs.name.toLowerCase().includes(value.toLowerCase()) ||
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
