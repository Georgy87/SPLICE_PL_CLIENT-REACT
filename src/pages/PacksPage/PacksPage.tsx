import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchGetPacks } from '../../store/slices/pack/packSlice';
import PacksList from '../../components/PacksList/PacksList';
import { Player } from '../../components/Player/Player';
import SearchInput from '../../components/SearchInput/SearchInput';
import { useSound } from '../../hooks/useSound';

import styles from '../../styles/pagesStyles/PacksPage.module.scss';
import { PackItem } from '../../components/PackItem/PackItem';
import { Pack } from '../../store/slices/pack/types';

type PropsType = {
	pageName?: string;
};

export const PacksPage: React.FC<PropsType> = ({ pageName }) => {
	const history = useHistory();
	const [value, setValue] = useState<string>('');

	const { packs } = useSound();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchGetPacks());
	}, []);

	const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation();
		setValue(e.target.value);
	};

	return (
		<div className={styles.packsPageContainer}>
			<SearchInput
				onChangeValue={onChangeValue}
				setValue={setValue}
				value={value}
			/>
			<div className={styles.packsContainer}>
				{packs
					.filter((packs) => {
						if (
							packs.authorName
								.toLowerCase()
								.includes(value.toLowerCase())
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
		</div>
	);
};
